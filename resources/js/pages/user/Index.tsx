import { Head, usePage } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Toaster } from "sonner";
import { Link } from "@inertiajs/react";
import { useState } from "react";
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import languageES from 'datatables.net-plugins/i18n/es-ES.mjs';
import 'datatables.net-buttons-dt';
import 'datatables.net-responsive-dt';
import jszip from 'jszip';
import DeleteEntityModal from "../../components/DeleteEntityModal";

window.JSZip = jszip;
DataTable.use(DT);

export default function Users() {
    const { props } = usePage();
    const permissions = props.auth?.user?.permissions ?? [];
    const hasPermission = (perm) => permissions.includes(perm);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<any>(null);

    const openDeleteModal = (user: any) => {
        setSelectedUser(user);
        setIsDeleteModalOpen(true);
    };
    


    const columns = [
        { data: 'name' },
        { data: 'firstName' },
        { data: 'lastName' },
        { data: 'email' },
        { data: 'birthdate' },
        { data: 'phoneNumber' },
        {
            data: 'roles',
            name: 'roles',
            render: function (data, type, row) {
                return data && data.length > 0 ? data.join(', ') : '-';
            },
            orderable: false,
            searchable: false
        },
        {
            data: null,
            orderable: false,
            searchable: false,

            createdCell: (td: HTMLTableCellElement, cellData: any, rowData: any) => {
                let actions = '';
                if (hasPermission('editar usuarios')) {
                    actions += `<a href="users/${rowData.id}/edit" class="edit-btn bg-orange-400 text-sm text-white px-3 py-1 rounded hover:bg-orange-500">Editar</a>`;
                }
                if (hasPermission('eliminar usuarios')) {
                    actions += `<button class="delete-btn bg-red-500 text-sm text-white px-3 py-1 rounded hover:bg-red-600">Eliminar</button>`;
                }
                td.innerHTML = actions;

                if (hasPermission('eliminar usuarios')) {
                    td.querySelector('.delete-btn')?.addEventListener('click', () => openDeleteModal(rowData));
                }
            }
        }
    ];

    return (
        <AppLayout>
            <Head title="Users" />
            <Toaster position="top-right" richColors />

            <div className="flex flex-col gap-6 p-6 bg-white text-black shadow-lg rounded-xl dark:bg-black/10 dark:text-white">
                <div className="flex justify-end">
                    {hasPermission('crear usuarios') && (
                        <Link href="/users/create" className="bg-green-600 text-white rounded px-3 py-1 text-sm hover:bg-green-700 transition">
                            Agregar Usuario
                        </Link>
                    )}
                </div>

                <DataTable ajax="/api/users/getUsersData" options={{
                    language: languageES,
                    responsive: true,
                    dom: 'lBrtip',
                    layout: {
                        topStart: ['pageLength'],
                    },
                }} columns={columns} className="display">
                    <thead>
                        <tr>
                            <th>Usuario</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Email</th>
                            <th>Fecha de Nacimiento</th>
                            <th>Telefono</th>
                            <th>Roles</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                </DataTable>
            </div>

            <DeleteEntityModal
                isOpen={isDeleteModalOpen}
                closeModal={() => setIsDeleteModalOpen(false)}
                entity={selectedUser}
                entityType="Usuario"
                deleteEndpoint="/users"
            />
        </AppLayout>
    );
}
