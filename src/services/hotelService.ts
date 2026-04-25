import { supplierAHotels } from "../suppliers/supplierA";
import { supplierBHotels } from "../suppliers/supplierB";

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

export const getBestHotels = (city: string): FinalHotel[] => {
  const aHotels = supplierAHotels.filter((h) => h.city === city);
  const bHotels = supplierBHotels.filter((h) => h.city === city);

  const allHotels = [
    ...aHotels.map((h) => ({ ...h, supplier: "Supplier A" })),
    ...bHotels.map((h) => ({ ...h, supplier: "Supplier B" })),
  ];

  const hotelMap = new Map<string, FinalHotel>();

  for (const hotel of allHotels) {
    const existing = hotelMap.get(hotel.name);

    if (!existing) {
      hotelMap.set(hotel.name, {
        name: hotel.name,
        price: hotel.price,
        supplier: hotel.supplier,
        commissionPct: hotel.commissionPct,
      });
    } else {
      if (hotel.price < existing.price) {
        hotelMap.set(hotel.name, {
          name: hotel.name,
          price: hotel.price,
          supplier: hotel.supplier,
          commissionPct: hotel.commissionPct,
        });
      }
    }
  }

  return Array.from(hotelMap.values());
};