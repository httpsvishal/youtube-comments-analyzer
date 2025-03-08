import mongoose from 'mongoose';

const connectMongo = async () => {
    try {
        if (mongoose.connection.readyState === 1) {
            console.log('MongoDB already connected');
            return;
        }
        
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw new Error('MongoDB connection failed');
    }
};

export default connectMongo;
