import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { ResponsiveContainer, LineChart, XAxis, YAxis, CartesianGrid, Line } from "recharts";

import colors from "tailwindcss/colors";

const data = [
    { date: '01/01', value: 400 },
    { date: '02/01', value: 300 },
    { date: '03/01', value: 200 },
    { date: '04/01', value: 278 },
    { date: '05/01', value: 189 },
    { date: '06/01', value: 239 },
    { date: '07/01', value: 349 },
    { date: '08/01', value: 400 },
    { date: '09/01', value: 300 },
]

export function RevenueChart() {
    return (
        <Card className="col-span-6">
            <CardHeader className="flex-row items-center justify-center pb-8">
                <div className="space-y-1">
                    <CardTitle>
                        Receita do Período
                    </CardTitle>
                    <CardDescription> Receita Diária no Período</CardDescription>
                </div>
            </CardHeader>

            <CardContent>
                <ResponsiveContainer width="100%" height={240}>
                    <LineChart style={{ fontSize: 12 }} data={data}>
                        <XAxis
                            stroke="#888"
                            dataKey="date"
                            axisLine={false}
                            tickLine={false}
                            tickMargin={10}
                            dy={10}
                        />

                        <YAxis stroke="#888"
                            dataKey="value"
                            axisLine={false}
                            tickLine={false}
                            tickMargin={20}
                            width={80}
                            tickFormatter={
                                (value: number) => value.toLocaleString("pt-BR",
                                    { style: "currency", currency: "BRL" })}
                        />
                        <CartesianGrid stroke="#cecece" vertical={false} />

                        <Line type="linear" dataKey="value" stroke={ colors.orange["500"]} />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card >
    )
}