import React, { useEffect } from "react";
import { Head, useForm } from "@inertiajs/react";  // Importa `useForm`
import { Toaster, toast } from "sonner";
import { router } from "@inertiajs/react";
import * as Yup from 'yup';
import { useState } from 'react';
import AppLayout from "@/layouts/app-layout";
import { Formik, Form, Field } from 'formik';

interface Type {
    id: number;
    type: string;
    description: string;
}

interface Props {
    type: Type;
}

const TypeEdit: React.FC<Props> = ({ type }) => {
    const [typeExists] = useState(false);

    const validationSchema = Yup.object({
        type: Yup.string().min(3, 'El nombre debe tener al menos 2 caracteres').required('Campo requerido'),
        description: Yup.string().min(3, 'La descripcion debe tener al menos 2 caracteres').required('Campo requerido')
    });

    const successMessage = "El tipo fue editado Correctamente";
    const errorMessage = "Fallo al editar Tipo";

    const handleSubmit = (values: { type: string; description: string }) => {
        if (typeExists) {
        toast.error("Este nombre de tipo ya existe.");
        return;
        }
        router.put(route('types.update', type.id), values, {
        onSuccess: () => {
            setTimeout(() => {
                toast.success(successMessage);
            }, 1000);
            router.reload();
        },
        onError: (err) => {
            if (err.type) {
                toast.error(err.type);
            }
            else{
                toast.error(errorMessage);
            }
        },
        });
    };

    return (
        <AppLayout>
            <Head title="Editar Tipo" />
            <Toaster position="top-right" richColors />

            <div className="flex flex-col gap-6 p-6 bg-white text-black shadow-lg rounded-xl dark:bg-black/10 dark:text-white">
                <h2 className="text-2xl font-semibold mb-4">Editar Tipo</h2>
                <Formik
                initialValues={{
                    id: type.id.toString(),
                    type: type.type,
                    description: type.description,
                }}
                enableReinitialize={true}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                >
                {({ values, handleChange, handleBlur, touched, errors,  handleSubmit}) => (

                    <form onSubmit={handleSubmit} className="space-y-2">
                    {/* Name */}
                    <div>
                        <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Name
                        </label>
                        <Field
                        type="text"
                        id="type"
                        name="type"
                        value={values.type}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="mt-1 p-2 w-3/4 max-w-md border rounded-md dark:bg-gray-800 dark:text-white"
                        required
                        />
                        {touched.type && errors.type && <small className="text-red-500">{errors.type}</small>}
                    </div>

                    {/* First Name */}
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Description
                        </label>
                        <Field
                        type="text"
                        id="description"
                        name="description"
                        value={values.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="mt-1 p-2 w-3/4 max-w-md border rounded-md dark:bg-gray-800 dark:text-white"
                        required
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

export default TypeEdit;