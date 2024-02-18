import { getMonthCanceledOrdersAmount } from "@/api/get-month-canceled-orders-amount";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { X } from "lucide-react";
import { ValuesSkeleton } from "./values-skeleton";

export function MontlyCanceledOrdersAmountCard() {

    const { data: montlyCanceledOrdersAmount } = useQuery({
        queryKey: ["metrics", "month-canceled-orders-amount"],
        queryFn: getMonthCanceledOrdersAmount
    })

    return (
        <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle>Cancelamentos (mês)</CardTitle>
                <X className="h-4 w-4 text-muted-foreground" />
            </CardHeader>

            <CardContent>
                {
                    montlyCanceledOrdersAmount ?
                        <>
                            <span className="text-2xl font-bold tracking-tight">
                                {montlyCanceledOrdersAmount.amount.toLocaleString('pt-BR')}
                            </span>
                            <p className="text-xs text-muted-foreground">
                                {
                                    montlyCanceledOrdersAmount.diffFromLastMonth > 0
                                        ? <span className="text-red-500 dark:text-red-400">{montlyCanceledOrdersAmount.diffFromLastMonth} </span>
                                        : montlyCanceledOrdersAmount.diffFromLastMonth < 0 ?
                                            <span className="text-emerald-500 dark:emerald-red-400">{montlyCanceledOrdersAmount.diffFromLastMonth} </span> :
                                            <span className="text-gray-500 dark:text-gray-400"> Sem mudanças </span>

                                }
                                {" "} em relação ao mês passado.
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