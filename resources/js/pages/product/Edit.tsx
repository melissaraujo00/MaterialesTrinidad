import React, { useState } from 'react';
import { Head, usePage, router } from '@inertiajs/react';
import { Toaster, toast } from 'sonner';
import { Formik, Form, Field } from 'formik';
import AppLayout from '@/layouts/app-layout';
import { productValidationSchema } from '@/schemas/productSchema'; // Asegúrate de que no importe STATUS_OPTIONS aquí

interface Category { id: number; name: string; }
interface Brand { id: number; name: string; }
interface Product {
    id: number;
    name: string;
    description: string | null;
    priceWithTax: number;
    discountPrice: number;
    stock: number;
    stockMinimun: number;
    category_id: number | string;
    brand_id: number | string | null;
    image: string | null;
}

export default function ProductEdit() {
    const { product, categories, brands } = usePage<{
        product: Product,
        categories: Category[],
        brands: Brand[]
    }>().props;

    const [preview, setPreview] = useState<string | null>(product.image);

    const handleSubmit = (values: any) => {
        router.post(`/products/${product.id}`, {
            ...values,
            _method: 'PUT',
        }, {
            forceFormData: true,
            onSuccess: () => toast.success("Producto actualizado con éxito."),
            onError: () => toast.error("Error al actualizar el producto."),
        });
    };

    return (
        <AppLayout>
            <Head title="Editar Producto" />
            <Toaster position="top-right" richColors />

            <div className="flex flex-col gap-6 p-6 bg-white shadow-lg rounded-xl dark:bg-black/10 dark:text-white">
                <h2 className="text-2xl font-semibold mb-4">Editar Producto: {product.name}</h2>

                <Formik
                    initialValues={{
                        name: product.name || "",
                        description: product.description || "",
                        priceWithTax: product.priceWithTax || "",
                        discountPrice: product.discountPrice || "0",
                        category_id: product.category_id || "",
                        brand_id: product.brand_id || "",
                        stock: product.stock || "",
                        stockMinimun: product.stockMinimun || "",
                        image: null, 
                    }}
                    validationSchema={productValidationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ values, errors, touched, setFieldValue }) => (
                        <Form className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium">Nombre</label>
                                    <Field name="name" className="mt-1 p-2 w-full border rounded-md dark:bg-gray-800" />
                                    {touched.name && errors.name && <small className="text-red-500">{errors.name as string}</small>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Descripción</label>
                                    <Field name="description" className="mt-1 p-2 w-full border rounded-md dark:bg-gray-800" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium">Categoría</label>
                                    <Field as="select" name="category_id" className="mt-1 p-2 w-full border rounded-md dark:bg-gray-800">
                                        <option value="">Seleccione Categoría</option>
                                        {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                    </Field>
                                    {touched.category_id && errors.category_id && <small className="text-red-500">{errors.category_id as string}</small>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Marca</label>
                                    <Field as="select" name="brand_id" className="mt-1 p-2 w-full border rounded-md dark:bg-gray-800">
                                        <option value="">Seleccione Marca</option>
                                        {brands.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                                    </Field>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div>
                                    <label className="block text-sm font-medium">Precio $</label>
                                    <Field name="priceWithTax" type="number" step="0.01" className="mt-1 p-2 w-full border rounded-md dark:bg-gray-800" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Descuento $</label>
                                    <Field name="discountPrice" type="number" step="0.01" className="mt-1 p-2 w-full border rounded-md dark:bg-gray-800" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Stock</label>
                                    <Field name="stock" type="number" className="mt-1 p-2 w-full border rounded-md dark:bg-gray-800" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Stock Mínimo</label>
                                    <Field name="stockMinimun" type="number" className="mt-1 p-2 w-full border rounded-md dark:bg-gray-800" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium">Imagen del Producto</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.currentTarget.files?.[0] || null;
                                        setFieldValue("image", file);
                                        setPreview(file ? URL.createObjectURL(file) : product.image);
                                    }}
                                    className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                />
                                {preview && (
                                    <div className="mt-2">
                                        <p className="text-xs text-gray-500 mb-1">Vista previa:</p>
                                        <img src={preview} className="w-32 h-32 object-cover rounded shadow-md border" />
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-end gap-2 pt-4">
                                <button type="button" onClick={() => window.history.back()} className="bg-gray-400 text-white px-4 py-2 rounded">Cancelar</button>
                                <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">Actualizar Producto</button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </AppLayout>
    );
}
