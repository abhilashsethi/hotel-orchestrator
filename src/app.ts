import express from "express";
import { supplierAHotels } from "./suppliers/supplierA";
import { supplierBHotels } from "./suppliers/supplierB";
import { getBestHotels } from "./services/hotelService";
import { temporalClient } from "./temporalClient";
import { hotelWorkflow } from "./workflows/hotelWorkflow";
import { redisClient } from "./config/redis";

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

// Supplier A
app.get("/supplierA/hotels", (req, res) => {
  const { city } = req.query;

  const result = supplierAHotels.filter(
    (hotel) => hotel.city === city
  );

  res.json(result);
});

// Supplier B
app.get("/supplierB/hotels", (req, res) => {
  const { city } = req.query;

  const result = supplierBHotels.filter(
    (hotel) => hotel.city === city
  );

  res.json(result);
});

app.get("/api/hotels", async (req, res) => {
  console.log("API HIT 🚀");

  const { city, minPrice, maxPrice } = req.query;

  if (!city || typeof city !== "string") {
    return res.status(400).json({ error: "City is required" });
  }

  const cacheKey = `hotels:${city.toLowerCase()}`;

  let hotels;

  const cachedData = await redisClient.get(cacheKey);

  if (cachedData) {
    console.log("Cache hit ✅");
    hotels = JSON.parse(cachedData);
  } else {
    console.log("Cache miss ❌");

    const client = await temporalClient();

    const handle = await client.workflow.start(hotelWorkflow, {
      args: [city],
      taskQueue: "hotel-task-queue",
      workflowId: `hotel-${Date.now()}`,
    });

    hotels = await handle.result();

    await redisClient.set(cacheKey, JSON.stringify(hotels), {
      EX: 300,
    });
  }

  let filteredHotels = hotels;

  if (minPrice) {
    filteredHotels = filteredHotels.filter(
      (h: any) => h.price >= Number(minPrice)
    );
  }

  if (maxPrice) {
    filteredHotels = filteredHotels.filter(
      (h: any) => h.price <= Number(maxPrice)
    );
  }

  res.json(filteredHotels);
});

export default app;