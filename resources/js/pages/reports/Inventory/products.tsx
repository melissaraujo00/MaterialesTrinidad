import { Head, usePage, Link } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Toaster } from "sonner";
import { useState } from "react";
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import languageES from 'datatables.net-plugins/i18n/es-ES.mjs';
import 'datatables.net-buttons-dt';
import 'datatables.net-responsive-dt';
import jszip from 'jszip';
import { Formik, Form, Field } from 'formik';
import { useRef } from 'react';
import { router } from '@inertiajs/react';


window.JSZip = jszip;
DataTable.use(DT);

interface Product {
    id: number;
    name: string;
}


export default function Products() {

    const tableRef = useRef<any>(null);

    const { categories, products, selectedCategory } = usePage().props;

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        router.get(route('products.index'), {
            category: e.target.value,
        });
    };

    const getStockBadge = (stock: number, stockMinimun: number) => {
        if (stock <= stockMinimun) {
            return `<span class="bg-red-100 text-red-800 text-x font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-red-900 dark:text-red-300">${stock}</span>`;
        }
        return '';
    };


    const columns = [
        { data: 'name' },
        { data: 'description' },
        { data: 'price' },
        { data: 'priceWithTax' },
        { data: 'discountPrice' },
        {
            data: 'stock',
            createdCell: (td: HTMLTableCellElement, cellData: any, rowData: any) => {
                td.innerHTML = getStockBadge(rowData.stock, rowData.stockMinimun) || rowData.stock;
            }
        },
        {
            data: 'category_id',
            createdCell: (td: HTMLTableCellElement, cellData: any) => {
                td.innerHTML = cellData == null ? '<span class="text-gray-500 italic">Sin categoría</span>' : cellData;
            }
        },
        {
            data: 'brand_id',
            createdCell: (td: HTMLTableCellElement, cellData: any) => {
                td.innerHTML = cellData == null ? '<span class="text-gray-500 italic">Sin marca</span>' : cellData;
            }
        },
        { data: 'stockMinimun' },
        {
            data: 'image',
            createdCell: (td: HTMLTableCellElement, cellData: any, rowData: any) => {
                if (cellData) {
                    td.innerHTML = `<img src="${cellData}" alt="Imagen del producto" width="200" height="200" class="object-cover rounded shadow-md transition-transform duration-200 hover:scale-110"/>`;
                } else {
                    td.innerHTML = `<span class="text-gray-500 italic">Sin imagen</span>`;
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
                    <a href="inventoryReport" className="ml-3 bg-blue-600 text-white rounded px-3 py-1 text-sm hover:bg-blue-700 transition">
                        Reporte
                    </a>
                    <div>
                        <label htmlFor="category_id" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Categoría</label>
                        {/* <select
                            id="category_id"
                            name="category"
                            //value={selectedCategory || ''}
                            onChange={handleFilterChange}
                            className="mt-1 p-2 w-3/4 max-w-md border rounded-md dark:bg-gray-800 dark:text-white"
                        >
                            <option value="">Todas las Categorías</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select> */}
                    </div>

                </div>

                <DataTable
                    ref={tableRef}
                    //ajax={/api/products/getProductData}
                    options={{
                        language: languageES,
                        responsive: true,
                        dom: 'lBrtip',
                        layout: {
                            topStart: ['pageLength'],
                        },
                    }}
                    columns={columns}
                    className="display"
                >
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Descripcion</th>
                            <th>Precio</th>
                            <th>Precio con IVA</th>
                            <th>Precio con descuento</th>
                            <th>Stock</th>
                            <th>Categoria</th>
                            <th>Marca</th>
                            <th>stock minimo</th>
                            <th>Imagen</th>
                        </tr>
                    </thead>
                </DataTable>
            </div>
        </AppLayout>
    );
}
