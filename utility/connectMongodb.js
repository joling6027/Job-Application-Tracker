import mongoose from "mongoose";

// const connectMongodb = async () => mongoose.connect(process.env.MONGODB_URI);
const connection = {}

const connectMongodb = async () => {
  if(connection.isConnected){
    return;
  }

  const db = await mongoose.connect(process.env.MONGODB_URI)

  connection.isConnected = db.connections[0].readyState
}
 
export default connectMongodb;