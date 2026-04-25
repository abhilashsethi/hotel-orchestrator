import { Connection, Client } from "@temporalio/client";

export const temporalClient = async () => {
  const connection = await Connection.connect({
    address: process.env.TEMPORAL_ADDRESS || "localhost:7233",
  });

  return new Client({ connection });
};