import { OrderStatus } from "@/components/order-status";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { TableCell, TableRow } from "@/components/ui/table";
import { ArrowRight, Search, X } from "lucide-react";

import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ProductDetail } from "./product-detail";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GetOrdersResponse } from "@/api/get-orders";
import { changeOrderStatus } from "@/api/change-order-status";

export interface OrderTableRowProps {
    order: {
        orderId: string
        status: "pending" | "canceled" | "processing" | "delivering" | "delivered";
        createdAt: string
        customerName: string
        total: number
    }
}

export function OrderTableRow({ order }: OrderTableRowProps) {
    const [isDetailsOpen, setIsDetailsOpen] = useState(false)


    const queryClient = useQueryClient()

    function updateOrderOnCache(orderId: string, status: OrderStatus) {
        const cached = queryClient.getQueriesData<GetOrdersResponse>({
            queryKey: ['orders']
        })

        cached?.forEach(([cacheKey, cacheData]) => {
            if (!cacheData) {
                return
            }

            queryClient.setQueryData<GetOrdersResponse>(cacheKey, {
                ...cacheData,
                orders: cacheData.orders.map((order) => {
                    if (order.orderId === orderId) {
                        return { ...order, status }
                    }

                    return order
                })
            })
        })
    }


    const { mutateAsync: changeOrderStatusFn, isPending: isChanging  } = useMutation({
        mutationFn: changeOrderStatus,
        onSuccess: (_, { orderId, status }, __) => {
            updateOrderOnCache(orderId, status)
        }
    })



    return (
        <>
            <TableRow>
                <TableCell>
                    <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
                        <DialogTrigger asChild>
                            <Button variant="outline" size="xs">
                                <Search className="h-3 w-3" />
                                <span className="sr-only">Detalhes do pedido</span>
                            </Button>
                        </DialogTrigger>

                        <ProductDetail id={order.orderId} isOpen={isDetailsOpen} />
                    </Dialog>
                </TableCell>
                <TableCell className="font-mono text-sm font-medium">{order.orderId}</TableCell>
                <TableCell>{formatDistanceToNow(order.createdAt, { locale: ptBR, addSuffix: true })}</TableCell>
                <TableCell>
                    <OrderStatus status={order.status} />
                </TableCell>
                <TableCell className="font-medium">{order.customerName}</TableCell>
                <TableCell className="font-medium">
                    {order.total.toLocaleString("pt-BR", { currency: "BRL", style: "currency" })}
                </TableCell>

                <TableCell>
                    <div className="flex gap-4">
                        {order.status === 'pending' && (
                            <Button
                                variant="outline"
                                disabled={isChanging}
                                size="xs"
                                onClick={() => changeOrderStatusFn({ orderId: order.orderId, status: "processing"})}
                            >
                                <ArrowRight className="mr-2 h-3 w-3" />
                                Aprovar
                            </Button>
                        )}

                        {order.status === 'processing' && (
                            <Button
                                variant="outline"
                                disabled={isChanging}
                                size="xs"
                                onClick={() => changeOrderStatusFn({ orderId: order.orderId, status: "delivering"})}
                            >
                                <ArrowRight className="mr-2 h-3 w-3" />
                                Em entrega
                            </Button>
                        )}

                        {order.status === 'delivering' && (
                            <Button
                                variant="outline"
                                disabled={isChanging}
                                size="xs"
                                onClick={() => changeOrderStatusFn({ orderId: order.orderId, status: "delivered"})}
                            >
                                <ArrowRight className="mr-2 h-3 w-3" />
                                Entregue
                            </Button>
                        )}
                    </div>
                    <Button
                        onClick={() => changeOrderStatus({ orderId: order.orderId, status: "canceled" })}
                        disabled={!["pending", "processing"].includes(order.status)}
                        variant="outline"
                        size="xs">
                        <X className="h-3 w-3 mr-2" />
                        Cancelar
                    </Button>
                </TableCell >
            </TableRow >
        </>
    )
}