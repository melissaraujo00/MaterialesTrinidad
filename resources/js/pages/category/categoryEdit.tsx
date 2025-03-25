import React, { useEffect } from "react";
import { Head, useForm } from "@inertiajs/react";  // Importa `useForm`
import { Toaster, toast } from "sonner";
import { router } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";

interface Category {
  id: number;
  name: string;
  description:string;

}

interface Props {
  category: Category;
}

const CategoryEdit: React.FC<Props> = ({category}) => {
  
  const { data, setData, put, processing, errors } = useForm({
    name: category.name,
    description: category.description,
  });

  useEffect(() => {
    setData({
      name: category.name,
      description: category.description
      
    });
  }, [category]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const successMessage = "Categoria fue editado Correctamente";
  const errorMessage = "Fallo al editar Categoria";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    put(route('categories.update', category.id), {
      onSuccess: () => {
          toast.success(successMessage);
          router.reload();
      },
      onError: (err) => {
          console.error("Error al crear usuario:", err);
          toast.error(errorMessage);
      },
    });

  };

  return (
    <AppLayout>
      <Head title="Edit category" />
      <Toaster position="top-right" richColors />

      <div className="flex flex-col gap-6 p-6 bg-white text-black shadow-lg rounded-xl dark:bg-black/10 dark:text-white">
        <h2 className="text-2xl font-semibold mb-4">Edit Category</h2>

        <form onSubmit={handleSubmit} className="space-y-2">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={data.name}
              onChange={handleInputChange}
              className="mt-1 p-2 w-3/4 max-w-md border rounded-md dark:bg-gray-800 dark:text-white"
              required
            />
          </div>

          {/* First Name */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Description
            </label>
            <input
              type="text"
              id="description"
              name="description"
              value={data.description}
              onChange={handleInputChange}
              className="mt-1 p-2 w-3/4 max-w-md border rounded-md dark:bg-gray-800 dark:text-white"
              required
            />

          </div>
          {/* Submit Button */}
          <div className="flex justify-start space-x-5">
            <button
              type="button"
              onClick={() => window.history.back()}  // Volver a la página anterior
              className="bg-gray-400 text-white rounded px-4 py-2 hover:bg-gray-500 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition"
              disabled={processing}
            >
              {processing ? "Actualizando..." : "Actualizar"}
            </button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
};

export default CategoryEdit;
