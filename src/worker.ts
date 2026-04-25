import { Worker, NativeConnection } from "@temporalio/worker";
import * as activities from "./activities/hotelActivities";

async function runWorker() {
  const connection = await NativeConnection.connect({
    address: process.env.TEMPORAL_ADDRESS || "localhost:7233",
  });

  const worker = await Worker.create({
    connection,
    workflowsPath: require.resolve("./workflows/hotelWorkflow"),
    activities,
    taskQueue: "hotel-task-queue",
  });

  console.log("Worker started 🚀");
  await worker.run();
}

runWorker().catch((err) => {
  console.error(err);
  process.exit(1);
});