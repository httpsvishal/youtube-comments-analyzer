"use client";

import Spinner from "@/components/Spinner";
import { useData } from "@/context/DataContext";
import { useRouter } from "next/navigation";
import {  useState } from "react";

export default function Home() {
  const router = useRouter();
  const [videoUrl, setVideoUrl] = useState("");
  const [loading,setLoading] = useState(false);
  const {setData} = useData();

  async function fetchAllComments(videoId) {
    console.log(videoId)
    try {
      console.log(videoId)
      const response = await fetch('api/get-comments',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          },
        body: JSON.stringify({
        videoId,
          })
      });
      const data = await response.json();
      setData(data);
      return data;
    
    } catch (error) {
      console.error("Error fetching comments:", error);
      return [];
    }
  }
  const extractVideoId = () => {
    const url = new URL(videoUrl);
    const videoId = url.searchParams.get("v");
    if (!videoId) return null;
    return videoId;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const videoId = extractVideoId();
    if (videoId) {
      console.log(videoId);
      let allComments = await fetchAllComments(videoId);
      console.log(allComments);
      setLoading(false);
      router.push('/dashboard')
      // classifyComments(commentsList).then((result) => console.log(result));
    } else {
      setLoading(false);
      alert("Invalid video URL");
    }
    
  };

  return (
    <div className="bg-[#ebe1f5] flex min-h-screen font-sans justify-center items-center ">
      <div className="px-6 py-10 bg-white flex flex-col gap-8 border-gray-300 rounded-md shadow ">
        <h1 className="text-[#8102f7] text-4xl font-semibold text-center px-8 ">
          Youtube Comments Analyzer
        </h1>
        {!loading && <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <label
            htmlFor="video-url"
            className="block text-sm font-medium text-gray-700"
          >
            YouTube Video URL
          </label>
          <input
            id="video-url"
            type="text"
            name="videoUrl"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            className="block w-full p-2 border border-gray-300 rounded-md shadow"
            placeholder="https://www.youtube.com/watch?v=..."
          />
          <button className="bg-[#8102f7] text-white py-2 px-4 rounded-md">
            Analyze Comments
          </button>
        </form>}
        {loading && 
          <div className="flex justify-center items-center gap-4">
            <p className="text-xl text-[#8102f7]">Loading....</p>
            <Spinner />
          </div>
        }
      </div>
    </div>
  );
}
