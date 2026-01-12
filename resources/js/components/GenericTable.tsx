import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export interface Column<T> {
    header: string;
    render: (item: T) => React.ReactNode;
    className?: string; // Para ocultar columnas: "hidden md:table-cell"
}

interface Props<T> {
    data: T[];
    columns: Column<T>[];
    emptyMessage?: string;
}

export function GenericTable<T>({ data, columns }: Props<T>) {
    return (
        <div className="rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950 overflow-hidden">
            <Table>
                <TableHeader className="bg-zinc-50/50 dark:bg-zinc-900/50">
                    <TableRow>
                        {columns.map((col, i) => (
                            <TableHead key={i} className={col.className}>{col.header}</TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.length > 0 ? data.map((item, i) => (
                        <TableRow key={i} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/50 transition-colors">
                            {columns.map((col, j) => (
                                <TableCell key={j} className={col.className}>{col.render(item)}</TableCell>
                            ))}
                        </TableRow>
                    )) : (
                        <TableRow><TableCell colSpan={columns.length} className="h-24 text-center text-zinc-500">No hay registros.</TableCell></TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
