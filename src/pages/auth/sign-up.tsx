import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Helmet } from "react-helmet-async";

import { toast } from "sonner";

import * as zod from "zod";

import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { registerRestaurant } from "@/api/sign-up";

export function SignUp() {
    const schema = zod.object({
        restaurantName: zod.string(),
        managerName: zod.string(),
        phone: zod.string(),
        email: zod.string().email(),
    });

    const { mutateAsync: registerRestaurantFn } = useMutation({
        mutationFn: registerRestaurant
    })

    type SignUpForm = zod.infer<typeof schema>;

    const { register, handleSubmit, formState } = useForm<SignUpForm>();

    async function handleSignUp(data: SignUpForm) {
        await registerRestaurantFn({
            restaurantName: data.restaurantName,
            managerName: data.managerName,
            phone: data.phone,
            email: data.email
        })

        const navigate = useNavigate()

        toast("Enviamos um link de notificação para o seu e-mail", {
            action: {
                label: "Login",
                onClick: () => {
                    navigate(`/sign-in?email=${data.email}`)
                },
            }
        });

    }

    return (
        <>
            <Helmet title="Cadastro" />

            <div className="p-8">
                <Button variant="link" asChild className="absolute right-8 top-8">
                    <Link to="/sign-in" className="text-foreground">Fazer Login</Link>
                </Button>
                <div className="w-[350px] flex flex-col justify-center gap-6">
                    <div className="flex flex-col gap-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">Criar conta grátis</h1>
                        <p className="text-sm text-muted-foreground">Seja um parceiro e faça mais entregas!</p>
                    </div>

                    <form className="space-y-4" onSubmit={handleSubmit(handleSignUp)}>
                        <div className="space-y-2">
                            <Label htmlFor="restaurantName">Nome do estabelecimento</Label>
                            <Input type="text" id="restaurantName" {...register("restaurantName")} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="managerName">Nome do gerente do estabelecimento</Label>
                            <Input type="text" id="managerName" {...register("managerName")} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phone">Telefone</Label>
                            <Input type="tel" id="phone" {...register("phone")} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">E-mail</Label>
                            <Input type="email" id="email" {...register("email")} />
                        </div>

                        <Button type="submit" disabled={formState.isSubmitting} className="w-full">
                            Finalizar cadastro
                        </Button>

                        <p className="px-6 text-center text-sm  leading-relaxed text-muted-foreground">
                            Ao criar uma conta, você concorda com os <Link to="/terms" className="underline underline-offset-4 text-foreground">Termos de Uso</Link> e a <Link to="/privacy" className="underline underline-offset-4 text-underline text-foreground">Política de Privacidade</Link> do FoodDelivery.
                        </p>


                    </form>
                </div>
            </div>
        </>
    )
}