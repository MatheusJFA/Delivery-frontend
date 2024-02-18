import { api } from "@/lib/axios";

export interface GetOrderByIDParams {
    id: string;
}

export interface GetOrderByIDResponse {
    id: string
    createdAt: string
    status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered'
    totalInCents: number
    customer: {
        name: string
        email: string
        phone: string | null
    }
    orderItems: {
        id: string
        priceInCents: number
        quantity: number
        product: {
            name: string
        }
    }[]
}

export async function getOrderByID({ id }: GetOrderByIDParams): Promise<GetOrderByIDResponse> {
    const response = await api.get<GetOrderByIDResponse>(`/orders/${id}`);
    return response.data;
}