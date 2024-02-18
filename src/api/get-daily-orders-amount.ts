import { api } from "@/lib/axios";

export interface getDaylyOrdersAmountResponse {
    amount: number;
    diffFromYesterday: number;
}

export async function getDaylyOrdersAmount() {
  const response = await api.get<getDaylyOrdersAmountResponse>("/metrics/day-orders-amount");
  return response.data;
}

