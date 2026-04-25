import { proxyActivities } from "@temporalio/workflow";

type Hotel = {
  hotelId: string;
  name: string;
  price: number;
  city: string;
  commissionPct: number;
};

type FinalHotel = {
  name: string;
  price: number;
  supplier: string;
  commissionPct: number;
};

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

  const allHotels = [
    ...aHotels.map((h) => ({ ...h, supplier: "Supplier A" })),
    ...bHotels.map((h) => ({ ...h, supplier: "Supplier B" })),
  ];

  const hotelMap = new Map<string, FinalHotel>();

  for (const hotel of allHotels) {
    const key = hotel.name.toLowerCase(); // safer

    const existing = hotelMap.get(key);

    if (!existing) {
      hotelMap.set(key, {
        name: hotel.name,
        price: hotel.price,
        supplier: hotel.supplier,
        commissionPct: hotel.commissionPct,
      });
    } else {
      if (hotel.price < existing.price) {
        hotelMap.set(key, {
          name: hotel.name,
          price: hotel.price,
          supplier: hotel.supplier,
          commissionPct: hotel.commissionPct,
        });
      }
    }
  }

  return Array.from(hotelMap.values());
}