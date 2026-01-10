import { Head, Link } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Toaster } from "sonner";
import DT from "datatables.net-dt";
import DataTable from "datatables.net-react";
import languageES from "datatables.net-plugins/i18n/es-ES.mjs";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import DeleteEntityModal from "../../components/DeleteEntityModal";
import { useBrandsTable } from "../../Features/Brands/hooks/useBrandActions";

DataTable.use(DT);

export default function Brands() {
    const {
        columns,
        selectedBrand,
        isDeleteModalOpen,
        setIsDeleteModalOpen,
        hasPermission
    } = useBrandsTable();

    return (
        <AppLayout>
            <Head title="Marcas" />
            <Toaster position="top-right" richColors />

            <div className="p-6 space-y-6 transition-colors duration-300">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                            Marcas
                        </h1>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 font-instrument">
                            Administra los fabricantes y marcas del inventario.
                        </p>
                    </div>

                    {hasPermission("crear marca") && (
                        <Button asChild variant="default" size="sm" className="gap-2 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200">
                            <Link href="/brands/create">
                                <Plus className="h-4 w-4" />
                                Agregar Marca
                            </Link>
                        </Button>
                    )}
                </div>

                <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm transition-colors dark:border-zinc-800 dark:bg-zinc-950">
                    <DataTable
                        ajax="/api/brands/getBrandData"
                        options={{
                            language: languageES,
                            responsive: true,
                            layout: {
                                topStart: ['pageLength'],
                                topEnd: ['search'],
                            },
                        }}
                        columns={columns}
                        className="w-full text-sm text-zinc-900 dark:text-zinc-200"
                    />
                </div>
            </div>

            <DeleteEntityModal
                isOpen={isDeleteModalOpen}
                closeModal={() => setIsDeleteModalOpen(false)}
                entity={selectedBrand}
                entityType="Marcas"
                deleteEndpoint="/brands"
            />
        </AppLayout>
    );
}
