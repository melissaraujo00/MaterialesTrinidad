import { Head, usePage } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Toaster, toast } from "sonner";
import { router } from "@inertiajs/react";
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { useState } from 'react';

export default function ProductCreate() {
    const { categories, brands } = usePage<{
        categories: { id: number; name: string }[],
        brands: { id: number; name: string }[];
    }>().props;

    const [preview, setPreview] = useState<string | null>(null);

    const validationSchema = Yup.object({
        name: Yup.string().min(2, 'El nombre debe tener al menos 2 caracteres').required('El nombre es requerido'),
        price: Yup.number().positive('El precio debe ser positivo y mayor a 0').required('El precio es requerido'),
        discountPrice: Yup.number().positive('El precio con descuento debe ser positivo y mayor a 0').required('El precio con descuento es requerido'),
        description: Yup.string().max(255, 'La descripción no puede exceder los 255 caracteres'),
        category_id: Yup.string(),
        brand_id: Yup.string(),
        stock: Yup.number().integer().min(0, 'El stock debe ser un número entero').required('El stock es requerido'),
        stockMinimun: Yup.number().integer().min(0, 'El stock mínimo debe ser un número entero').required('El stock mínimo es requerido'),
        image: Yup.mixed()
            .nullable()
            .test("fileSize", "La imagen es muy grande debe de ser menor de 2MB", (value) => {
                return !value || (value instanceof File && value.size <= 2097152);
            })
            .test("fileFormat", "Formato no soportado", (value) => {
                return !value || (value instanceof File && ["image/jpeg", "image/png", "image/webp"].includes(value.type));
            })
            .test("filePathLength", "La ruta del archivo excede los 255 caracteres", (value) => {
                return !value || (value instanceof File && value.name.length <= 255);
            }),
    });

    const handleSubmit = (values: any) => {
        const data = new FormData();
        data.append("name", values.name);
        data.append("description", values.description || "");
        data.append("price", values.price.toString());
        data.append("priceWithTax", (values.price + values.price * 0.13).toFixed(2));
        data.append("discountPrice", values.discountPrice);
        data.append("category_id", values.category_id);
        data.append("brand_id", values.brand_id);
        data.append("stock", values.stock);
        data.append("stockMinimun", values.stockMinimun)

        if (values.image) {
            data.append("image", values.image);
        }

        router.post("/products", data, {
            onSuccess: () => {
                setTimeout(() => {
                    toast.success("Producto creado con éxito.");
                }, 1000);
            },
            onError: (errors) => {
                console.error("Errores de validación:", errors);
                toast.error("Hubo un error al crear el Producto. Verifica los datos.");
                if (errors.image) {
                    toast.error(errors.image);
                }
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
                        price: "",
                        discountPrice: "",
                        category_id: "",
                        brand_id: "",
                        stock: "",
                        stockMinimun: "",
                        image: null,
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ values, handleChange, handleBlur, touched, errors, setFieldValue }) => (
                        <Form className="space-y-2">
                            {/* Name */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nombre</label>
                                <Field
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="Ej: Lamina"
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="mt-1 p-2 w-3/4 max-w-md border rounded-md dark:bg-gray-800 dark:text-white"
                                />
                                {touched.name && errors.name && <small className="text-red-500">{errors.name}</small>}
                            </div>

                            {/* Description */}
                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Descripción (Opcional)</label>
                                <Field
                                    type="text"
                                    id="description"
                                    name="description"
                                    placeholder="Ej: El producto es para uso general"
                                    value={values.description}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="mt-1 p-2 w-3/4 max-w-md border rounded-md dark:bg-gray-800 dark:text-white"
                                />
                                {touched.description && errors.description && <small className="text-red-500">{errors.description}</small>}
                            </div>

                            {/* Price */}
                            <div>
                                <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Precio: $</label>
                                <Field
                                    type="number"
                                    step="0.01"
                                    id="price"
                                    name="price"
                                    placeholder="Ej: 12.50"
                                    value={values.price}
                                    onChange={(event) => {
                                        const price = parseFloat(event.target.value) || 0;
                                        setFieldValue("price", price);
                                        setFieldValue("priceWithTax", parseFloat((price + price * 0.13).toFixed(2))); // Calcula automáticamente el precio con IVA
                                    }}
                                    onBlur={handleBlur}
                                    className="mt-1 p-2 w-3/4 max-w-md border rounded-md dark:bg-gray-800 dark:text-white"
                                />
                                {touched.price && errors.price && <small className="text-red-500">{errors.price}</small>}
                            </div>
                            {/* Discount Price */}
                            <div>
                                <label htmlFor="discountPrice" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Precio con descuento</label>
                                <Field
                                    type="number"
                                    step="0.01"
                                    id="discountPrice"
                                    name="discountPrice"
                                    placeholder="Ej: 6.70"
                                    value={values.discountPrice}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="mt-1 p-2 w-3/4 max-w-md border rounded-md dark:bg-gray-800 dark:text-white"
                                />
                                {touched.discountPrice && errors.discountPrice && <small className="text-red-500">{errors.discountPrice}</small>}
                            </div>

                            {/* Category */}
                            <div>
                                <label htmlFor="category_id" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Categoría</label>
                                <Field
                                    as="select"
                                    id="category_id"
                                    name="category_id"
                                    value={values.category_id}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="mt-1 p-2 w-3/4 max-w-md border rounded-md dark:bg-gray-800 dark:text-white"
                                >
                                    <option value="" disabled>Seleccione una Categoría</option>
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.id}>{category.name}</option>
                                    ))}
                                </Field>
                                {touched.category_id && errors.category_id && <small className="text-red-500">{errors.category_id}</small>}
                            </div>

                            {/* Brand */}
                            <div>
                                <label htmlFor="brand_id" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Marca</label>
                                <Field
                                    as="select"
                                    id="brand_id"
                                    name="brand_id"
                                    value={values.brand_id}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="mt-1 p-2 w-3/4 max-w-md border rounded-md dark:bg-gray-800 dark:text-white"
                                >
                                    <option value="" disabled>Seleccione una Marca</option>
                                    {brands.map((brand) => (
                                        <option key={brand.id} value={brand.id}>{brand.name}</option>
                                    ))}
                                </Field>
                                {touched.brand_id && errors.brand_id && <small className="text-red-500">{errors.brand_id}</small>}
                            </div>

                            {/* Stock */}
                            <div>
                                <label htmlFor="stock" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Cantidad de producto disponible</label>
                                <Field
                                    type="number"
                                    placeholder = "Ej: 100"
                                    id="stock"
                                    name="stock"
                                    value={values.stock}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="mt-1 p-2 w-3/4 max-w-md border rounded-md dark:bg-gray-800 dark:text-white"
                                />
                                {touched.stock && errors.stock && <small className="text-red-500">{errors.stock}</small>}
                            </div>

                            {/* Stock Minimum */}
                            <div>
                                <label htmlFor="stockMinimun" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Stock Mínimo</label>
                                <Field
                                    type="number"
                                    placeholder = "Ej: 10"
                                    id="stockMinimun"
                                    name="stockMinimun"
                                    value={values.stockMinimun}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="mt-1 p-2 w-3/4 max-w-md border rounded-md dark:bg-gray-800 dark:text-white"
                                />
                                {touched.stockMinimun && errors.stockMinimun && <small className="text-red-500">{errors.stockMinimun}</small>}
                            </div>

                            {/* Image Upload */}
                            <div className="mb-3">
                                <label className="block text-gray-950 text-sm font-medium dark:text-gray-300">Imagen (opcional)</label>
                                <input
                                    type="file"
                                    name="image"
                                    accept="image/*"
                                    onChange={(event) => {
                                        const file = event.currentTarget.files?.[0];
                                        if (file) {
                                            setPreview(URL.createObjectURL(file));
                                            setFieldValue("image", file);
                                        }
                                    }}
                                    className="w-full text-gray-950 dark:text-white"
                                />
                                {touched.image && errors.image && <small className="text-red-500">{errors.image}</small>}
                            </div>

                            {/* Image Preview */}
                            {preview && (
                                <div className="mb-3">
                                    <p className="text-sm mb-1 dark:text-gray-300">Vista previa de la imagen:</p>
                                    <img src={preview} alt="Vista Previa" className="w-32 h-32 object-cover rounded" />
                                </div>
                            )}

                            {/* Buttons */}
                            <div className="flex justify-start">
                                <button
                                    type="button"
                                    onClick={() => window.history.back()}
                                    className="bg-gray-400 text-white rounded px-4 py-2 hover:bg-gray-500 transition"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition"
                                >
                                    Crear Producto
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </AppLayout>
    );
}
