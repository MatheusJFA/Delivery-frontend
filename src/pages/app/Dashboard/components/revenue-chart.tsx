import { getDailyRevenueInPeriod } from "@/api/get-daily-revenue-in-period";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Label } from "@/components/ui/label";
import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { Loader2 } from "lucide-react";
import { useMemo, useState } from "react";
import { DateRange } from "react-day-picker";

import { ResponsiveContainer, LineChart, XAxis, YAxis, CartesianGrid, Line } from "recharts";

import colors from "tailwindcss/colors";

export function RevenueChart() {

    const [dateRange, setDateRange] = useState<DateRange | undefined>({
        from: subDays(new Date(), 7),
        to: new Date(),
    })

    const { data: dailyRevenueInPeriod } = useQuery({
        queryKey: ["metrics", "daily-receipt-in-period", dateRange],
        queryFn: () => getDailyRevenueInPeriod({ from: dateRange?.from, to: dateRange?.to }),
    })

    const chartData = useMemo(() => {
        return dailyRevenueInPeriod?.map((chartItem) => {
            return {
                date: chartItem.date,
                receipt: chartItem.receipt / 100,
            }
        })
    }, [dailyRevenueInPeriod])

    return (
        <Card className="col-span-6">
            <CardHeader className="flex-row items-center justify-center pb-8">
                <div className="space-y-1">
                    <CardTitle className="text-base font-medium">Receita do Período</CardTitle>
                    <CardDescription> Receita Diária no Período</CardDescription>
                </div>
                <div className="flex items-center gap-3">
                    <Label>Período</Label>
                    <DateRangePicker date={dateRange} onDateChange={setDateRange} />
                </div>
            </CardHeader>

            <CardContent>
                {chartData ? (
                    <ResponsiveContainer width="100%" height={240}>
                        <LineChart style={{ fontSize: 12 }} data={chartData}>
                            <XAxis
                                stroke="#888"
                                dataKey="date"
                                axisLine={false}
                                tickLine={false}
                                tickMargin={10}
                                dy={10}
                            />

                            <YAxis stroke="#888"
                                axisLine={false}
                                tickLine={false}
                                tickMargin={20}
                                width={80}
                                tickFormatter={
                                    (value: number) => value.toLocaleString("pt-BR",
                                        { style: "currency", currency: "BRL" })}
                            />
                            <CartesianGrid stroke="#cecece" vertical={false} />

                            <Line type="linear" dataKey="receipt" stroke={colors.orange["500"]} />
                        </LineChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="flex h-[240px] w-full items-center justify-center">
                        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                    </div>
                )}
            </CardContent>
        </Card >
    )
}