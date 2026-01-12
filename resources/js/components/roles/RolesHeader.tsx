import { Link } from "@inertiajs/react";
import { ShieldCheck, Plus } from "lucide-react"; // Iconos sugeridos
import { Button } from "@/components/ui/button";

interface Props {
    canCreate: boolean;
}

export const RolesHeader = ({ canCreate }: Props) => (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
            <div className="flex items-center gap-2">
                <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
                    <ShieldCheck className="h-6 w-6 text-zinc-600 dark:text-zinc-400" />
                </div>
                <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 font-instrument">
                    Roles y Permisos
                </h1>
            </div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                Administra los niveles de acceso y seguridad del sistema.
            </p>
        </div>

        {canCreate && (
            <Button asChild className="bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900">
                <Link href="/roles/create">
                    <Plus className="mr-2 h-4 w-4" />
                    Crear Nuevo Rol
                </Link>
            </Button>
        )}
    </div>
);
