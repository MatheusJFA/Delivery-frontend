import { Building, ChevronDown, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { getProfile } from "@/api/get-profile";
import { useQuery } from "@tanstack/react-query";
import { getManagedRestaurant } from "@/api/get-managed-restaurant";
import { Skeleton } from "./ui/skeleton";
import { Dialog, DialogTrigger } from "./ui/dialog";
import { StoreProfileDialog } from "./store-profile-dialog";

export function AccountMenu() {

    const { data: profile, isLoading: isLoadingProfile } = useQuery({
        queryKey: ["profile"],
        queryFn: getProfile
    })

    const { data: managedRestaurant, isLoading: isLoadingManagedRestaurant } = useQuery({
        queryKey: ["managed-restaurant"],
        queryFn: getManagedRestaurant,
        staleTime: Infinity
    })


    return (
        <Dialog>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2 select-none">
                        {isLoadingManagedRestaurant ? <Skeleton className="w-40 h-4" /> : managedRestaurant?.name}
                        <ChevronDown className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                    <DropdownMenuLabel className="flex flex-col">
                        {isLoadingProfile ? (
                            <>
                                <Skeleton className="w-40 h-4" />
                                <Skeleton className="w-40 h-4" />
                            </>
                        ) : (
                            <>
                                <span>
                                    {profile?.name}
                                </span>
                                <span className="text-sm font-normal text-muted-foreground">
                                    {profile?.email}
                                </span>
                            </>
                        )}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    <DialogTrigger asChild>
                        <DropdownMenuItem className="gap-2">

                            <Building className="h-4 w-4" />
                            Perfil da loja
                        </DropdownMenuItem>
                    </DialogTrigger>

                    <DropdownMenuItem className="gap-2 text-red-500 dark:text-red-400">
                        <LogOut className="h-4 w-4" />
                        Sair
                    </DropdownMenuItem>
                </DropdownMenuContent >
            </DropdownMenu >

            <StoreProfileDialog />
        </Dialog>
    )
}