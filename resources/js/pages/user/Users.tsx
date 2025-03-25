import { Head, usePage } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Toaster } from "sonner";
import { Link } from "@inertiajs/react";
import DeleteUserModal from "@/components/DeleteUserModal"; // Usamos Link de inertia para navegar sin recargar
import { useState } from "react"; // Importar useState para gestionar el estado del modal

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
    roles: { id: number; name: string }[];
  }>().props;

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Estado del modal
  const [selectedUser, setSelectedUser] = useState<User | null>(null); // Tipo definido para el usuario

  const getRoleName = (roleId: number) => {
    const role = roles.find(r => r.id === roleId);
    return role ? role.name.trim() : "No Role";
  };

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

        <table className="w-full border-collapse bg-white text-black shadow-sm rounded-lg dark:bg-gray-700 dark:text-white">
          <thead>
            <tr className="bg-gray-100 text-gray-800 border-b dark:bg-black/70 dark:text-gray-200">
              {["Usuario", "Nombre", "Apellido", "Correo Electronico", "Fecha de Nacimiento", "Telefono", "Rol"].map((header) => (
                <th key={header} className="border p-3 text-left">{header}</th>
              ))}
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.length ? (
              users.map((user) => (
                <tr key={user.id} className="border-b dark:bg-gray-800">
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.firstName}</td>
                  <td className="p-3">{user.lastName}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.birthdate? new Date(user.birthdate + 'T00:00:00').toLocaleDateString('en-GB'): "N/A"}</td>
                  <td className="p-3">{user.phoneNumber}</td>
                  <td className="p-3">{getRoleName(user.role_id)}</td>
                  <td className="p-3 flex gap-2">
                    {/* Enlace a la página de eliminación */}
                    <button className="bg-red-500 text-sm text-white px-3 py-1 rounded hover:bg-red-600" onClick={() => openDeleteModal(user)}>Delete</button>
                    {/* Enlace a la página de edición */}
                    <Link href={`/users/edit/${user.id}`} className="bg-orange-400 text-sm text-white px-3 py-1 rounded hover:bg-orange-500">
                      Edit
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan={7} className="text-center p-4 text-gray-600 dark:text-gray-300">No users found.</td></tr>
            )}
          </tbody>
        </table>
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
