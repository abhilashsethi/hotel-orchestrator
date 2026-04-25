import { supplierAHotels } from "../suppliers/supplierA";
import { supplierBHotels } from "../suppliers/supplierB";

export const fetchSupplierA = async (city: string) => {
  return supplierAHotels.filter((h) => h.city === city);
};

export const fetchSupplierB = async (city: string) => {
  return supplierBHotels.filter((h) => h.city === city);
};