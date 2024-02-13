import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, X } from "lucide-react"
import { useForm } from "react-hook-form"

interface OrdersForm {
    status: string
}

export function OrderTableFilters() {

    const { register, handleSubmit } = useForm<OrdersForm>()

    async function handleOrders(data: OrdersForm) {
        console.log(data)
    }

    return (
        <>
            <form className="flex items-center gap-2" onSubmit={handleSubmit(handleOrders)}>
                <span className="text-sm font-semibold">
                    Filtros:
                </span>
                <Input type="text" className="h-8 w-[320px]" placeholder="Buscar por identificador" {...register("status")} />
                <Input type="text" className="h-8 w-[320px]" placeholder="Buscar por nome do cliente" {...register("status")} />
                <Select defaultValue="all">
                    <SelectTrigger className="h-8 w-[180px]">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Todos os Status</SelectItem>
                        <SelectItem value="canceled">Cancelado</SelectItem>
                        <SelectItem value="pending">Pendente</SelectItem>
                        <SelectItem value="canceled">Em preparo</SelectItem>
                        <SelectItem value="approved">Aprovado</SelectItem>
                        <SelectItem value="delivering">Em entrega</SelectItem>
                        <SelectItem value="delivered">Entregue</SelectItem>
                    </SelectContent>
                </Select>

                <Button type="submit">
                    <Search className="h-4 w-4 mr-2" />
                    Filtrar resultados
                </Button>

                <Button variant="outline" type="submit">
                    <X className="h-4 w-4 mr-2" />
                    Remover Filtros
                </Button>
            </form>
        </>
    )
}