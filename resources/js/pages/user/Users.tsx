import { useState } from "react";
import { Head, router, usePage } from "@inertiajs/react";
import UserFormModal from "@/components/UserFormModal";
import AppLayout from "@/layouts/app-layout";
import { Toaster, toast } from "sonner";

export default function Users() {
  const { users } = usePage<{ users:
    { id: number;
      name: string;
      firstName: string;
      lastName: string;
      email: string;
      birthdate: Date;
      phoneNumber: string;
      password: string;
      role_id: number;
    }[] }>().props;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const openModal = (user = null) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };


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
            {["Name", "FirstName", "LastName", "Email", "BirthDate", "PhoneNumber", "Role_id"].map((header) => (
                <th key={header} className="border p-3 text-left">{header}</th>
            ))}
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
                <td className="p-3">{user.password}</td>
                <td className="p-3">{user.role_id}</td>
                <td className="p-3 flex gap-2">
                    <button className="bg-red-500 text-sm text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
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
    </AppLayout>
  );
}
