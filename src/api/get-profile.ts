import { api } from "@/lib/axios";

export interface ProfileResponse {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    role: "manager" | "customer";
    createdAt: Date | null;
    updatedAt: Date | null;
}

export async function getProfile(): Promise<ProfileResponse> {
    const response = await api.get("/me");
    return response.data;
}