import { Head, usePage } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Toaster, toast } from "sonner";
import { router } from "@inertiajs/react";
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';

export default function PromotionCreate() {
    const { products = [] } = usePage<{ products?: { id: number; name: string; priceWithTax: number }[] }>().props;

    const validationSchema = Yup.object({
    startDate: Yup.date().required('Campo requerido'),
    endDate: Yup.date().required('Campo requerido'),
    description: Yup.string().required('Campo requerido'),
    priceNormal: Yup.number()
        .typeError('Debe ser un número')
        .positive('Debe ser un número positivo')
        .required('Campo requerido')
        .moreThan(0, 'El precio de oferta debe ser mayor a 0')
        .test(
            'match-priceWithTax',
            'El precio normal debe ser igual al precio del producto seleccionado',
            function (value) {
                const { product_id } = this.parent;
                if (!product_id || !value) return true; // si no hay producto o valor, no falla aquí (otro validador lo hará)

                // Buscar producto en el array
                const product = products.find(p => p.id === Number(product_id));

                if (!product) return false; // no encontró producto, falla

                // Asumiendo que el atributo es priceWithTax (corrige si se llama distinto)
                return Number(value) === Number(product.priceWithTax);
            }
        ),
    priceOffers: Yup.number()
        .typeError('Debe ser un número')
        .positive('Debe ser un número positivo')
        .moreThan(0, 'El precio de oferta debe ser mayor a 0')
        .required('Campo requerido'),
    product_id: Yup.number()
        .typeError('Debe seleccionar un producto')
        .required('El producto es requerido'),
});


    const handleSubmit = (values: any) => {
        const data = new FormData();
        data.append("startDate", values.startDate);
        data.append("endDate", values.endDate);
        data.append("description", values.description);
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
            onError: () => {
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
                        priceNormal: "",
                        priceOffers: "",
                        product_id: "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ values, handleChange, handleBlur, touched, errors }) => (
                        <Form className="space-y-4">
                            {/* Fecha de Inicio */}
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

                            {/* Fecha de Fin */}
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

                            {/* Descripción */}
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

                            {/* Precio Normal */}
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

                            {/* Precio de Oferta */}
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
                                    className="mt-1 p-2 w-3/4 max-w-md border rounded-md bg-white text-black dark:bg-gray-800 dark:text-white"
                                >
                                    <option value="" disabled>Seleccione un Producto</option>
                                    {products.length > 0 ? (
                                        products.map((product) => (
                                            <option key={product.id} value={product.id}>
                                                {product.name}
                                            </option>
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
