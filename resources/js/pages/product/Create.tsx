import React, { useState } from 'react';
import { Head, usePage, router } from '@inertiajs/react';
import { Toaster, toast } from 'sonner';
import { Formik, Form, Field } from 'formik';
import AppLayout from '@/layouts/app-layout';
import { productValidationSchema, UNIT_OPTIONS } from '@/schemas/productSchema';

interface Category { id: number; name: string; }
interface Brand { id: number; name: string; }

export default function ProductCreate() {
    const { categories, brands } = usePage<{ categories: Category[], brands: Brand[] }>().props;
    const [preview, setPreview] = useState<string | null>(null);

    const handleSubmit = (values: any) => {
        // IMPORTANTE: Inertia maneja automáticamente FormData si detecta un File
        // No es estrictamente necesario crear el FormData a mano si usas router.post(url, values)
        // pero lo dejaremos estructurado correctamente para evitar el error de Token 'M'

        router.post("/products", values, {
            forceFormData: true, // Esto asegura que se envíe como multipart/form-data
            onSuccess: () => {
                toast.success("Producto creado con éxito.");
            },
            onError: (errors) => {
                console.error(errors);
                toast.error("Error al crear el producto. Revisa los campos.");
            },
        });
    };

    return (
        <AppLayout>
            <Head title="Crear Producto" />
            <Toaster position="top-right" richColors />

            <div className="flex flex-col gap-6 p-6 bg-white text-black shadow-lg rounded-xl dark:bg-black/10 dark:text-white">
                <h2 className="text-2xl font-semibold mb-4">Crear Nuevo Producto</h2>

                <Formik
                    initialValues={{
                        name: "",
                        description: "",
                        priceWithTax: "",
                        discountPrice: "0",
                        category_id: "",
                        brand_id: "",
                        stock: "",
                        stockMinimun: "",
                        image: null,
                    }}
                    validationSchema={productValidationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ values, handleChange, handleBlur, touched, errors, setFieldValue }) => (
                        <Form className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Name */}
                                <div>
                                    <label className="block text-sm font-medium">Nombre</label>
                                    <Field
                                        name="name"
                                        className="mt-1 p-2 w-full border rounded-md dark:bg-gray-800"
                                    />
                                    {touched.name && errors.name && <small className="text-red-500">{errors.name as string}</small>}
                                </div>
                            </div>


                            {/* Description */}
                            <div>
                                <label className="block text-sm font-medium">Descripción</label>
                                <Field name="description" as="textarea" className="mt-1 p-2 w-full border rounded-md dark:bg-gray-800" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Category */}
                                <div>
                                    <label className="block text-sm font-medium">Categoría</label>
                                    <Field as="select" name="category_id" className="mt-1 p-2 w-full border rounded-md dark:bg-gray-800">
                                        <option value="">Seleccione Categoría</option>
                                        {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                    </Field>
                                    {touched.category_id && errors.category_id && <small className="text-red-500">{errors.category_id as string}</small>}
                                </div>

                                {/* Brand */}
                                <div>
                                    <label className="block text-sm font-medium">Marca (Opcional)</label>
                                    <Field as="select" name="brand_id" className="mt-1 p-2 w-full border rounded-md dark:bg-gray-800">
                                        <option value="">Seleccione Marca</option>
                                        {brands.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                                    </Field>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div>
                                    <label className="block text-sm font-medium">Precio</label>
                                    <Field name="priceWithTax" type="number" step="0.01" className="mt-1 p-2 w-full border rounded-md dark:bg-gray-800" />
                                    {touched.priceWithTax && errors.priceWithTax && <small className="text-red-500">{errors.priceWithTax as string}</small>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Descuento</label>
                                    <Field name="discountPrice" type="number" step="0.01" className="mt-1 p-2 w-full border rounded-md dark:bg-gray-800" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Stock</label>
                                    <Field name="stock" type="number" className="mt-1 p-2 w-full border rounded-md dark:bg-gray-800" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Mínimo</label>
                                    <Field name="stockMinimun" type="number" className="mt-1 p-2 w-full border rounded-md dark:bg-gray-800" />
                                </div>
                            </div>

                            {/* Image */}
                            <div className="mt-4">
                                <label className="block text-sm font-medium">Imagen</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.currentTarget.files?.[0] || null;
                                        setFieldValue("image", file);
                                        setPreview(file ? URL.createObjectURL(file) : null);
                                    }}
                                    className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-50 file:text-blue-700"
                                />
                                {errors.image && <small className="text-red-500">{errors.image as string}</small>}
                                {preview && <img src={preview} className="mt-2 w-32 h-32 object-cover rounded-lg border" />}
                            </div>

                            <div className="flex justify-end gap-3 pt-4">
                                <button type="button" onClick={() => window.history.back()} className="px-4 py-2 bg-gray-200 rounded-md">Cancelar</button>
                                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Guardar Producto</button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </AppLayout>
    );
}
