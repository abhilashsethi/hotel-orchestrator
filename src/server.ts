import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { connectRedis } from "./config/redis";

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectRedis(); // 🔥 important

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Error starting server:", err);
  }
};

startServer();