import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Helmet } from "react-helmet-async";

import { toast } from "sonner";

import * as zod from "zod";

import { useForm } from "react-hook-form";
import { Link, useSearchParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "@/api/sign-in";

export function SignIn() {
    const schema = zod.object({
        email: zod.string().email(),
    });

    type SignInForm = zod.infer<typeof schema>;

    const [searchParams] = useSearchParams();

    const { register, handleSubmit, formState } = useForm<SignInForm>({
        defaultValues: {
            email: searchParams.get("email") ?? ""
        }
    });


    const { mutateAsync: autenticate } = useMutation({
        mutationFn: signIn
    })


    async function handleSignIn(data: SignInForm) {

        await autenticate(
            { email: data.email }
        );

        toast("Enviamos um link de notificação para o seu e-mail", {
            action: {
                label: "Reenviar",

                onClick: () => {
                    handleSignIn(data);
                },
            }
        });
    }

    return (
        <>
            <Helmet title="Login" />

            <div className="p-8">
                <Button variant="link" asChild className="absolute right-8 top-8">
                    <Link to="/sign-up" className="text-foreground">Criar conta grátis</Link>
                </Button>
                <div className="w-[350px] flex flex-col justify-center gap-6">
                    <div className="flex flex-col gap-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">Acessar Painel</h1>
                        <p className="text-sm text-muted-foreground">Acompanhe suas vendas pelo painel do parceiro!</p>
                    </div>

                    <form className="space-y-4" onSubmit={handleSubmit(handleSignIn)}>
                        <div className="space-y-2">
                            <Label htmlFor="email">Seu E-mail</Label>
                            <Input type="email" id="email" {...register("email")} />
                        </div>


                        <Button type="submit" disabled={formState.isSubmitting} className="w-full">
                            Acessar Painel
                        </Button>
                    </form>
                </div>
            </div>
        </>
    )
}