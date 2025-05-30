import React from "react";
import { Head, router, usePage } from "@inertiajs/react";
import { Toaster, toast } from "sonner";
import * as Yup from 'yup';
import { useState } from 'react';
import AppLayout from "@/layouts/app-layout";
import { Formik, Field } from 'formik';

interface Movement {
    id: number;
    date: string;
    hour: string;
    product_quantity: number;
    product_id: number;
    type_id: number;
}

interface Props {
    movement: Movement;
    products: { id: number; name: string }[];
    types: { id: number; type: string }[];
}

const MovementEdit: React.FC<Props> = ({ movement, products = [], types =[] }) => {

    const validationSchema = Yup.object({
        product_quantity: Yup.number().required("La cantidad es requerida").positive("Debe ser positiva"),
        product_id: Yup.number().required("El producto es requerido"),
        type_id: Yup.number().required("El tipo es requerido"),
    });

    const successMessage = "El Movimiento fue editado Correctamente";
    const errorMessage = "Fallo al editar Movimiento";

    const handleSubmit = (values: Movement) => {
        router.put(`/movements/${movement.id}`, {
            product_quantity: values.product_quantity,
            product_id: values.product_id,
            type_id: values.type_id
        }, {
            onSuccess: () => {
                setTimeout(() => {
                    toast.success(successMessage);
                }, 1000);
                router.reload();
            },
            onError: () => {
                toast.error(errorMessage);
            },
        });
    };

    return (
        <AppLayout>
            <Head title="Editar Movimiento" />
            <Toaster position="top-right" richColors />

            <div className="flex flex-col gap-6 p-6 bg-white text-black shadow-lg rounded-xl dark:bg-black/10 dark:text-white">
                <h2 className="text-2xl font-semibold mb-4">Editar Movimiento</h2>
                <Formik
                    initialValues={{
                        id: movement.id,
                        date: movement.date,
                        hour: movement.hour,
                        product_quantity: movement.product_quantity,
                        product_id: movement.product_id,
                        type_id: movement.type_id,
                    }}
                    enableReinitialize
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ values, handleChange, handleBlur, touched, errors, handleSubmit }) => (
                        <form onSubmit={handleSubmit} className="space-y-4">

                            {/* Cantidad */}
                            <div>
                                <label htmlFor="product_quantity" className="block text-sm font-medium">Cantidad</label>
                                <Field
                                    type="number"
                                    id="product_quantity"
                                    name="product_quantity"
                                    value={values.product_quantity}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="mt-1 p-2 w-3/4 max-w-md border rounded-md dark:bg-gray-800 dark:text-white"
                                />
                                {touched.product_quantity && errors.product_quantity && (
                                    <small className="text-red-500">{errors.product_quantity}</small>
                                )}
                            </div>

                            {/* Producto */}
                            <div>
                                <label htmlFor="product_id" className="block text-sm font-medium">Producto</label>
                                <Field
                                    as="select"
                                    id="product_id"
                                    name="product_id"
                                    value={values.product_id}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="mt-1 p-2 w-3/4 max-w-md border rounded-md dark:bg-gray-800 dark:text-white"
                                >
                                    <option value="">Seleccione un producto</option>
                                    {products.map(product => (
                                        <option key={product.id} value={product.id}>{product.name}</option>
                                    ))}
                                </Field>
                                {touched.product_id && errors.product_id && (
                                    <small className="text-red-500">{errors.product_id}</small>
                                )}
                            </div>

                            {/* Tipo de movimiento */}
                            <div>
                                <label htmlFor="type_id" className="block text-sm font-medium">Tipo de Movimiento</label>
                                <Field
                                    as="select"
                                    id="type_id"
                                    name="type_id"
                                    value={values.type_id}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="mt-1 p-2 w-3/4 max-w-md border rounded-md dark:bg-gray-800 dark:text-white"
                                >
                                    <option value="">Seleccione un tipo</option>
                                    {types.map(type => (
                                        <option key={type.id} value={type.id}>{type.type}</option>
                                    ))}
                                </Field>
                                {touched.type_id && errors.type_id && (
                                    <small className="text-red-500">{errors.type_id}</small>
                                )}
                            </div>

                            {/* Botones */}
                            <div className="flex justify-start space-x-5 pt-4">
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

export default MovementEdit;
