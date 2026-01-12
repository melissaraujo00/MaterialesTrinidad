import { usePage, Head, Link } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Toaster } from "sonner";
import { RolesHeader } from "@/components/roles/RolesHeader";
import { GenericTable, Column } from "@/components/GenericTable";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

interface Role {
  id: number;
  name: string;
  description: string;
  permissions: string[];
}

export default function Roles() {
  const page = usePage();
  const { auth, roles } = page.props as any;

  // Lógica de permisos
  const userPermissions = auth?.user?.permissions || [];
  const hasPermission = (perm: string) => Array.isArray(userPermissions) && userPermissions.includes(perm);

  const uniqueRoles: Role[] = roles ?? [];

  // --- DEFINICIÓN DE COLUMNAS ---
  const columns: Column<Role>[] = [
    {
      header: "Nombre del Rol",
      render: (role) => <span className="font-medium text-zinc-900 dark:text-zinc-100">{role.name}</span>,
      className: "w-[200px] align-top", 
    },
    {
      header: "Descripción",
      render: (role) => (
        <span className="text-sm text-zinc-500 dark:text-zinc-400">
            {role.description || "Sin descripción"}
        </span>
      ),
      className: "hidden md:table-cell w-[250px] align-top"
    },
    {
      header: "Permisos",
      className: "align-top", // Para que empiece arriba si hay muchos
      render: (role) => {
        // 1. Caso Especial: Administrador (o si tiene permisos 'all')
        if (role.name === 'Administrador' || role.permissions.includes('all')) {
            return (
               <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                   ✨ Acceso Total
               </span>
            );
       }

       // 2. Configuración de Truncado
       const MAX_VISIBLE = 5;
       const visiblePermissions = role.permissions.slice(0, MAX_VISIBLE);
       const remainingCount = role.permissions.length - MAX_VISIBLE;

        return (
          <div className="flex flex-wrap gap-1 items-center">
            {visiblePermissions.map((perm, index) => (
              <span
                  key={index}
                  className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-zinc-100 text-zinc-800 border border-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700 whitespace-nowrap"
              >
                {perm}
              </span>
            ))}

            {/* Badge de "+X más" si hay muchos */}
            {remainingCount > 0 && (
                <span
                    className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-zinc-200 text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300 ml-1 cursor-help transition-colors hover:bg-zinc-300 dark:hover:bg-zinc-600"
                    title={role.permissions.slice(MAX_VISIBLE).join(', ')} // Tooltip nativo al pasar el mouse
                >
                  +{remainingCount} más
                </span>
            )}

            {role.permissions.length === 0 && (
                <span className="text-zinc-400 text-xs italic">Sin permisos asignados</span>
            )}
          </div>
        );
      },
    },
    {
      header: "Acciones",
      className: "text-right align-top w-[100px]",
      render: (role) => {
        if (!hasPermission("Editar Rol")) return null;

        return (
          <div className="flex justify-end">
             <Button variant="outline" size="sm" asChild className="h-8 dark:border-zinc-700 dark:hover:bg-zinc-800">
                <Link href={`/roles/${role.id}/edit`}>
                    <Pencil className="mr-2 h-3.5 w-3.5" />
                    Editar
                </Link>
             </Button>
          </div>
        );
      },
    },
  ];

  return (
    <AppLayout>
      <Head title="Roles" />
      <Toaster position="top-right" richColors />

      <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-6">

        {/* Cabecera Componentizada */}
        <RolesHeader canCreate={hasPermission("Crear Rol")} />

        {/* Tabla Genérica Reutilizable */}
        <GenericTable
            data={uniqueRoles}
            columns={columns}
            emptyMessage="No hay roles registrados en el sistema."
        />

      </div>
    </AppLayout>
  );
}
