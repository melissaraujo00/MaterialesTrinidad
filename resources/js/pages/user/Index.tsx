import { Head, usePage } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Toaster } from "sonner";
import { Link } from "@inertiajs/react";
import { useState } from "react";
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import languageES from 'datatables.net-plugins/i18n/es-ES.mjs';
import 'datatables.net-buttons-dt';
import 'datatables.net-buttons/js/buttons.html5.js';
import 'datatables.net-buttons/js/buttons.print.js';
import responsive from 'datatables.net-responsive-dt';
import jszip from 'jszip';
import DeleteEntityModal from "../../components/DeleteEntityModal";

window.JSZip = jszip;
DataTable.use(DT, responsive);

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
        { data: 'name', title: 'Usuario', responsivePriority: 7 },
        { data: 'firstName', responsivePriority: 7, title: 'Primer Nombre' },
        { data: 'lastName', responsivePriority: 7, title: 'Apellido' },
        { data: 'email', responsivePriority: 7,  title: 'Correo Electrónico' },
        { data: 'birthdate', responsivePriority: 7 , title: 'Fecha de Nacimiento' },
        { data: 'phoneNumber', responsivePriority: 7, title: 'Teléfono' },
        {
            data: 'roles',
            title: 'Roles',
            name: 'roles',
            render: function (data, type, row) {
                return data && data.length > 0 ? data.join(', ') : '-';
            },
            orderable: false,
            searchable: false
        },
        {
            data: null,
            title: 'Acciones',
            orderable: false,
            searchable: false,
            responsivePriority: 1,
            createdCell: (td: HTMLTableCellElement, cellData: any, rowData: any) => {
                let actions = '';
                if (hasPermission('editar usuarios')) {
                    actions += `<a href="/users/${rowData.id}/edit" class="edit-btn bg-orange-400 text-sm text-white px-3 py-1 rounded hover:bg-orange-500 mr-1">Editar</a>`;
                }
                if (hasPermission('eliminar usuarios')) {
                    actions += `<button class="delete-btn bg-red-500 text-sm text-white px-3 py-1 rounded hover:bg-red-600">Eliminar</button>`;
                }
                td.innerHTML = actions;

                setTimeout(() => {
                    const deleteBtn = td.querySelector('.delete-btn');
                    if (deleteBtn) {
                        deleteBtn.addEventListener('click', () => openDeleteModal(rowData));
                    }
                }, 0);
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

                <DataTable
                    ajax="/api/users/getUsersData"
                    options={{
                        language: languageES,
                        responsive: true,
                        dom: 'lBfrtip',
                        layout: {
                            topStart: ['pageLength'],
                            topEnd: ['search'], // Esto pone el buscador a la derecha
                        },
                        buttons: [
                            { extend: 'copy', text: 'Copiar' },
                            { extend: 'excel', text: 'Excel' },
                            { extend: 'csv', text: 'CSV' },
                            { extend: 'print', text: 'Imprimir' }
                        ],

                    }}
                    columns={columns}
                    className="display nowrap w-full"
                />
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
