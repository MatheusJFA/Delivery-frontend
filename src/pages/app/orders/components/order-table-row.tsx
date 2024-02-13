import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { TableCell, TableRow } from "@/components/ui/table";
import { ArrowRight, Search, X } from "lucide-react";

export function OrderTableRow() {
    return (
        <>
            <TableRow>
                <TableCell>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline" size="xs">
                                <Search className="h-3 w-3" />
                                <span className="sr-only">Detalhes do pedido</span>
                            </Button>
                        </DialogTrigger>
                    </Dialog>
                </TableCell>
                <TableCell className="font-mono text-sm font-medium">66d0830f58be46a0a3d6a0d350e9bbaf</TableCell>
                <TableCell>15 minutos</TableCell>
                <TableCell>
                    <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-slate-500" />
                        <span className="">Pendente</span>
                    </div>
                </TableCell>
                <TableCell className="font-medium">João da Silva</TableCell>
                <TableCell>R$ 150,00</TableCell>

                <TableCell>
                    <div className="flex gap-4">
                        <Button variant="outline" size="xs">
                            <ArrowRight className="h-3 w-3 mr-2" />
                            Aprovar
                        </Button>
                        <Button variant="outline" size="xs">
                            <X className="h-3 w-3 mr-2" />
                            Cancelar
                        </Button>
                    </div>
                </TableCell>
            </TableRow>
        </>
    )
}