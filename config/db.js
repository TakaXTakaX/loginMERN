import mongoose from "mongoose";
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    // code optimized: you don't need these anymore after Mongoose 6 blub
    // {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    // });
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Connection Failed", error);
    process.exit(1);
  }
};
export default connectDB;
