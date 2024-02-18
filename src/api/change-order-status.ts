import { api } from "@/lib/axios";

export interface ChangeOrderStatusParams {
    orderId: string;
    status: "canceled" | "processing" | "delivering" | "delivered";
}

function statusRoute(status: "canceled" | "processing" | "delivering" | "delivered") {
    switch (status) {
        case "canceled":
            return "cancel"
        case "processing":
            return "aprove"
        case "delivering":
            return "dispatch"
        case "delivered":
            return "deliver"
    }
}

export async function changeOrderStatus({ orderId, status }: ChangeOrderStatusParams) {
    await api.patch(`/orders/${orderId}/${statusRoute(status)}`)
}