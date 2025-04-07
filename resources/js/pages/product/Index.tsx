import { Head, } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Toaster } from "sonner";
import { Link } from "@inertiajs/react";
import { useState } from "react";
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import languageES from 'datatables.net-plugins/i18n/es-ES.mjs';
import 'datatables.net-buttons-dt';
import 'datatables.net-responsive-dt';
// import "datatables.net-buttons/js/buttons.html5";
// import "datatables.net-buttons/js/buttons.print";
import jszip from 'jszip';
import DeleteEntityModal from "../../components/DeleteEntityModal";

window.JSZip = jszip;

DataTable.use(DT);

interface Product {
    id: number;
    name: string;
  }

export default function Products() {

     const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
      const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    
      const openDeleteModal = (product: Product) => {
        setSelectedProduct(product);
        setIsDeleteModalOpen(true);
      };

    const columns = [
        { data: 'name' },
        { data: 'description'},
        { data: 'price'},
        { data: 'priceWithTax'},
        { data: 'stock'},
        { data: 'image'},
        { data: 'category_id'},
        { data: 'brand_id'},
        {
            data: null,
            orderable: false,
            searchable: false,
            createdCell: (td: HTMLTableCellElement, cellData: any, rowData: any) => {
                td.innerHTML = `
                <a href="products/${rowData.id}/edit" class="edit-btn bg-orange-400 text-sm text-white px-3 py-1 rounded hover:bg-orange-500">Editar</a>
                <button class="delete-btn bg-red-500 text-sm text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
            `;

                td.querySelector('.delete-btn')?.addEventListener('click', () => openDeleteModal(rowData));
            }
        }
    ];

    return (
        <AppLayout>
            <Head title="Products" />
            <Toaster position="top-right" richColors />

            <div className="flex flex-col gap-6 p-6 bg-white text-black shadow-lg rounded-xl dark:bg-black/10 dark:text-white">
            <div className="flex justify-end">
                <Link
                    href="/products/create"
                    className="bg-green-600 text-white rounded px-3 py-1 text-sm hover:bg-green-700 transition"
                >
                    Agregar Producto
                </Link>
            </div>

                <DataTable ajax="/api/products/getProductData" options={{
                    language: languageES,
                    responsive: true,
                    dom: 'lBrtip',
                    layout: {
                        topStart: ['pageLength'],

                    },
                }} columns={columns} className="display">
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Descripcion</th>
                            <th>Precio</th>
                            <th>Precio con IVA</th>
                            <th>Stock</th>
                            <th>Imagen</th>
                            <th>Categoria</th>
                            <th>Marca</th>
                        </tr>
                    </thead>
                </DataTable>
            </div>
            <DeleteEntityModal
                    isOpen={isDeleteModalOpen}
                    closeModal={() => setIsDeleteModalOpen(false)}
                    entity={selectedProduct}
                    entityType="producto"
                    deleteEndpoint="/products"
                  />
        </AppLayout>);
}
