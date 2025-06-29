import { Head, usePage, Link } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Toaster } from "sonner";
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
import { title } from "process";

window.JSZip = jszip;
DataTable.use(DT, responsive);

interface Customer {
    id: number;
    name: string;
}

export default function Customers() {
    // Obtener permisos del usuario autenticado
    const page = usePage();
    const permissions =
        page.props.auth?.user?.permissions && Array.isArray(page.props.auth.user.permissions)
            ? page.props.auth.user.permissions
            : [];
    const hasPermission = (perm: string) => permissions.includes(perm);

    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const openDeleteModal = (customer: Customer) => {
        setSelectedCustomer(customer);
        setIsDeleteModalOpen(true);
    };

    const columns = [
        { data: 'name', title: 'Nombre',responsivePriority: 1 },
        { data: 'email', title: 'Correo',responsivePriority: 7 },
        { data: 'register', title: 'Fecha de Registro', responsivePriority: 7 },
        { data: 'phoneNumber', title: 'Teléfono', responsivePriority: 7 },
        { data: 'nit', title: 'NIT', responsivePriority: 7 },
        { data: 'district', title: 'Distrito', responsivePriority: 7 },
        { data: 'address', title: 'Dirección', responsivePriority: 7 },
        { data: 'description', title: 'Descripción', responsivePriority: 7 },
        { data: 'status', title: 'Estado', responsivePriority: 7,},
        {
            data: null,
            orderable: false,
            searchable: false,
            responsivePriority: 1,
            title: 'Acciones',
            createdCell: (td: HTMLTableCellElement, cellData: any, rowData: any) => {
                let actions = "";
                if (hasPermission("editar clientes")) {
                    actions += `<a href="customers/${rowData.id}/edit" class="edit-btn bg-orange-400 text-sm text-white px-3 py-1 rounded hover:bg-orange-500">Editar</a>`;
                }
                if (hasPermission("eliminar clientes")) {
                    actions += `<button class="delete-btn bg-red-500 text-sm text-white px-3 py-1 rounded hover:bg-red-600">Eliminar</button>`;
                }
                td.innerHTML = actions;

                if (hasPermission("eliminar clientes")) {
                    td.querySelector('.delete-btn')?.addEventListener('click', () => openDeleteModal(rowData));
                }
            }
        }
    ];

    return (
        <AppLayout>
            <Head title="Clientes" />
            <Toaster position="top-right" richColors />

            <div className="flex flex-col gap-6 p-6 bg-white text-black shadow-lg rounded-xl dark:bg-black/10 dark:text-white">
                <div className="flex justify-end">
                    {hasPermission("crear clientes") && (
                        <Link
                            href="/customers/create"
                            className="bg-green-600 text-white rounded px-3 py-1 text-sm hover:bg-green-700 transition"
                        >
                            Agregar Cliente
                        </Link>
                    )}
                </div>

                <DataTable ajax="/api/customers/getCustomerData"
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
                    }} columns={columns} className="display nowrap w-full"
                />
            </div>
            <DeleteEntityModal
                isOpen={isDeleteModalOpen}
                closeModal={() => setIsDeleteModalOpen(false)}
                entity={selectedCustomer}
                entityType="cliente"
                deleteEndpoint="/customers"
            />
        </AppLayout>
    );
}
