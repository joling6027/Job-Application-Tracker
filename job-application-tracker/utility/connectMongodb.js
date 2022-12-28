import mongoose from "mongoose";

const connectMongodb = async () => mongoose.connect(process.env.MONGODB_URI);
 
export default connectMongodb;