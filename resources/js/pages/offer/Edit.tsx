import { Head, usePage, router } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Toaster, toast } from "sonner";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

export default function OfferEdit() {
    const { products = [] } = usePage<{ products?: { id: number; name: string; priceWithTax: number }[] }>().props;
    const { offer } = usePage<{
        offer: {
            id: number;
            startDate: string;
            endDate: string;
            description: string;
            priceNormal: number;
            priceOffers: number;
            product_id: number;
        };
    }>().props;

    const offerSchema = Yup.object().shape({
        startDate: Yup.date()
            .typeError("Fecha de inicio no válida")
            .required("Requerido"),
        endDate: Yup.date()
            .typeError("Fecha de fin no válida")
            .required("Requerido")
            .min(Yup.ref("startDate"), "La fecha de fin debe ser posterior a la de inicio"),
        description: Yup.string()
            .max(255, "Máximo 255 caracteres")
            .required("Requerido"),
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
            .typeError("Por favor ingresa un valor numérico válido")
            .positive("Debe ser positivo")
            .max(Yup.ref("priceNormal"), "Debe ser menor o igual al precio normal")
            .required("Requerido"),
        product_id: Yup.number()
            .typeError('Debe seleccionar un producto')
            .required('El producto es requerido'),
    });

    const handleSubmit = (values: any) => {
        const data = new FormData();
        data.append("startDate", values.startDate);
        data.append("endDate", values.endDate);
        data.append("description", values.description);
        data.append("priceNormal", values.priceNormal.toString());
        data.append("priceOffers", values.priceOffers.toString());
        data.append("product_id", values.product_id.toString());
        data.append("_method", "PUT");

        router.post(`/offers/${offer.id}`, data, {
            onSuccess: () => {
                setTimeout(() => {
                    toast.success("Oferta actualizada con éxito.");
                }, 1000);
            },
            onError: (errors) => {
                console.log(errors);
                toast.error(Object.values(errors)[0]);
            },
        });
    };

    return (
        <AppLayout>
            <Head title="Editar Oferta" />
            <Toaster position="top-right" richColors />

            <div className="flex flex-col gap-6 p-6 bg-white text-black shadow-lg rounded-xl dark:bg-black/10 dark:text-white">
                <h2 className="text-2xl font-semibold mb-4">Editar Oferta</h2>

                <Formik
                    initialValues={{
                        startDate: offer.startDate,
                        endDate: offer.endDate,
                        description: offer.description,
                        priceNormal: offer.priceNormal,
                        priceOffers: offer.priceOffers,
                        product_id: offer.product_id,
                    }}
                    validationSchema={offerSchema}
                    onSubmit={handleSubmit}
                >
                    {({ values, handleChange, handleBlur, touched, errors, setFieldValue }) => (
                        <Form className="space-y-4">
                            {/* Fecha inicio */}
                            <div>
                                <label htmlFor="startDate" className="block text-sm font-medium">Fecha de inicio</label>
                                <Field
                                    type="date"
                                    name="startDate"
                                    value={values.startDate}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="mt-1 p-2 w-full max-w-md border rounded-md dark:bg-gray-800 dark:text-white"
                                />
                                {touched.startDate && errors.startDate && <small className="text-red-500">{errors.startDate}</small>}
                            </div>

                            {/* Fecha fin */}
                            <div>
                                <label htmlFor="endDate" className="block text-sm font-medium">Fecha de fin</label>
                                <Field
                                    type="date"
                                    name="endDate"
                                    value={values.endDate}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="mt-1 p-2 w-full max-w-md border rounded-md dark:bg-gray-800 dark:text-white"
                                />
                                {touched.endDate && errors.endDate && <small className="text-red-500">{errors.endDate}</small>}
                            </div>

                            {/* Descripción */}
                            <div>
                                <label htmlFor="description" className="block text-sm font-medium">Descripción</label>
                                <Field
                                    as="textarea"
                                    name="description"
                                    value={values.description}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="mt-1 p-2 w-full max-w-md border rounded-md dark:bg-gray-800 dark:text-white"
                                />
                                {touched.description && errors.description && <small className="text-red-500">{errors.description}</small>}
                            </div>

                            {/* Precio normal */}
                            <div>
                                <label htmlFor="priceNormal" className="block text-sm font-medium">Precio normal</label>
                                <Field
                                    type="number"
                                    name="priceNormal"
                                    value={values.priceNormal}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="mt-1 p-2 w-full max-w-md border rounded-md dark:bg-gray-800 dark:text-white"
                                />
                                {touched.priceNormal && errors.priceNormal && <small className="text-red-500">{errors.priceNormal}</small>}
                            </div>

                            {/* Precio oferta */}
                            <div>
                                <label htmlFor="priceOffers" className="block text-sm font-medium">Precio en oferta</label>
                                <Field
                                    type="number"
                                    name="priceOffers"
                                    value={values.priceOffers}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="mt-1 p-2 w-full max-w-md border rounded-md dark:bg-gray-800 dark:text-white"
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
                                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                        const productId = e.target.value;
                                        handleChange(e);


                                        const selectedProduct = products.find(p => p.id === Number(productId));
                                        if (selectedProduct) {
                                            setFieldValue('priceNormal', selectedProduct.priceWithTax);
                                        } else {
                                            setFieldValue('priceNormal', '');
                                        }
                                    }}
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
                            <div>
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                                >
                                    Guardar cambios
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </AppLayout>
    );
}
