import { Connection, Client } from "@temporalio/client";

export const temporalClient = async () => {
  const connection = await Connection.connect();
  return new Client({ connection });
};