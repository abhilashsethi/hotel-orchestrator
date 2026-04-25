import { Worker } from "@temporalio/worker";
import * as activities from "./activities/hotelActivities";

async function runWorker() {
  const worker = await Worker.create({
    workflowsPath: require.resolve("./workflows/hotelWorkflow"),
    activities,
    taskQueue: "hotel-task-queue",
  });

  await worker.run();
}

runWorker().catch((err) => {
  console.error(err);
  process.exit(1);
});