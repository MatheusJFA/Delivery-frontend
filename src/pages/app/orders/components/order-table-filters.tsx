import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { zodResolver } from "@hookform/resolvers/zod"
import { Search, X } from "lucide-react"
import { Controller, useForm } from "react-hook-form"
import { useSearchParams } from "react-router-dom"

import * as zod from "zod"

const orderFiltersSchema = zod.object({
    orderId: zod.string().optional(),
    customerName: zod.string().optional(),
    status: zod.string().optional(),
})

type OrderFilters = zod.infer<typeof orderFiltersSchema>


export function OrderTableFilters() {

    const [searchParams, setSearchParams] = useSearchParams()

    const orderId = searchParams.get("orderId");
    const customerName = searchParams.get("customerName");
    const status = searchParams.get("status");

    const { register, handleSubmit, control, reset } = useForm<OrderFilters>({
        resolver: zodResolver(orderFiltersSchema),
        defaultValues: {
            orderId: orderId ?? "",
            customerName: customerName ?? "",
            status: status ?? "all"
        }
    })

    async function handleOrders({ orderId, customerName, status }: OrderFilters) {
        setSearchParams(state => {

            if (orderId) state.set("orderId", orderId)
            else state.delete("orderId")

            if (customerName) state.set("customerName", customerName)
            else state.delete("customerName")

            if (status) state.set("status", status)
            else state.delete("status")

            state.set("page", "1")

            return state

        })
    }


    async function removeFilters() {
        setSearchParams(state => {
            state.delete("orderId")
            state.delete("customerName")
            state.delete("status")
            state.set("page", "1")

            return state
        })

        reset({
            orderId: "",
            customerName: "",
            status: "all"
        });
    }

    return (
        <>
            <form className="flex items-center gap-2" onSubmit={handleSubmit(handleOrders)}>
                <span className="text-sm font-semibold">
                    Filtros:
                </span>
                <Input type="text" className="h-8 w-[320px]" placeholder="Buscar por identificador" {...register("orderId")} />
                <Input type="text" className="h-8 w-[320px]" placeholder="Buscar por nome do cliente" {...register("customerName")} />
                <Controller
                    name="status"
                    control={control}
                    render={({ field: { name, onChange, value, disabled } }) => (
                        <Select defaultValue="all" name={name} onValueChange={onChange} value={value} disabled={disabled}>
                            <SelectTrigger className="h-8 w-[180px]">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Todos os Status</SelectItem>
                                <SelectItem value="canceled">Cancelado</SelectItem>
                                <SelectItem value="pending">Pendente</SelectItem>
                                <SelectItem value="processing">Em preparo</SelectItem>
                                <SelectItem value="approved">Aprovado</SelectItem>
                                <SelectItem value="delivering">Em entrega</SelectItem>
                                <SelectItem value="delivered">Entregue</SelectItem>
                            </SelectContent>
                        </Select>
                    )}
                />

                <Button type="submit">
                    <Search className="h-4 w-4 mr-2" />
                    Filtrar resultados
                </Button>

                <Button onClick={removeFilters} variant="outline" type="submit">
                    <X className="h-4 w-4 mr-2" />
                    Remover Filtros
                </Button>
            </form>
        </>
    )
}