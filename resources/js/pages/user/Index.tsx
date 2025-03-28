import { Head, usePage } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Toaster } from "sonner";
import { Link } from "@inertiajs/react";
import DeleteUserModal from "@/components/DeleteUserModal"; // Usamos Link de inertia para navegar sin recargar
import { useState } from "react"; // Importar useState para gestionar el estado del modal
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import languageES from 'datatables.net-plugins/i18n/es-ES.mjs';
import 'datatables.net-buttons-dt';
import 'datatables.net-responsive-dt';
import "datatables.net-buttons/js/buttons.html5";
import "datatables.net-buttons/js/buttons.print";
import jszip from 'jszip';

window.JSZip = jszip;

DataTable.use(DT);

// Definir la interfaz para un usuario
interface User {
    id: number;
    name: string;
    firstName: string;
    lastName: string;
    email: string;
    birthdate: Date;
    phoneNumber: string;
    password: string;
    role_id: number;
}

export default function Users() {
    const { users, roles } = usePage<{
        users: User[]; // Usar la interfaz User aquí
        roles: { id: number; name: string }[]; // Roles también
    }>().props;

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Estado del modal
    const [selectedUser, setSelectedUser] = useState<User | null>(null); // Tipo definido para el usuario

    const getRoleName = (roleId: number) => {
        const role = roles.find(r => r.id === roleId);
        return role ? role.name.trim() : "No Role"; // Si no se encuentra el rol, mostrar "No Role"
    };

    const columns = [
        { data: 'name' },
        { data: 'firstName' },
        { data: 'lastName' },
        { data: 'email' },
        { data: 'birthdate' },
        { data: 'phoneNumber' },
        {
            data: 'role_id', // Utiliza el ID del rol
            title: "Rol",
            createdCell: (td: HTMLTableCellElement, cellData: any, rowData: any) => {
                // Aquí mostramos el nombre del rol usando la función getRoleName
                td.innerHTML = getRoleName(rowData.role_id);
            }
        },
        {
            data: null,
            title: "Acciones",
            orderable: false,
            searchable: false,
            createdCell: (td: HTMLTableCellElement, cellData: any, rowData: any) => {
                td.innerHTML = `
                <a href="users/${rowData.id}/edit" class="edit-btn bg-orange-400 text-sm text-white px-3 py-1 rounded hover:bg-orange-500">Editar</a>
                <button class="delete-btn bg-red-500 text-sm text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
            `;

                td.querySelector('.delete-btn')?.addEventListener('click', () => openDeleteModal(rowData));
            }
        }
    ];

    // Función para abrir el modal con el usuario seleccionado
    const openDeleteModal = (user: User) => {
        setSelectedUser(user);
        setIsDeleteModalOpen(true); // Abrir el modal
    };

    return (
        <AppLayout>
            <Head title="Users" />
            <Toaster position="top-right" richColors />

            <div className="flex flex-col gap-6 p-6 bg-white text-black shadow-lg rounded-xl dark:bg-black/10 dark:text-white">
                <div className="flex justify-end">
                    <Link href="/users/create" className="bg-green-600 text-white rounded px-3 py-1 text-sm hover:bg-green-700 transition">
                        Add User
                    </Link>
                </div>

                <DataTable ajax="/api/users/getUsersData" options={{
                    language: languageES,
                    responsive: true,
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

            {/* Pasamos los props necesarios para controlar el estado del modal */}
            <DeleteUserModal
                isOpen={isDeleteModalOpen}
                closeModal={() => setIsDeleteModalOpen(false)}
                user={selectedUser}
            />
        </AppLayout>
    );
}
