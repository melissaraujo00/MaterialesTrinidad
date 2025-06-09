import { Head, usePage } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Toaster, toast } from "sonner";
import { router } from "@inertiajs/react";
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';

export default function PromotionCreate() {
    // Asegura que products siempre sea un array
    const { products = [] } = usePage<{ products?: { id: number; name: string }[] }>().props;
    


    const validationSchema = Yup.object({
        startDate: Yup.date().required('Campo requerido'),
        endDate: Yup.date().required('Campo requerido'),
        description: Yup.string().required('Campo requerido'),
        type: Yup.string().required('Campo requerido'),
        priceNormal: Yup.number().typeError('Debe ser un número').positive('Debe ser un número positivo').required('Campo requerido'),
        priceOffers: Yup.number().typeError('Debe ser un número').positive('Debe ser un número positivo').required('Campo requerido'),
        product_id: Yup.number().required('El producto es requerido'),
    });

    const handleSubmit = (values: any) => {
        const data = new FormData();
        data.append("startDate", values.startDate);
        data.append("endDate", values.endDate);
        data.append("description", values.description);
        data.append("type", values.type);
        data.append("priceNormal", values.priceNormal);
        data.append("priceOffers", values.priceOffers);
        data.append("product_id", values.product_id);

        router.post("/offers", data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            onSuccess: () => {
                setTimeout(() => {
                    toast.success("Oferta creada con éxito.");
                }, 1000);
                router.reload();
            },
            onError: (err) => {
                console.error("Error al crear Oferta:", err);
                toast.error("Ocurrió un error al crear la Oferta.");
            },
        });
    };

    return (
        <AppLayout>
            <Head title="Crear Oferta" />
            <Toaster position="top-right" richColors />

            <div className="flex flex-col gap-6 p-6 bg-white text-black shadow-lg rounded-xl dark:bg-black/10 dark:text-white">
                <h2 className="text-2xl font-semibold mb-4">Crear Nueva Promoción</h2>

                <Formik
                    initialValues={{
                        startDate: "",
                        endDate: "",
                        description: "",
                        type: "",
                        priceNormal: "",
                        priceOffers: "",
                        product_id: "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ values, handleChange, handleBlur, touched, errors }) => (
                        <Form className="space-y-4">
                            {/* Campo: Fecha de Inicio */}
                            <div>
                                <label htmlFor="startDate" className="block text-sm font-medium">Fecha de Inicio</label>
                                <Field
                                    type="date"
                                    id="startDate"
                                    name="startDate"
                                    value={values.startDate}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="mt-1 p-2 w-3/4 max-w-md border rounded-md bg-white text-black dark:bg-gray-800 dark:text-white"
                                />
                                {touched.startDate && errors.startDate && <small className="text-red-500">{errors.startDate}</small>}
                            </div>

                            {/* Campo: Fecha de Fin */}
                            <div>
                                <label htmlFor="endDate" className="block text-sm font-medium">Fecha de Fin</label>
                                <Field
                                    type="date"
                                    id="endDate"
                                    name="endDate"
                                    value={values.endDate}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="mt-1 p-2 w-3/4 max-w-md border rounded-md bg-white text-black dark:bg-gray-800 dark:text-white"
                                />
                                {touched.endDate && errors.endDate && <small className="text-red-500">{errors.endDate}</small>}
                            </div>

                            {/* Campo: Descripción */}
                            <div>
                                <label htmlFor="description" className="block text-sm font-medium">Descripción</label>
                                <Field
                                    type="text"
                                    id="description"
                                    name="description"
                                    placeholder="Ej: Descuento por temporada"
                                    value={values.description}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="mt-1 p-2 w-3/4 max-w-md border rounded-md bg-white text-black dark:bg-gray-800 dark:text-white"
                                />
                                {touched.description && errors.description && <small className="text-red-500">{errors.description}</small>}
                            </div>

                            {/* Campo: Tipo */}
                            <div>
                                <label htmlFor="type" className="block text-sm font-medium">Tipo</label>
                                <Field
                                    type="text"
                                    id="type"
                                    name="type"
                                    placeholder="Ej: Oferta, Promoción Especial..."
                                    value={values.type}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="mt-1 p-2 w-3/4 max-w-md border rounded-md bg-white text-black dark:bg-gray-800 dark:text-white"
                                />
                                {touched.type && errors.type && <small className="text-red-500">{errors.type}</small>}
                            </div>

                            {/* Campo: Precio Normal */}
                            <div>
                                <label htmlFor="priceNormal" className="block text-sm font-medium">Precio Normal</label>
                                <Field
                                    type="number"
                                    id="priceNormal"
                                    name="priceNormal"
                                    value={values.priceNormal}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="mt-1 p-2 w-3/4 max-w-md border rounded-md bg-white text-black dark:bg-gray-800 dark:text-white"
                                />
                                {touched.priceNormal && errors.priceNormal && <small className="text-red-500">{errors.priceNormal}</small>}
                            </div>

                            {/* Campo: Precio Oferta */}
                            <div>
                                <label htmlFor="priceOffers" className="block text-sm font-medium">Precio de Oferta</label>
                                <Field
                                    type="number"
                                    id="priceOffers"
                                    name="priceOffers"
                                    value={values.priceOffers}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="mt-1 p-2 w-3/4 max-w-md border rounded-md bg-white text-black dark:bg-gray-800 dark:text-white"
                                />
                                {touched.priceOffers && errors.priceOffers && <small className="text-red-500">{errors.priceOffers}</small>}
                            </div>

                            {/* Campo: Producto */}
                            <div>
                                <label htmlFor="product_id" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Producto</label>
                                <Field
                                    as="select"
                                    id="product_id"
                                    name="product_id"
                                    value={values.product_id}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="mt-1 p-2 w-3/4 max-w-md border rounded-md bg-white text-black dark:bg-gray-800 dark:text-white"
                                >
                                    <option value="" disabled>Seleccione un Producto</option>
                                    {Array.isArray(products) && products.length > 0 ? (
                                        products.map((product) => (
                                            <option key={product.id} value={product.id}>{product.name}</option>
                                        ))
                                    ) : (
                                        <option value="" disabled>No hay productos disponibles</option>
                                    )}
                                </Field>
                                {touched.product_id && errors.product_id && <small className="text-red-500">{errors.product_id}</small>}
                            </div>

                            {/* Botones */}
                            <div className="flex justify-start space-x-3 pt-4">
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
                                    Crear Promoción
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </AppLayout>
    );
}
