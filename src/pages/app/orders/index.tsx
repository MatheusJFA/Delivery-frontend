import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Helmet } from "react-helmet-async"
import { OrderTableRow } from "./components/order-table-row"
import { OrderTableFilters } from "./components/order-table-filters"
import { Pagination } from "./components/pagination"

export function Orders() {
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
                                    Array.from({ length: 105}).map((_, index) => (
                                        <OrderTableRow key={index} />
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </div>
                </div>
                <Pagination page={0} count={105} perPage={10}/>
            </div>
        </>
    )
}