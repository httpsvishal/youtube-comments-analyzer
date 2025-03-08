import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

async function fetchAllComments(videoId, apiKey) {
  let comments = [];
  let nextPageToken = undefined;
  let baseUrl = "https://www.googleapis.com/youtube/v3/commentThreads";

  try {
    do {
      const url = `${baseUrl}?part=snippet&videoId=${videoId}&key=${apiKey}&maxResults=100&pageToken=${nextPageToken || ""}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.items) {
        comments.push(...data.items);
      }

      nextPageToken = data.nextPageToken; // Will be undefined if no more pages
    } while (nextPageToken);

    console.log("Total comments fetched:", comments.length);
    return comments;
  } catch (error) {
    console.error("Error fetching comments:", error);
    return [];
  }
}

const extractCommentsData = (comments) => {
  return comments.map((comment) => ({
    commentMessage: comment.snippet.topLevelComment.snippet.textOriginal,
    commentData: comment.snippet.topLevelComment.snippet,
  }));
};

const classifyComments = async (comments) => {
  try {
    const client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = client.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `You are an AI trained to analyze sentiment. Given an array of YouTube comments, classify each comment into one of the following categories:
                    
                    1. **Agree** - The comment expresses agreement or support.
                    2. **Disagree** - The comment expresses disagreement or opposition.
                    3. **Neutral** - The comment is neither strongly supportive nor opposing.

                    and give top recurring keywords from the comments (excluding commonn words like 'the', 'and', etc.)

                    ### **Input Format:**
                    You will receive an array of comments in JSON Format.

                    ### **Expected Output Format:**
                    Return only a JSON array which can be used to process where each comment is an object with the following structure:

                    {
                      comments : [
                        {
                          "comment": "<original comment>",
                          "sentiment": "<Agree/Disagree/Neutral>"
                        }
                      ]
                      keywords :[
                        "keyword"
                      ]
                    }

                    These are the comments: ${JSON.stringify(
                      comments.map((c) => c.commentMessage)
                    )}`

    const response = await model.generateContent(prompt);
    const data = response.response.text()
    console.log(data);
    const cleanedData = data.replace(/```json|```/g, ""); // Remove any markdown formatting
    const classifiedComments = JSON.parse(cleanedData).comments.map((comment,index) => ({
      comment: comment.comment,
      sentiment: comment.sentiment,
      commentData: comments[index].commentData,
      }));
    const keywords = JSON.parse(cleanedData).keywords;
    // // ✅ Check response status before parsing
    // if (!response.ok) {
    //   throw new Error(`Gemini API Error: ${response.status} ${response.statusText}`);
    // }

    // // ✅ Check response before parsing JSON
    // const text = await response.text();
    // if (!text) {
    //   throw new Error("Empty response from Gemini API");
    // }

    
    return {keywords,classifiedComments,};
  } catch (error) {
    console.error("Error fetching data:", error);
    return { error: "Failed to classify comments" };
  }
};

export async function POST(req) {
  try {
    const body = await req.json();
    const { videoId } = body;

    console.log("Fetching comments for video:", videoId);
    const apiKey = process.env.YOUTUBE_API_KEY;
    if (!apiKey) {
      throw new Error("Missing YOUTUBE_API_KEY");
    }

    const allComments = await fetchAllComments(videoId, apiKey);
    const commentsList = extractCommentsData(allComments);
    console.log("Total comments extracted:", commentsList.length);

    if (commentsList.length === 0) {
      return new NextResponse(JSON.stringify({ error: "No comments found" }), {
        status: 400,
      });
    }

    const classifiedComments = await classifyComments(commentsList);
    return new NextResponse(JSON.stringify(classifiedComments), { status: 200 });
  } catch (error) {
    console.error("Error processing request:", error);
    return new NextResponse(
      JSON.stringify({ error: "Error fetching comments" }),
      { status: 500 }
    );
  }
}
