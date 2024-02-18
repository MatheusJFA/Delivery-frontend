import { getMonthRevenue } from "@/api/get-month-revenue";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { DollarSign } from "lucide-react";
import { ValuesSkeleton } from "./values-skeleton";

export function MonthlyRevenueCard() {

    const { data: monthRevenue } = useQuery({
        queryFn: getMonthRevenue,
        queryKey: ["metrics", "month-receipt"]
    })

    function formatCurrency(value: number) {
        return Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
    }

    return (
        <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle>Receita total (mês)</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>

            <CardContent>
                {monthRevenue ?
                    <>
                        <span className="text-2xl font-bold tracking-tight">
                            {formatCurrency(monthRevenue.receipt / 100)}
                        </span>
                        <p className="text-xs text-muted-foreground">
                            {
                                monthRevenue.diffFromLastMonth > 0 ?
                                    <span className="text-emerald-500 dark:text-emerald-400">{monthRevenue.diffFromLastMonth}</span>
                                    : monthRevenue.diffFromLastMonth < 0 ?
                                        <span className="text-red-500 dark:text-red-400">{monthRevenue.diffFromLastMonth}</span> :
                                        <span className="text-gray-500 dark:text-gray-400">Sem mudanças</span>
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