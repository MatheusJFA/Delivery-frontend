import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

import colors from "tailwindcss/colors";

const data = [
    { product: 'Pizza de Pepperoni', amount: 12 },
    { product: 'Pizza de Mussarela', amount: 18 },
    { product: 'Hamburguér', amount: 20 },
    { product: 'X-Bacon', amount: 25 },
    { product: 'Anéis de cebola', amount: 30 },
    { product: 'Batata frita', amount: 22 },
]


const COLORS = [
    colors.sky[500],
    colors.amber[500],
    colors.violet[500],
    colors.emerald[500],
    colors.rose[500],
    colors.orange[500],
]

export function PopularProductChart() {
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
                <ResponsiveContainer width="100%" height={240}>
                    <PieChart style={{ fontSize: 12 }} >
                        <Pie
                            data={data}
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
                                        {data[index].product.length > 20
                                            ? data[index].product.substring(0, 20).concat('...')
                                            : data[index].product}{' '}
                                        ({value})
                                    </text>
                                )
                            }}
                        >
                            {data.map((_, index) => {
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
            </CardContent>
        </Card >
    )
}