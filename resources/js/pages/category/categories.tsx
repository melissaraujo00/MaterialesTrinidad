// import { useState } from "react";
import { Head, usePage } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Toaster } from "sonner";
import { Link } from "@inertiajs/react";

// Definir la interfaz para una categoría
interface Category {
  id: number;
  name: string;
  description: string;
}

export default function Categories() {
  // Cambiar la estructura de los datos que recibes para categorías
  const { categories } = usePage<{ categories: Category[] }>().props;

//   const openModal = (category: Category | null = null) => {
//     setSelectedCategory(category);
//     setIsModalOpen(true); // Abrir el modal
//   };

  return (
    <AppLayout>
      <Head title="Categories" />
      <Toaster position="top-right" richColors />

      <div className="flex flex-col gap-6 p-6 bg-white text-black shadow-lg rounded-xl dark:bg-black/10 dark:text-white">
        <div className="flex justify-end">
          {/* Botón para agregar categoría */}
          <Link href="categories/create" className="bg-green-600 text-white rounded px-3 py-1 text-sm hover:bg-green-700 transition">
            Agregar Categoria
          </Link>
        </div>

        <table className="w-full border-collapse bg-white text-black shadow-sm rounded-lg dark:bg-gray-700 dark:text-white">
          <thead>
            <tr className="bg-gray-100 text-gray-800 border-b dark:bg-black/70 dark:text-gray-200">
              {["Name", "Description", "Actions"].map((header) => (
                <th key={header} className="border p-3 text-left">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {categories.length ? (
              categories.map((category) => (
                <tr key={category.id} className="border-b dark:bg-gray-800">
                  <td className="p-3">{category.name}</td>
                  <td className="p-3">{category.description}</td>
                  <td className="p-3 flex gap-2">
                    {/* Enlace a la página de eliminación */}
                    <button className="bg-red-500 text-sm text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
                    {/* Enlace a la página de edición */}
                    <button className="bg-orange-400 text-sm text-white px-3 py-1 rounded hover:bg-orange-500">
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan={4} className="text-center p-4 text-gray-600 dark:text-gray-300">No categories found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

    </AppLayout>
  );
}
