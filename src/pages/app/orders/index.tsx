import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Helmet } from "react-helmet-async"
import { OrderTableRow } from "./components/order-table-row"
import { OrderTableFilters } from "./components/order-table-filters"
import { Pagination } from "./components/pagination"
import { getOrders } from "@/api/get-orders"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "react-router-dom"

import * as zod from "zod"
import { OrderTableSkeleton } from "./components/order-table-skeleton"

export function Orders() {

    const [searchParams, setSearchParams] = useSearchParams()

    const pageIndex = zod.coerce
        .number()
        .transform((page) => page - 1)
        .parse(searchParams.get("page") ?? "1")


    const orderId = searchParams.get("orderId");
    const customerName = searchParams.get("customerName");
    const status = searchParams.get("status");

    const { data: result, isLoading } = useQuery({
        queryKey: ['order', pageIndex, orderId, customerName, status],
        queryFn: () => getOrders({
            pageIndex,
            orderId,
            customerName,
            status: status === "all" ? null : status
        }),
    })

    async function handlePageChange(page: number) {
        setSearchParams(state => {
            state.set("page", (page + 1).toString())
            return state;
        })
    }

    return (
        <>
            <Helmet title="Pedidos" />

            <div className="flex flex-col gap-4">
                <h1 className="text-3xl font-bold tracking-tight">Pedidos</h1>

                <div className="space-y-2.5">

                    <OrderTableFilters />


                    <div className="border rounded-md">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[64px]"></TableHead>
                                    <TableHead className="w-[280px]">Identificador</TableHead>
                                    <TableHead className="w-[180px]">Realizado há</TableHead>
                                    <TableHead className="w-[140px]">Status</TableHead>
                                    <TableHead>Cliente</TableHead>
                                    <TableHead className="w-[140px]">Total</TableHead>
                                    <TableHead className="w-[40px]">Ações</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {
                                    isLoading ? <OrderTableSkeleton /> :
                                    result ? result.orders.map((order) => { return <OrderTableRow key={order.orderId} order={order} /> }) : null
                                }
                            </TableBody>
                        </Table>
                    </div>
                </div>

                {result && (
                    <Pagination
                        page={result.meta.pageIndex}
                        count={result.meta.totalCount}
                        perPage={result.meta.perPage}
                        onPageChange={handlePageChange}
                    />
                )}
            </div>
        </>
    )
}