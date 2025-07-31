import mongoose from 'mongoose';
const connectDB=async()=>{
 await mongoose.connect(process.env.DB_URI,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
 })
console.log("MongoDB connected successfully");
};

 export default connectDB;
// --- IGNORE ---