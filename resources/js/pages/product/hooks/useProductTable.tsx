import { useState } from "react";
import { usePage, Link } from "@inertiajs/react";
import { Column } from "@/components/GenericTable";
import { Button } from "@/components/ui/button";
import {
    Pencil, Trash2, Package, AlertTriangle, Image as ImageIcon
} from "lucide-react";
import { usePermissions } from "@/hooks/use-permissions";
import { Product } from "@/types/entities/product"; // Asegúrate de que esta ruta sea correcta

export const useProductTable = () => {
    // 1. Obtener datos y permisos
    const { products } = usePage<{ products: Product[] }>().props;
    const { hasPermission } = usePermissions();

    // 2. Estados Locales
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    // 3. Lógica de Filtrado (Nombre o Descripción)
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // 4. Lógica del Modal
    const openDeleteModal = (product: Product) => {
        setSelectedProduct(product);
        setIsDeleteModalOpen(true);
    };

    // Helper para formato de moneda (El Salvador / USD)
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('es-SV', {
            style: 'currency',
            currency: 'USD'
        }).format(price);
    };

    // 5. Definición de Columnas
    const columns: Column<Product>[] = [
        {
            header: "Imagen",
            className: "w-[80px]",
            render: (row) => (
                <div className="h-10 w-10 rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 overflow-hidden flex items-center justify-center">
                    {row.image ? (
                        <img
                            src={row.image}
                            alt={row.name}
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <ImageIcon className="h-5 w-5 text-zinc-300" />
                    )}
                </div>
            )
        },
        {
            header: "Producto",
            render: (row) => (
                <div>
                    <span className="font-semibold block text-zinc-900 dark:text-zinc-100">
                        {row.name}
                    </span>
                    {/* Descripción truncada en móvil */}
                    <span className="text-xs text-zinc-500 line-clamp-1 max-w-[200px]">
                        {row.description || "Sin descripción"}
                    </span>
                </div>
            )
        },
        {
            header: "Precio",
            render: (row) => (
                <span className="font-medium font-mono text-zinc-700 dark:text-zinc-300">
                    {formatPrice(row.priceWithTax || row.discountPrice || 0)}
                </span>
            )
        },
        {
            header: "Stock",
            render: (row) => {
                const isLowStock = row.stock <= row.stockMinimun;
                return (
                    <div className={`flex items-center gap-1.5 ${isLowStock ? 'text-red-600 dark:text-red-400 font-bold' : 'text-zinc-600 dark:text-zinc-400'}`}>
                        <Package className="h-4 w-4" />
                        <span>{row.stock}</span>
                        {isLowStock && (
                            <span title="Stock Bajo" className="animate-pulse">
                                <AlertTriangle className="h-4 w-4" />
                            </span>
                        )}
                    </div>
                );
            }
        },
        {
            header: "Acciones",
            className: "text-right",
            render: (row) => (
                <div className="flex justify-end gap-2">
                    {hasPermission("editar producto") && (
                        <Button variant="ghost" size="icon" asChild className="h-8 w-8 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20">
                            <Link href={route('products.edit', row.id)}>
                                <Pencil className="h-4 w-4" />
                            </Link>
                        </Button>
                    )}

                    {hasPermission("eliminar producto") && (
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
        filteredProducts,
        columns,
        searchTerm,
        setSearchTerm,
        selectedProduct,
        isDeleteModalOpen,
        setIsDeleteModalOpen,
        hasPermission
    };
};
