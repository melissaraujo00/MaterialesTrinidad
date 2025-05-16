import { Head, usePage } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Toaster, toast } from "sonner";
import { router } from "@inertiajs/react";
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { useState } from 'react';

export default function CreateMovement() {
    const { types, products } = usePage<{
    types: { id: number; type: string }[];
    products: { id: number; name: string }[];
    }>().props;

    console.log("Types:", types);



    const [preview, setPreview] = useState<string | null>(null);

    const validationSchema = Yup.object().shape({

        type_id: Yup.number().required('El tipo es requerido'),
        product_id: Yup.number().required('El producto es requerido'),
        product_quantity: Yup.number().required('La cantidad es requerida').positive('La cantidad debe ser positiva'),
        date: Yup.date().required('La fecha es requerida'),
    })
    const today = new Date().toISOString().split('T')[0];

// Obtén la hora actual en formato HH:mm
const currentTime = new Date().toTimeString().split(' ')[0].slice(0, 5);

    const handleSubmit = (values: any) => {
        const data = new FormData();
        data.append("date", values.date);
        data.append("hour" , values.hour);
        data.append("type_id", values.type_id);
        data.append("product_id", values.product_id);
        data.append("product_quantity", values.product_quantity);

        router.post("/movements", data, {
            onSuccess: () => {
                setTimeout(() => {
                    toast.success("Movimiento creado con éxito.");
                        }, 1000);
                    },
            onError: (errors) => {
                console.error("Errores de validación:", errors);
                toast.error("Hubo un error al crear el movimiento. Verifica los datos.");
            },
        });
    };

    return (
        <AppLayout>
            <Head title="Crear Movimiento" />
            <Toaster position = "top-right" richColors />
            <div className="flex flex-col gap-6 p-6 bg-white text-black shadow-lg rounded-xl dark:bg-black/10 dark:text-white">
                <h2 className="text-2xl font-semibold mb-4">Crear un Nuevo Movimiento</h2>
                <Formik
                    initialValues={{
                        date: today,
                        hour: currentTime,
                        type_id: "",
                        product_id: "",
                        product_quantity: 1,
                    }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                >
                {({ values, handleChange, handleBlur, touched, errors }) => (
                <Form className="space-y-2">
                    {/* Fecha */}
                    <div>
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Fecha</label>
                        <Field
                        type="date"
                        name="date"
                        className="mt-1 p-2 w-3/4 max-w-md border rounded-md dark:bg-gray-800 dark:text-white"
                        readOnly
                        />
                        {touched.date && errors.date && (
                        <div className="text-red-500 text-sm">{errors.date}</div>
                        )}
                    </div>

                    {/* Hora */}
                    <div>
                        <label  htmlFor="hour" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Hora</label>
                        <Field
                        type="time"
                        name="hour"
                        className="mt-1 p-2 w-3/4 max-w-md border rounded-md dark:bg-gray-800 dark:text-white"
                        readOnly
                        />
                        {touched.hour && errors.hour && (
                        <div className="text-red-500 text-sm">{errors.hour}</div>
                        )}
                    </div>
                    {/* Type */}
                    <div>
                        <label htmlFor="type_id" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tipo de Movimiento</label>
                        <Field
                            as="select"
                            id="type_id"
                            name="type_id"
                            value={values.type_id}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="mt-1 p-2 w-3/4 max-w-md border rounded-md dark:bg-gray-800 dark:text-white"
                                >
                        <option value="" disabled>Seleccione un Tipo de movimiento</option>
                                    {types.map((type) => (
                        <option key={type.id} value={type.id}>{type.type}</option>
                            ))}
                        </Field>
                        {touched.type_id && errors.type_id && <small className="text-red-500">{errors.type_id}</small>}
                    </div>
                    {/* Product */}
                    <div>
                        <label htmlFor="product_id" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Producto</label>
                        <Field
                            as="select"
                            id="product_id"
                            name="product_id"
                            value={values.product_id}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="mt-1 p-2 w-3/4 max-w-md border rounded-md dark:bg-gray-800 dark:text-white"
                                                    >
                        <option value="" disabled>Seleccione un Producto</option>
                        {products.map((product) => (
                        <option key={product.id} value={product.id}>{product.name}</option>
                                                        ))}
                        </Field>
                        {touched.product_id && errors.product_id && <small className="text-red-500">{errors.product_id}</small>}
                    </div>

                    {/* Cantidad */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Cantidad</label>
                        <Field
                        type="number"
                        name="product_quantity"
                        min={1}
                        className="mt-1 p-2 w-3/4 max-w-md border rounded-md dark:bg-gray-800 dark:text-white"
                        />
                        {touched.product_quantity && errors.product_quantity && (
                        <div className="text-red-500 text-sm">{errors.product_quantity}</div>
                        )}
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-start gap-x-4 mt-4">
                        <button
                            type="button"
                            onClick={() => window.history.back()}
                            className="bg-gray-400 text-white rounded px-4 py-2 hover:bg-gray-500 transition "
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition"
                        >
                            Crear Movimiento
                        </button>
                    </div>
                </Form>
                )}
                </Formik>

            </div>
        </AppLayout>
    );
}
