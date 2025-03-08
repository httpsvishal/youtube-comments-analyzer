import mongoose from 'mongoose';

const commentDataSchema = new mongoose.Schema({
    channelId: { type: String, required: true },
    videoId: { type: String, required: true },
    textDisplay: { type: String, required: true },
    textOriginal: { type: String, required: true },
    authorDisplayName: { type: String, required: true },
    authorProfileImageUrl: { type: String, required: true },
    authorChannelUrl: { type: String, required: true },
    authorChannelId: {
        value: { type: String, required: true }
    },
    canRate: { type: Boolean, required: true },
    viewerRating: { type: String, required: true },
    likeCount: { type: Number, required: true },
    publishedAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true }
});

const classifiedCommentSchema = new mongoose.Schema({
    comment: { type: String, required: true },
    sentiment: { type: String, required: true },
    commentData: { type: commentDataSchema, required: true }
});

const videoDataSchema = new mongoose.Schema({
    videoId: { type: String, required: true, unique: true },
    keywords: { type: [String], required: true }, // Array of keywords
    classifiedComments: { type: [classifiedCommentSchema], required: true }
}, { timestamps: true });

export default mongoose.models.VideoData || mongoose.model('VideoData', videoDataSchema);
