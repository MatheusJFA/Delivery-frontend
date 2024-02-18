import { getDaylyOrdersAmount } from "@/api/get-daily-orders-amount";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Utensils } from "lucide-react";
import { ValuesSkeleton } from "./values-skeleton";

export function DailyOrdersAmountCard() {

    const { data: dailyOrdersAmount } = useQuery({
        queryFn: getDaylyOrdersAmount,
        queryKey: ["metrics", "daily-orders-amount"]
    })

    return (
        <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle>Pedidos (dia)</CardTitle>
                <Utensils className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                {dailyOrdersAmount ?
                    <>
                        <span className="text-2xl font-bold tracking-tight">
                            {dailyOrdersAmount.amount.toLocaleString('pt-BR')}
                        </span>
                        <p className="text-xs text-muted-foreground">
                            {
                                dailyOrdersAmount.diffFromYesterday > 0
                                    ? <span className="text-emerald-500 dark:emerald-red-400"> {dailyOrdersAmount.diffFromYesterday > 0} </span>
                                    : dailyOrdersAmount.diffFromYesterday < 0 ?
                                        <span className="text-red-500 dark:text-red-400">{dailyOrdersAmount.diffFromYesterday > 0} </span> :
                                        <span className="text-gray-500 dark:text-gray-400">Sem mudanças</span>
                            }
                            {" "} em relação a ontem
                        </p>
                    </>
                    :
                    <>
                        <ValuesSkeleton />
                    </>
                }
            </CardContent>
        </Card>
    )
}