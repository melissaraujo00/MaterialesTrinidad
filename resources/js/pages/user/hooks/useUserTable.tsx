import { useState } from "react";
import { usePage, Link } from "@inertiajs/react";
import { Column } from "@/components/GenericTable";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, UserCircle, Mail, Phone } from "lucide-react";
import { usePermissions } from "@/hooks/use-permissions";

export interface User {
    id: number;
    name: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    role: string;
}

export const useUserTable = () => {
    const { users } = usePage<{ users: User[] }>().props;
    // 1. Obtenemos el hook de permisos
    const { hasPermission } = usePermissions();

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.firstName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const openDeleteModal = (user: User) => {
        setSelectedUser(user);
        setIsDeleteModalOpen(true);
    };

    const columns: Column<User>[] = [
        {
            header: "Usuario",
            render: (user) => (
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500">
                        <UserCircle className="h-6 w-6" />
                    </div>
                    <div>
                        <span className="font-semibold block text-zinc-900 dark:text-zinc-100">
                            {user.firstName} {user.lastName}
                        </span>
                        <span className="text-xs text-zinc-500">@{user.name}</span>
                        <div className="md:hidden flex items-center gap-1 text-xs text-zinc-400 mt-1">
                            <Mail className="h-3 w-3" /> {user.email}
                        </div>
                    </div>
                </div>
            )
        },
        {
            header: "Contacto",
            className: "hidden md:table-cell",
            render: (user) => (
                <div className="flex flex-col gap-1 text-sm text-zinc-600 dark:text-zinc-400">
                    <div className="flex items-center gap-2">
                        <Mail className="h-3 w-3" /> {user.email}
                    </div>
                    <div className="flex items-center gap-2">
                        <Phone className="h-3 w-3" /> {user.phoneNumber}
                    </div>
                </div>
            )
        },
        {
            header: "Rol",
            className: "hidden lg:table-cell",
            render: (user) => (
                <span className="inline-flex items-center rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
                    {user.role || 'Sin Rol'}
                </span>
            )
        },
        {
            header: "Acciones",
            className: "text-right",
            render: (user) => (
                <div className="flex justify-end gap-2">
                    {/* Permiso para Editar */}
                    {hasPermission("editar usuarios") && (
                        <Button variant="ghost" size="icon" asChild className="h-8 w-8 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20">
                            <Link href={route('users.edit', user.id)}>
                                <Pencil className="h-4 w-4" />
                            </Link>
                        </Button>
                    )}
                    {/* Permiso para Eliminar */}
                    {hasPermission("eliminar usuarios") && (
                        <Button
                            variant="ghost" size="icon"
                            onClick={() => openDeleteModal(user)}
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
        filteredUsers,
        columns,
        searchTerm,
        setSearchTerm,
        selectedUser,
        isDeleteModalOpen,
        setIsDeleteModalOpen,
        hasPermission // <--- IMPORTANTE: Exportamos la función aquí
    };
};
