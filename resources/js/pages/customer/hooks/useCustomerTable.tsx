import { useState } from "react";
import { usePage, Link } from "@inertiajs/react";
import { Column } from "@/components/GenericTable";
import { Button } from "@/components/ui/button";
import {
    Pencil, Trash2, Briefcase, Mail, Phone, FileText, CheckCircle, XCircle
} from "lucide-react";
import { usePermissions } from "@/hooks/use-permissions"; // 1. Importamos Permisos

export interface Customer {
    id: number;
    name: string;
    email: string;
    phoneNumber: string;
    nit: string;
    status: 'activo' | 'inactivo';
}

export const useCustomerTable = () => {
    // 2. Obtenemos datos y la función hasPermission
    const { customers } = usePage<{ customers: Customer[] }>().props;
    const { hasPermission } = usePermissions();

    // 3. Estados para el Modal y Selección
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    // 4. Lógica de Filtrado
    const filteredCustomers = customers.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.nit?.includes(searchTerm)
    );

    // 5. Función para abrir el modal (Reemplaza el window.confirm)
    const openDeleteModal = (customer: Customer) => {
        setSelectedCustomer(customer);
        setIsDeleteModalOpen(true);
    };

    // 6. Definición de Columnas
    const columns: Column<Customer>[] = [
        {
            header: "Cliente",
            render: (row) => (
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                        <Briefcase className="h-5 w-5" />
                    </div>
                    <div>
                        <span className="font-semibold block text-zinc-900 dark:text-zinc-100">
                            {row.name}
                        </span>
                        {/* Info visible solo en móvil */}
                        <div className="md:hidden flex flex-col gap-0.5 mt-1">
                            <span className="text-xs text-zinc-500 flex items-center gap-1">
                                <FileText className="h-3 w-3" /> {row.nit || 'Sin NIT'}
                            </span>
                            <span className={`text-[10px] font-medium ${row.status === 'activo' ? 'text-green-600' : 'text-red-600'}`}>
                                {row.status === 'activo' ? '● Activo' : '● Inactivo'}
                            </span>
                        </div>
                    </div>
                </div>
            )
        },
        {
            header: "Contacto",
            className: "hidden md:table-cell",
            render: (row) => (
                <div className="flex flex-col gap-1 text-sm text-zinc-600 dark:text-zinc-400">
                    <div className="flex items-center gap-2">
                        <Mail className="h-3 w-3" /> {row.email || '—'}
                    </div>
                    <div className="flex items-center gap-2">
                        <Phone className="h-3 w-3" /> {row.phoneNumber || '—'}
                    </div>
                </div>
            )
        },
        {
            header: "NIT / Estado",
            className: "hidden lg:table-cell",
            render: (row) => (
                <div className="flex flex-col gap-2">
                    <span className="text-sm font-mono text-zinc-700 dark:text-zinc-300">
                        {row.nit || '—'}
                    </span>
                    <span className={`inline-flex items-center w-fit px-2 py-0.5 rounded-full text-xs font-medium ${
                        row.status === 'activo'
                            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                            : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                    }`}>
                        {row.status === 'activo' ? <CheckCircle className="h-3 w-3 mr-1"/> : <XCircle className="h-3 w-3 mr-1"/>}
                        {row.status === 'activo' ? 'Activo' : 'Inactivo'}
                    </span>
                </div>
            )
        },
        {
            header: "Acciones",
            className: "text-right",
            render: (row) => (
                <div className="flex justify-end gap-2">
                    {hasPermission("editar clientes") && (
                        <Button variant="ghost" size="icon" asChild className="h-8 w-8 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20">
                            <Link href={route('customers.edit', row.id)}>
                                <Pencil className="h-4 w-4" />
                            </Link>
                        </Button>
                    )}

                    {hasPermission("eliminar clientes") && (
                        <Button
                            variant="ghost" size="icon"
                            onClick={() => openDeleteModal(row)}
                            className="h-8 w-8 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    )}
                </div>
            )
        }
    ];

    return {
        filteredCustomers,
        columns,
        searchTerm,
        setSearchTerm,
        selectedCustomer,    // Exportamos estado
        isDeleteModalOpen,   // Exportamos estado
        setIsDeleteModalOpen, // Exportamos setter
        hasPermission        // Exportamos permiso para usar en Index
    };
};
