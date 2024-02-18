import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { DialogContent, DialogTitle, DialogDescription, DialogHeader, DialogFooter, DialogClose } from "./ui/dialog";
import { GetManagedRestaurantResponse, getManagedRestaurant } from "@/api/get-managed-restaurant";
import * as zod from "zod";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { updateProfile } from "@/api/update-profile";
import { toast } from "sonner";

export function StoreProfileDialog() {

    const queryClient = useQueryClient();

    const StoreProfileSchema = zod.object({
        name: zod.string().min(1, "Nome da loja é obrigatório"),
        description: zod.string().min(1, "Descrição da loja é obrigatória").nullable(),
    })

    type StoreProfileInputs = zod.infer<typeof StoreProfileSchema>

    const { data: managedRestaurant } = useQuery({
        queryKey: ["managed-restaurant"],
        queryFn: getManagedRestaurant,
        staleTime: Infinity
    })

    const { register, handleSubmit, formState } = useForm<StoreProfileInputs>({
        resolver: zodResolver(StoreProfileSchema),
        values: {
            name: managedRestaurant?.name ?? "",
            description: managedRestaurant?.description ?? ""
        }
    })

    function updateRestaurantInformationCache({ name, description }: StoreProfileInputs) {
        const cached = queryClient.getQueryData<GetManagedRestaurantResponse>(["managed-restaurant"]);

        if (cached) {
            queryClient.setQueryData<GetManagedRestaurantResponse>(["managed-restaurant"], {
                ...cached,
                name,
                description
            })
        }

        return { cached }
    }

    const { mutateAsync: updateProfileFn } = useMutation({
        mutationFn: updateProfile,
        onMutate: ({ name, description }) => {
            const { cached }= updateRestaurantInformationCache({ name, description })

            return { previousValue: cached }
        },
        onError: (_, __, context) => {
            if(context?.previousValue) {
                queryClient.setQueryData(["managed-restaurant"], context.previousValue)
            }
        }
    })

    async function handleUpdateProfile(data: StoreProfileInputs) {
        try {
            await updateProfileFn({
                name: data.name,
                description: data.description
            })

            toast.success("Perfil atualizado com sucesso"); 1
        } catch (error) {
            toast.error("Erro ao atualizar perfil da loja. Tente novamente.")
        }
    }

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    Perfil da loja
                </DialogTitle>

                <DialogDescription>
                    Atualie as informações do seu estabelecimento visíveis para os clientes.
                </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit(handleUpdateProfile)}>
                <div className="space-y-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right" htmlFor="name">Nome</Label>
                        <Input {...register("name")} />
                    </div>
                    <div>
                        <Label className="text-right" htmlFor="description">Descrição</Label>
                        <Textarea className="col-span-3" id="description" {...register("description")} />
                    </div>
                </div>
            </form>

            <DialogFooter>
                <DialogClose asChild>
                    <Button variant="ghost" type="button">Cancelar</Button>
                </DialogClose>
                <Button type="submit" variant="success" disabled={formState.isSubmitting}>Salvar</Button>
            </DialogFooter>

        </DialogContent>
    )
}