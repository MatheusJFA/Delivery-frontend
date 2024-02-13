import { ChefHat, Home, UtensilsCrossed } from "lucide-react";
import { Separator } from "./ui/separator";
import { NavLink } from "./nav-link";
import { ThemeToggle } from "./theme-toggle";
import { AccountMenu } from "./account-menu";

export function Header() {
    return (
        <div className="border-b">
            <div className="flex h-16 justify-between items-center gap-6 px-6">
                <div className="flex space-x-4">
                    <ChefHat className="h-5 w-5" />
                    <Separator orientation="vertical" className="h-6" />
                    <span className="font-semibold">FoodDelivery</span>
                </div>
                <nav className="flex items-center space-x-4 lg:space-x-6">
                    <NavLink to="/">
                        <Home className="h-4 w-4" />
                        Inicio
                    </NavLink>
                    <NavLink to="/orders">
                        <UtensilsCrossed className="h-4 w-4" />
                        Pedidos
                    </NavLink>
                    <ThemeToggle />
                    <AccountMenu/>
                </nav>
            </div>
        </div>
    )
}