import { getPopularItems } from "@/api/get-popular-items";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

import colors from "tailwindcss/colors";

const COLORS = [
    colors.sky[500],
    colors.amber[500],
    colors.violet[500],
    colors.emerald[500],
    colors.rose[500],
    colors.orange[500],
]

export function PopularProductChart() {

    const { data: popularItems } = useQuery({
        queryKey: ["metrics", "popular-products"],
        queryFn: getPopularItems,
    })


    return (
        <Card className="col-span-3">
            <CardHeader className="flex-row items-center justify-center pb-8">
                <div className="space-y-1">
                    <CardTitle>
                        Produtos populares
                    </CardTitle>
                    <CardDescription>Aqui estão os itens mais pedidos</CardDescription>
                </div>
            </CardHeader>

            <CardContent>
                {
                    popularItems ? (
                        <ResponsiveContainer width="100%" height={240}>
                            <PieChart style={{ fontSize: 12 }} >
                                <Pie
                                    data={popularItems}
                                    dataKey="amount"
                                    nameKey="product"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={86}
                                    innerRadius={64}
                                    fill={colors.orange["500"]}
                                    labelLine={false}
                                    label={({
                                        cx,
                                        cy,
                                        midAngle,
                                        innerRadius,
                                        outerRadius,
                                        value,
                                        index,
                                    }) => {
                                        const RADIAN = Math.PI / 180
                                        const radius = 12 + innerRadius + (outerRadius - innerRadius)
                                        const x = cx + radius * Math.cos(-midAngle * RADIAN)
                                        const y = cy + radius * Math.sin(-midAngle * RADIAN)

                                        return (
                                            <text
                                                x={x}
                                                y={y}
                                                className="fill-muted-foreground text-xs"
                                                textAnchor={x > cx ? 'start' : 'end'}
                                                dominantBaseline="central"
                                            >
                                                {popularItems[index].product.length > 20
                                                    ? popularItems[index].product.substring(0, 20).concat('...')
                                                    : popularItems[index].product}{' '}
                                                ({value})
                                            </text>
                                        )
                                    }}
                                >
                                    {popularItems.map((_, index) => {
                                        return (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={COLORS[index]}
                                                className="stroke-background hover:opacity-80"
                                            />
                                        )
                                    })}
                                </Pie>
                            </PieChart>
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