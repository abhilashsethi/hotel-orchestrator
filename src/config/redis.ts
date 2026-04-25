import { createClient } from "redis";

export const redisClient = createClient({
  url: "redis://localhost:6379",
});

redisClient.on("error", (err) => {
  console.error("Redis Error:", err);
});

export const connectRedis = async () => {
  console.log("Connecting to Redis...");

  if (!redisClient.isOpen) {
    await redisClient.connect();
    console.log("Redis connected ✅");
  }
};