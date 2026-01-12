import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface DataTableProps<T> {
    columns: string[];
    data: T[];
    renderRow: (item: T, index: number) => React.ReactNode;
}

export function DataTable<T>({ columns, data, renderRow }: DataTableProps<T>) {
    return (
        <div className="rounded-md border border-zinc-200 bg-white transition-colors dark:border-zinc-800 dark:bg-zinc-950">
            <Table>
                <TableHeader className="bg-zinc-50/50 dark:bg-zinc-900/50">
                    <TableRow className="hover:bg-transparent">
                        {columns.map((col) => (
                            <TableHead
                                key={col}
                                className="text-zinc-600 font-medium dark:text-zinc-400"
                            >
                                {col}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.length > 0 ? (
                        data.map((item, index) => renderRow(item, index))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={columns.length}
                                className="h-24 text-center text-zinc-500 dark:text-zinc-400"
                            >
                                No se encontraron resultados.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
