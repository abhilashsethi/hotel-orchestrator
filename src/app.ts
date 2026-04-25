import express from "express";
import { supplierAHotels } from "./suppliers/supplierA";
import { supplierBHotels } from "./suppliers/supplierB";
import { getBestHotels } from "./services/hotelService";

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

app.get("/api/hotels", (req, res) => {
  const { city } = req.query;

  if (!city || typeof city !== "string") {
    return res.status(400).json({ error: "City is required" });
  }

  const hotels = getBestHotels(city);

  res.json(hotels);
});

export default app;