import { Helmet } from "react-helmet-async";
import { MonthlyRevenueCard } from "./components/montly-revenue-card";
import { MontlyOrdersAmountCard } from "./components/montly-orders-amount-card";
import { DailyOrdersAmountCard } from "./components/daily-orders-amount-card";
import { MontlyCanceledOrdersAmountCard } from "./components/montly-canceled-orders-amount-card";
import { RevenueChart } from "./components/revenue-chart";
import { PopularProductChart } from "./components/popular-products-chart";

export function Dashboard() {
    return (
        <>
            <Helmet title="Dashboard" />

            <div className="flex flex-col gap-4">
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            </div>

            <div className="grid grid-cols-4 gap-4">
                <MonthlyRevenueCard />
                <MontlyOrdersAmountCard />
                <MontlyCanceledOrdersAmountCard />
                <DailyOrdersAmountCard />
            </div>

            <div className="grid grid-cols-9 gap-4">
                <RevenueChart />
                <PopularProductChart />
            </div>

        </>
    )
}