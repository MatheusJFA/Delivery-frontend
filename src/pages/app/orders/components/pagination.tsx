import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

export interface PaginationProps {
    page: number;
    count: number;
    perPage: number;
}

export function Pagination({ page, count, perPage }: PaginationProps) {
    const pages = Math.ceil(count / perPage) || 1;

    return (
        <div className="flex justify-between items-center">
            <div>
                <span className="text-sm text-muted-foreground">
                    Total de {count} registro(s)
                </span>
            </div>

            <div className="flex items-center gap-6 lg:gap-8">
                <div className="text-sm font-medium">
                    Página {page + 1} de {pages}
                </div>

                <div className="flex items-center gap-2">
                    <Button variant="outline" className="h-8 w-8 p-0">
                        <ChevronsLeft className="h-4 w-4" />
                        <span className="sr-only">Primeira Página</span>
                    </Button>

                    <Button variant="outline" className="h-8 w-8 p-0">
                        <ChevronLeft className="h-4 w-4" />
                        <span className="sr-only">Página Anterior</span>
                    </Button>

                    <Button variant="outline" className="h-8 w-8 p-0">
                        <ChevronRight className="h-4 w-4" />
                        <span className="sr-only">Próxima Página</span>
                    </Button>

                    <Button variant="outline" className="h-8 w-8 p-0">
                        <ChevronsRight className="h-4 w-4" />
                        <span className="sr-only">Última Página</span>
                    </Button>
                </div>

            </div>
        </div>
    )
}