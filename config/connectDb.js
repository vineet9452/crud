// import mongoose from "mongoose";

// const MONGODB_URI = process.env.MONGODB_URI;

// export const connectDB = async () => {
//   try {
//     if (mongoose.connection.readyState === 0) {
//       await mongoose.connect(MONGODB_URI, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//       });
//       console.log("✅ MongoDB connected");
//     }
//   } catch (err) {
//     console.error("❌ MongoDB connection failed:", err);
//   }
// };

import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

export const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(MONGODB_URI); // ✅ no extra options needed
      console.log("✅ MongoDB connected");
    }
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
  }
};
