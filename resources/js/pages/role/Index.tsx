import { usePage, Head, Link } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Toaster } from "sonner";
import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import languageES from "datatables.net-plugins/i18n/es-ES.mjs";
import "datatables.net-buttons-dt";
import "datatables.net-responsive-dt";
import jszip from "jszip";

window.JSZip = jszip;
DataTable.use(DT);

interface Role {
  id: number;
  name: string;
  description: string;
  permissions: string[];
}

export default function Roles() {
  const page = usePage();
  const permissions =
    page.props.auth?.user?.permissions && Array.isArray(page.props.auth.user.permissions)
      ? page.props.auth.user.permissions
      : [];
  const hasPermission = (perm: string) => permissions.includes(perm);

  // Obtén los roles únicos directamente de las props
  const uniqueRoles: Role[] = page.props.roles ?? [];

  const columns = [
    { data: "name", title: "Nombre del Rol" },
    { data: "description", title: "Descripción" },
    {
      data: "permissions",
      title: "Permisos",
      render: function(data: string[]) {
                if (!data || data.length === 0) return "-";

                return data
                    .map(
                        (permission) =>
                            `<span class="inline-block bg-blue-100 text-blue-800 text-xs font-semibold mr-1 mb-1 px-2.5 py-0.5 rounded">
              ${permission}
            </span>`
                    )
                    .join("");
        },
      orderable: false,
      searchable: false,
    },
    {
      data: null,
      title: "Acciones",
      orderable: false,
      searchable: false,
      createdCell: (td: HTMLTableCellElement, cellData: any, rowData: any) => {
        let actions = "";
        if (hasPermission("Editar Rol")) {
          actions += `<a href="roles/${rowData.id}/edit" class="edit-btn bg-orange-400 text-sm text-white px-3 py-1 rounded hover:bg-orange-500">Editar</a>`;
        }
        td.innerHTML = actions;
      },
    },
  ];

  return (
    <AppLayout>
      <Head title="Roles" />
      <Toaster position="top-right" richColors />

      <div className="flex flex-col gap-6 p-6 bg-white text-black shadow-lg rounded-xl dark:bg-black/10 dark:text-white">
        <div className="flex justify-end">
          {hasPermission("Crear Rol") && (
            <Link
              href="/roles/create"
              className="bg-green-600 text-white rounded px-3 py-1 text-sm hover:bg-green-700 transition"
            >
              Agregar Rol
            </Link>
          )}
        </div>

        <DataTable
          data={uniqueRoles}
          options={{
            language: languageES,
            responsive: true,
            dom: "frtiplB",
            layout: {
              topStart: ["pageLength", "search"],
            },
          }}
          columns={columns}
          className="display"
        >
          <thead>
            <tr>
              <th>Nombre del Rol</th>
              <th>Descripción</th>
              <th>Permisos</th>
              <th>Acciones</th>
            </tr>
          </thead>
        </DataTable>
      </div>
    </AppLayout>
  );
}
