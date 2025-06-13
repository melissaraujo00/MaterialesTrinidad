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

interface Product {
    id: number;
    name: string;
}


export default function Products() {
    // Obtener permisos del usuario autenticado
    const page = usePage();
    const permissions =
        page.props.auth?.user?.permissions && Array.isArray(page.props.auth.user.permissions)
            ? page.props.auth.user.permissions
            : [];
    const hasPermission = (perm: string) => permissions.includes(perm);

    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const getStockBadge = (stock: number, stockMinimun: number) => {
        if (stock <= stockMinimun) {
            return `<span class="bg-red-100 text-red-800 text-x font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-red-900 dark:text-red-300">${stock}</span>`;
        }
        return '';
    };

    const openDeleteModal = (product: Product) => {
        setSelectedProduct(product);
        setIsDeleteModalOpen(true);
    };
    
    const columns = [
        { data: 'name', title: 'Producto', responsivePriority: 1 },
        { data: 'description', title: 'Descripción', responsivePriority: 7 },
        { data: 'priceWithTax', title: 'Precio', responsivePriority: 1 },
        { data: 'discountPrice', title: 'Precio con descuento',responsivePriority: 6 },
        {
            data: 'stock',
            title: 'Stock',
            responsivePriority: 6,
            createdCell: (td: HTMLTableCellElement, cellData: any, rowData: any) => {
                td.innerHTML = getStockBadge(rowData.stock, rowData.stockMinimun) || rowData.stock;
            }
        },
        {
            data: 'category_id',
            title: 'Categoría',
            responsivePriority: 6,
            createdCell: (td: HTMLTableCellElement, cellData: any) => {
                td.innerHTML = cellData == null ? '<span class="text-gray-500 italic">Sin categoría</span>' : cellData;
            }
        },
        {
            data: 'brand_id',
            title: 'Marca',
            responsivePriority: 6,
            createdCell: (td: HTMLTableCellElement, cellData: any) => {
                td.innerHTML = cellData == null ? '<span class="text-gray-500 italic">Sin marca</span>' : cellData;
            }
        },
        { data: 'stockMinimun', title: 'Stock mínimo', responsivePriority: 6 },
        {
            data: 'image',
            title: 'Imagen',
            responsivePriority: 8,
            createdCell: (td: HTMLTableCellElement, cellData: any, rowData: any) => {
                if (cellData) {
                    td.innerHTML = `<img src="${cellData}" alt="Imagen del producto" width="200" height="200" class="object-cover rounded shadow-md transition-transform duration-200 hover:scale-110"/>`;
                } else {
                    td.innerHTML = `<span class="text-gray-500 italic">Sin imagen</span>`;
                }
            }
        },
        {
            data: null,
            title: 'Acciones',
            responsivePriority: 1,
            orderable: false,
            searchable: false,
            createdCell: (td: HTMLTableCellElement, cellData: any, rowData: any) => {


                    let actions = "";
                    if (hasPermission("editar producto")) {
                        actions += `<a href="products/${rowData.id}/edit" class="edit-btn bg-orange-400 text-sm text-white px-3 py-1 rounded hover:bg-orange-500">Editar</a>`;
                    }
                    if (hasPermission("eliminar producto")) {
                        actions += `<button class="delete-btn bg-red-500 text-sm text-white px-3 py-1 rounded hover:bg-red-600">Eliminar</button>`;
                    }
                    td.innerHTML = actions;

                    if (hasPermission("eliminar producto")) {
                        td.querySelector('.delete-btn')?.addEventListener('click', () => openDeleteModal(rowData));
                    }

            }
        }
    ];

    return (
        <AppLayout>
            <Head title="Products" />
            <Toaster position="top-right" richColors />

            <div className="flex flex-col gap-6 p-6 bg-white text-black shadow-lg rounded-xl dark:bg-black/10 dark:text-white">
                <div className="flex justify-end">
                    {hasPermission("crear producto")   &&(
                        <Link
                            href="/products/create"
                            className="bg-green-600 text-white rounded px-3 py-1 text-sm hover:bg-green-700 transition"
                        >
                            Agregar Producto
                        </Link>
                    )}
                </div>

                <DataTable ajax="/api/products/getProductData" options={{
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

                        }}columns={columns} className="display nowrap w-full"
            />
            </div>
            <DeleteEntityModal
                isOpen={isDeleteModalOpen}
                closeModal={() => setIsDeleteModalOpen(false)}
                entity={selectedProduct}
                entityType="producto"
                deleteEndpoint="/products"
            />
        </AppLayout>
    );
}
