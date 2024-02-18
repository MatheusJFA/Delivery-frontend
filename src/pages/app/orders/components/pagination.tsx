import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

export interface PaginationProps {
    page: number;
    count: number;
    perPage: number;

    onPageChange: (page: number) => Promise<void> | void
}

export function Pagination({ page, count, perPage, onPageChange }: PaginationProps) {
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
                    <Button
                        onClick={() => onPageChange(0)}
                        variant="outline"
                        className="h-8 w-8 p-0"
                        disabled={page === 0}>
                        <ChevronsLeft className="h-4 w-4" />
                        <span className="sr-only">Primeira Página</span>
                    </Button>

                    <Button
                        onClick={() => onPageChange(page - 1)}
                        variant="outline"
                        className="h-8 w-8 p-0"
                        disabled={page === 0}>
                        <ChevronLeft className="h-4 w-4" />
                        <span className="sr-only">Página Anterior</span>
                    </Button>

                    <Button
                        onClick={() => onPageChange(page + 1)}
                        variant="outline"
                        className="h-8 w-8 p-0"
                        disabled={count <= page + 1}>
                        <ChevronRight className="h-4 w-4" />
                        <span className="sr-only">Próxima Página</span>
                    </Button>

                    <Button
                        onClick={() => onPageChange(count - 1)}
                        variant="outline"
                        className="h-8 w-8 p-0"
                        disabled={count <= page + 1}>
                        <ChevronsRight className="h-4 w-4" />
                        <span className="sr-only">Última Página</span>
                    </Button>
                </div>

            </div>
        </div>
    )
}