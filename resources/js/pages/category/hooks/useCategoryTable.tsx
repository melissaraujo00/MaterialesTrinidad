import { useState } from "react";
import { usePage, Link } from "@inertiajs/react";
import { Column } from "@/components/GenericTable";
import { Button } from "@/components/ui/button";
import {
    Pencil, Trash2, Layers
} from "lucide-react";
import { usePermissions } from "@/hooks/use-permissions";

export interface Category {
    id: number;
    name: string;
    description: string;
}

export const useCategoryTable = () => {
    // 1. Obtener datos y permisos
    // NOTA: Asegúrate que tu controlador envíe 'categories' como prop
    const { categories } = usePage<{ categories: Category[] }>().props;
    const { hasPermission } = usePermissions();

    // 2. Estados
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    // 3. Filtrado (Nombre o Descripción)
    const filteredCategories = categories.filter(cat =>
        cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cat.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // 4. Abrir Modal
    const openDeleteModal = (category: Category) => {
        setSelectedCategory(category);
        setIsDeleteModalOpen(true);
    };

    // 5. Columnas
    const columns: Column<Category>[] = [
        {
            header: "Categoría",
            render: (row) => (
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center text-orange-600 dark:text-orange-400">
                        <Layers className="h-5 w-5" />
                    </div>
                    <div>
                        <span className="font-semibold block text-zinc-900 dark:text-zinc-100">
                            {row.name}
                        </span>
                        {/* Descripción visible solo en móvil (si es corta) o truncada */}
                        <span className="md:hidden text-xs text-zinc-500 line-clamp-1">
                            {row.description || "Sin descripción"}
                        </span>
                    </div>
                </div>
            )
        },
        {
            header: "Descripción",
            className: "hidden md:table-cell text-zinc-600 dark:text-zinc-400", // Oculto en móvil
            render: (row) => row.description || "—"
        },
        {
            header: "Acciones",
            className: "text-right",
            render: (row) => (
                <div className="flex justify-end gap-2">
                    {hasPermission("editar categoria") && (
                        <Button variant="ghost" size="icon" asChild className="h-8 w-8 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20">
                            <Link href={route('categories.edit', row.id)}>
                                <Pencil className="h-4 w-4" />
                            </Link>
                        </Button>
                    )}

                    {hasPermission("eliminar categoria") && (
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
        filteredCategories,
        columns,
        searchTerm,
        setSearchTerm,
        selectedCategory,
        isDeleteModalOpen,
        setIsDeleteModalOpen,
        hasPermission
    };
};
