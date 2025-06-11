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
import { useRef, useEffect } from 'react';
import { router } from '@inertiajs/react';

window.JSZip = jszip;
DataTable.use(DT);


interface Category {
    id: number;
    name: string;
}
export default function Products() {
    const tableRef = useRef<any>(null);
    const { selectedCategory: initialCategory, selectedBrand: initialBrand, categories: rawCategories, brands: rawBrands } = usePage().props;

    const categories = rawCategories as Category[];
    const brands = rawBrands as Category[];

    const [selectedCategory, setSelectedCategory] = useState(initialCategory ?? '');
    const [selectedBrand, setSelectedBrand] = useState(initialBrand ?? '');

    const dtInstanceRef = useRef<any>(null);
    const [tableKey, setTableKey] = useState(0);

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(e.target.value);
    };

    const handleBrandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedBrand(e.target.value);
    };


    const getStockBadge = (stock: number, stockMinimun: number) => {
        if (stock <= stockMinimun) {
            return `<span class="bg-red-100 text-red-800 text-x font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-red-900 dark:text-red-300">${stock}</span>`;
        }
        return '';
    };


    const createAjaxFunction = () => {
        return (data: any, callback: any) => {
            const params = new URLSearchParams({
                category_id: selectedCategory?.toString() || '',
                brand_id: selectedBrand?.toString() || ''
            });
            fetch(`/api/inventory/getInventoryData?${params.toString()}`)
                .then((res) => res.json())
                .then((json) => {
                    callback(json);
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                    callback({ data: [] });
                });
        };
    };


    useEffect(() => {
        setTableKey(prev => prev + 1);
    }, [selectedCategory, selectedBrand])

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
                if (cellData == null) {
                    td.innerHTML = '<span class="text-gray-500 italic">Sin categoría</span>';
                } else {
                    const category = categories.find(cat => cat.id === Number(cellData));
                    td.innerHTML = category ? category.name : cellData;
                }
            }
        },
        {
            data: 'brand_id',
            createdCell: (td: HTMLTableCellElement, cellData: any) => {
                if (cellData == null) {
                    td.innerHTML = cellData == null ? '<span class="text-gray-500 italic">Sin marca</span>' : cellData;
                } else {
                    const category = categories.find(cat => cat.id === Number(cellData));
                    td.innerHTML = category ? category.name : cellData;
                }
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
                <div className="flex justify-between items-center mb-4">
                    <form action={route('inventoryReport')} method="GET" className="inline">
                        <input type="hidden" name="category" value={selectedCategory?.toString() ?? ""} />
                        <input type="hidden" name="brand" value={selectedBrand?.toString() ?? ""} />
                        <button type="submit" className="ml-3 bg-blue-600 text-white rounded px-3 py-1 text-sm hover:bg-blue-700 transition">
                            Reporte
                        </button>
                    </form>

                    <div className="flex flex-wrap gap-4">
                        <div className="flex-1 min-w-[150px]">
                            <label htmlFor="category_id" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Categoría
                            </label>
                            <select
                                id="category_id"
                                name="category"
                                value={selectedCategory?.toString() ?? ""}
                                onChange={handleCategoryChange}
                                className="mt-1 p-2 w-full border rounded-md dark:bg-gray-800 dark:text-white"
                            >
                                <option value="">Categorías</option>
                                {categories.map((category: { id: number; name: string }) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex-1 min-w-[150px]">
                            <label htmlFor="brand_id" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Marca
                            </label>
                            <select
                                id="brand_id"
                                name="brand"
                                value={selectedBrand?.toString() ?? ""}
                                onChange={handleBrandChange}
                                className="mt-1 p-2 w-full border rounded-md dark:bg-gray-800 dark:text-white"
                            >
                                <option value="">Marcas</option>
                                {brands.map((brand: { id: number; name: string }) => (
                                    <option key={brand.id} value={brand.id}>
                                        {brand.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                </div>
                <DataTable
                    key={tableKey}
                    ref={tableRef}
                    ajax={createAjaxFunction()}
                    options={{
                        language: languageES,
                        processing: true,
                        responsive: true,
                        dom: 'lBrtip',
                        initComplete: function (this: any) {
                            dtInstanceRef.current = this.api();
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
