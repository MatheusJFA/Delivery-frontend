import { getMonthOrdersAmount } from "@/api/get-month-orders-amount";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Utensils } from "lucide-react";
import { ValuesSkeleton } from "./values-skeleton";

export function MontlyOrdersAmountCard() {
    const { data: monthOrdersAmount } = useQuery({
        queryFn: getMonthOrdersAmount,
        queryKey: ["metrics", "month-orders-amount"]
    })
    return (
        <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle>Pedidos (mês)</CardTitle>
                <Utensils className="h-4 w-4 text-muted-foreground" />
            </CardHeader>

            <CardContent>
                {
                    monthOrdersAmount ?
                        <>
                            <span className="text-2xl font-bold tracking-tight">
                                {monthOrdersAmount.amount.toLocaleString('pt-BR')}
                            </span>
                            <p className="text-xs text-muted-foreground">
                                {
                                    monthOrdersAmount.diffFromLastMonth > 0
                                        ? <span className="text-emerald-500 dark:text-emerald-400">{monthOrdersAmount.diffFromLastMonth} </span>
                                        : monthOrdersAmount.diffFromLastMonth < 0 ?
                                            <span className="text-red-500 dark:text-red-400">{monthOrdersAmount.diffFromLastMonth} </span> :
                                            <span className="text-gray-500 dark:text-gray-400"> Sem mudanças </span>
                                }
                                {" "} em relação ao mês passado.
                            </p>
                        </> :
                        <>
                            <ValuesSkeleton />
                        </>
                }
            </CardContent>
        </Card>
    )
}