import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.ATLAS_URI);
        console.log("MongoDB connected.");
    } catch (error) {
        console.log(error);
    }
}
