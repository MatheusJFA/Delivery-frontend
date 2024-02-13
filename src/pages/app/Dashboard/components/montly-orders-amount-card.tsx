import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Utensils } from "lucide-react";

export function MontlyOrdersAmountCard() {
    return (
        <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle>Pedidos (mês)</CardTitle>
                <Utensils className="h-4 w-4 text-muted-foreground" />
            </CardHeader>

            <CardContent>
                <span className="text-2xl font-bold tracking-tight">
                    245
                </span>
                <p className="text-xs text-muted-foreground">
                    <span className="text-emerald-500 dark:text-emerald-400">6%</span> em relação ao mês passado.
                </p>
            </CardContent>
        </Card>
    )
}