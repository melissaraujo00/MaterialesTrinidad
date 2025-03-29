import { useState } from "react";
import { Head } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Toaster } from "sonner";
import { Link } from "@inertiajs/react";
import DeleteCategoryModal from "@/components/DeleteCategoryModal";
import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import languageES from "datatables.net-plugins/i18n/es-ES.mjs";
import "datatables.net-buttons-dt";
import "datatables.net-responsive-dt";
// import "datatables.net-buttons/js/buttons.html5";
// import "datatables.net-buttons/js/buttons.print";
import jszip from "jszip";

window.JSZip = jszip;
DataTable.use(DT);

// Definir la interfaz para una categoría
interface Category {
  id: number;
  name: string;
  description: string;
}

export default function Categories() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const openDeleteModal = (category: Category) => {
    setSelectedCategory(category);
    setIsDeleteModalOpen(true);
  };

  const columns = [
    { data: 'name'},
    { data: 'description'},
    {
        data: null,
        title: "Acciones",
        orderable: false,
        searchable: false,
        createdCell: (td: HTMLTableCellElement, cellData: any, rowData: any) => {
            td.innerHTML = `
            <a href="categories/${rowData.id}/edit" class="edit-btn bg-orange-400 text-sm text-white px-3 py-1 rounded hover:bg-orange-500">Editar</a>
            <button class="delete-btn bg-red-500 text-sm text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
        `;

            td.querySelector('.delete-btn')?.addEventListener('click', () => openDeleteModal(rowData));
        }
    },
  ];

  return (
    <AppLayout>
      <Head title="Categorías" />
      <Toaster position="top-right" richColors />

      <div className="flex flex-col gap-6 p-6 bg-white text-black shadow-lg rounded-xl dark:bg-black/10 dark:text-white">
        <div className="flex justify-end">
          {/* Botón para agregar categoría */}
          <Link
            href="/categories/create"
            className="bg-green-600 text-white rounded px-3 py-1 text-sm hover:bg-green-700 transition"
          >
            Agregar Categoría
          </Link>
        </div>

        <DataTable ajax="/api/categories/getCategoryData" options={{
            language: languageES,
            responsive: true,
            dom: 'lBrtip',
            layout: {
              topStart: ["pageLength"],
            },
          }}
          columns={columns} className="display" >
        <thead>
            <tr>
                <th>Nombre de Categoria</th>
                <th>Descripción</th>
                <th>Acciones</th>
            </tr>
        </thead>
        </DataTable>
      </div>

      <DeleteCategoryModal
        isOpen={isDeleteModalOpen}
        closeModal={() => setIsDeleteModalOpen(false)}
        category={selectedCategory}
      />
    </AppLayout>
  );
}
