import { proxyActivities } from "@temporalio/workflow";

const { fetchSupplierA, fetchSupplierB } = proxyActivities<{
  fetchSupplierA(city: string): Promise<any[]>;
  fetchSupplierB(city: string): Promise<any[]>;
}>({
  startToCloseTimeout: "1 minute",
});

export async function hotelWorkflow(city: string): Promise<any> {
  const [aHotels, bHotels] = await Promise.all([
    fetchSupplierA(city),
    fetchSupplierB(city),
  ]);

  return {
    supplierA: aHotels,
    supplierB: bHotels,
  };
}