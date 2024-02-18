import { api } from "@/lib/axios";


export type GetPopularItemsResponse = {
    product: string;
    amount: number;
}[]

export async function getPopularItems() {
    const response = await api.get<GetPopularItemsResponse>("/metrics/popular-products");
    return response.data;
}
