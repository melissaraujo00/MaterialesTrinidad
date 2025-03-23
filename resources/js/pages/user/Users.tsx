import { useState } from "react";
import { Head, usePage } from "@inertiajs/react";
import UserFormModal from "@/components/UserFormModal";
import AppLayout from "@/layouts/app-layout";
import { Toaster } from "sonner";
import DeleteUserModal from "@/components/DeleteUserModal";

export default function Users() {
  const { users, roles } = usePage<{
    users: {
      id: number;
      name: string;
      firstName: string;
      lastName: string;
      email: string;
      birthdate: Date;
      phoneNumber: string;
      password: string;
      role_id: number;
    }[];
    roles: { id: number, name: string }[];
  }>().props;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<{
    id: number;
    name: string;
    firstName: string;
    lastName: string;
    email: string;
    birthdate: Date;
    phoneNumber: string;
    password: string;
    role_id: number;
  } | null>(null);

  const openModal = (user: {
    id: number;
    name: string;
    firstName: string;
    lastName: string;
    email: string;
    birthdate: Date;
    phoneNumber: string;
    password: string;
    role_id: number;
  } | null = null) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  // Función para obtener el nombre del rol y asegurar que no haya espacios extra
  const getRoleName = (roleId: number) => {
    const role = roles.find(r => r.id === roleId);
    return role ? role.name.trim() : "No Role";  // Uso de .trim() para eliminar espacios innecesarios
  };

  const openDeleteModal=(user: {
    id: number;
    name: string;
    firstName: string;
    lastName: string;
    email: string;
    birthdate: Date;
    phoneNumber: string;
    password: string;
    role_id: number;
  } | null = null)=>{
    setSelectedUser(user);
    setIsDeleteModalOpen(true)
 }

  return (
    <AppLayout>
      <Head title="Users" />
      <Toaster position="top-right" richColors/>

      <div className="flex flex-col gap-6 p-6 bg-white text-black shadow-lg rounded-xl dark:bg-black/10 dark:text-white">
        <div className="flex justify-end">
          <button onClick={() => openModal()} className="bg-green-600 text-white rounded px-3 py-1 text-sm hover:bg-green-700 transition">
            Add User
          </button>
        </div>

        <table className="w-full border-collapse bg-white text-black shadow-sm rounded-lg dark:bg-gray-700 dark:text-white">
          <thead>
            <tr className="bg-gray-100 text-gray-800 border-b dark:bg-black/70 dark:text-gray-200">
              {["Usuario", "Nombre", "Apellido", "Correo Electronico", "Fecha de Nacimiento", "Telefono", "Rol"].map((header) => (
                <th key={header} className="border p-3 text-left">{header}</th>
              ))}
              <th>
                Acciones
              </th>
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
                  <td className="p-3">{user.birthdate ? new Date(user.birthdate).toLocaleDateString() : "N/A"}</td>
                  <td className="p-3">{user.phoneNumber}</td>
                  <td className="p-3">{getRoleName(user.role_id)}</td>
                  <td className="p-3 flex gap-2">
                    <button className="bg-red-500 text-sm text-white px-3 py-1 rounded hover:bg-red-600" onClick={()=>openDeleteModal(user)}>Delete</button>
                    <button onClick={() => openModal(user)} className="bg-orange-400 text-sm text-white px-3 py-1 rounded hover:bg-orange-500">Edit</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan={4} className="text-center p-4 text-gray-600 dark:text-gray-300">No posts found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
      <UserFormModal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} user={selectedUser} />
      <DeleteUserModal isOpen={isDeleteModalOpen} closeModal={() => setIsDeleteModalOpen(false)} user={selectedUser} />
    </AppLayout>
  );
}
