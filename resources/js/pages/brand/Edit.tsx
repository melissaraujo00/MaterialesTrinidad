import React  from "react";
import { Head } from "@inertiajs/react";
import { Toaster, toast } from "sonner";
import { router } from "@inertiajs/react";
import * as Yup from 'yup';
import { useState } from 'react';
import AppLayout from "@/layouts/app-layout";
import { Formik, Field } from 'formik';

interface Brand {
    id: number;
    name: string;
    description: string;
}

interface Props {
    brand: Brand;
}

const BrandEdit: React.FC<Props> = ({ brand }) => {
    const [brandExists] = useState(false);

    const validationSchema = Yup.object({
        name: Yup.string().min(3, 'El nombre debe tener al menos 3 caracteres').required('Campo requerido'),
        description: Yup.string().min(3, 'La descripcion debe tener al menos 3 caracteres')
    });


    const handleSubmit = (values: { name: string; description: string }) => {
        if (brandExists) {
        toast.error("Este nombre de marca ya existe.");
        return;
        }
        router.put(route('brands.update', brand.id), values, {
        onSuccess: () => {
            setTimeout(() => {
                toast.success("Marca editada con éxito.");
            }, 400);
            router.reload();
            },
            onError: (err) => {
                toast.error("Marca editada con éxito.")
                console.error("Error al editar marca:", err);
                if (err.name) {
                    toast.error(err.name);
                }
            },
        });
    };

    return (
        <AppLayout>
            <Head title="Editar Marca" />
            <Toaster position="top-right" richColors />

            <div className="flex flex-col gap-6 p-6 bg-white text-black shadow-lg rounded-xl dark:bg-black/10 dark:text-white">
                <h2 className="text-2xl font-semibold mb-4">Editar Marcas</h2>
                <Formik
                initialValues={{
                    id: brand.id.toString(),
                    name: brand.name,
                    description: brand.description ?? '',
                }}
                enableReinitialize={true}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                >
                {({ values, handleChange, handleBlur, touched, errors,  handleSubmit}) => (

                    <form onSubmit={handleSubmit} className="space-y-2">
                    {/* Name */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Nombre
                        </label>
                        <Field
                        type="text"
                        id="name"
                        placeholder="Ej: Terniun"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="mt-1 p-2 w-3/4 max-w-md border rounded-md dark:bg-gray-800 dark:text-white"
                        required
                        />
                        {touched.name && errors.name && <small className="text-red-500">{errors.name}</small>}
                    </div>

                    {/* First Name */}
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Descripcion (Opcional)
                        </label>
                        <Field
                        type="text"
                        id="description"
                        name="description"
                        placeholder="Ej: Lamina es una marca de productos de calidad"
                        value={values.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="mt-1 p-2 w-3/4 max-w-md border rounded-md dark:bg-gray-800 dark:text-white"
                        />
                        {touched.description && errors.description && <small className="text-red-500">{errors.description}</small>}
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
                        >
                        Actualizar
                        </button>
                    </div>
                    </form>
                )}
                </Formik>
            </div>
        </AppLayout>
    );
};

export default BrandEdit;
