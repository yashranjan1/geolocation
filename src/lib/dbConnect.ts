import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?: number;
}

const connection: ConnectionObject = {};

const connectDB = async () : Promise<void> => {
    
    if (connection.isConnected) {
        console.log("Already connected");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI as string, {});

        connection.isConnected = 1;

        console.log("Connected to DB");

    } catch (error) {
        console.log(error);
    }
}

export default connectDB;