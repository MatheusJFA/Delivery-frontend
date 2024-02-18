import { getOrderByID } from "@/api/get-order.by-id";
import { OrderStatus } from "@/components/order-status";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ProductDetailSkeleton } from "./product-detail-skeleton";

export interface ProductDetailProps {
  id: string;
  isOpen: boolean;
}

export function ProductDetail({ id, isOpen }: ProductDetailProps) {

  const { data: order, isLoading } = useQuery({
    queryKey: ['order', id],
    queryFn: () => getOrderByID({ id }),
    enabled: isOpen
  })


  const formatCurrency = (value: number) => {
    return value.toLocaleString("pt-BR", { currency: "BRL", style: "currency" })
  }

  const total = order?.orderItems.reduce((acc, item) => acc + (item.priceInCents * item.quantity), 0)

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Pedido: {id} </DialogTitle>
        <DialogDescription>Detalhes do pedido</DialogDescription>
      </DialogHeader>
      {isLoading && <ProductDetailSkeleton />}
      {order && (
        <div className="space-y-6">
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="text-muted-foreground">Status</TableCell>
                <TableCell className="flex justify-end">
                  <OrderStatus status={order.status} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-muted-foreground">Cliente</TableCell>
                <TableCell className="flex justify-end">
                  {order.customer.name}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-muted-foreground">Telefone</TableCell>
                <TableCell className="flex justify-end">
                  {order.customer.phone}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-muted-foreground">E-mail</TableCell>
                <TableCell className="flex justify-end">
                  {order.customer.email}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-muted-foreground">
                  Realizado há
                </TableCell>
                <TableCell className="flex justify-end">{formatDistanceToNow(order.createdAt, { addSuffix: true, locale: ptBR })}</TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produto</TableHead>
                <TableHead className="text-right">Qtd.</TableHead>
                <TableHead className="text-right">Preço</TableHead>
                <TableHead className="text-right">Subtotal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order.orderItems && order.orderItems.map(item => (
                <TableRow>
                  <TableCell>{item.product.name}</TableCell>
                  <TableCell className="text-right">{item.quantity}</TableCell>
                  <TableCell className="text-right">{formatCurrency(item.priceInCents)}</TableCell>
                  <TableCell className="text-right">{formatCurrency(item.priceInCents * item.quantity)}</TableCell>
                </TableRow>
              ))}

            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Total do pedido</TableCell>
                <TableCell className="text-right font-medium">
                  {total && formatCurrency(total)}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      )
      }
    </DialogContent>
  )
}