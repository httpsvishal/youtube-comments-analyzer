import connectMongo from '@/lib/mongodb';
import VideoComment from '@/models/VideoComment';

export async function POST(req) {
    await connectMongo();

    const { videoId, data } = await req.json();

    try {
        const newComment = await VideoComment.create({ videoId, data });
        return new Response(JSON.stringify(newComment), {
            status: 201,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
