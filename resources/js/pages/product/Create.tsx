import { Head, usePage } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Toaster, toast } from "sonner";
import { router } from "@inertiajs/react";
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { useState } from 'react';


export default function ProductCreate() {
    const { categories, brands} = usePage<{
        categories: {id: number; name: string} [],
        brands:{id:number; name:string }[];
    }>().props;

    const [preview, setPreview] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    if (file) {
        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);
    }
    };



  const validationSchema = Yup.object({
    name: Yup.string().min(2, 'El nombre debe tener al menos 2 caracteres').required('El nombre es requerido'),
    price: Yup.number().positive('El precio debe ser positivo').required('El precio es requerido'),
    priceWithTax: Yup.number().positive('Debe ser positivo'),
    discountPrice: Yup.number().positive('Debe ser positivo'),
    stock: Yup.number().integer().min(0, 'Debe ser un número válido'),
    stockMinimun: Yup.number().integer().min(0, 'Debe ser un número válido'),
    category_id: Yup.string().required('Debe seleccionar una categoría'),
    brand_id: Yup.string().required('Debe seleccionar una marca'),
  });

  const handleSubmit = (values: any) => {
    const data = new FormData();
    data.append("name", values.name);
    data.append("description", values.description);
    data.append("price", values.price);
    data.append("priceWithTax", values.priceWithTax);
    data.append("discountPrice",values.discountPrice);
    data.append("category_id",values.category_id);
    data.append("brand_id",values.brand_id);
    data.append("stock", values.stock)
    data.append("stockMinimun", values.stockMinimun)
    data.append("imagen",values.imagen);


    router.post("/products", data, {
        onSuccess: () => {
            setTimeout(() => {
                toast.success("Producto creado con éxito.");
            }, 1000);
        },
        onError: (errors) => {
          console.error("Errores de validación:", errors);
          toast.error("Hubo un error al crear el Producto. Verifica los datos.");
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
            priceWithTax: "",
            discountPrice: "",
            category_id: "",
            brand_id: "",
            stock: "",
            stockMinimun: "",
            imagen: ""
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, handleBlur, touched, errors }) => (
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

              {/* description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Descripion Opcional</label>
                <Field
                  type="text"
                  id="description"
                  name="description"
                  placeholder="Ej: Frente de ferreteria Olivia"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-1 p-2 w-3/4 max-w-md border rounded-md dark:bg-gray-800 dark:text-white"
                />
                {touched.description && errors.description && <small className="text-red-500">{errors.description}</small>}
              </div>
              {/* price */}
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Precio: $</label>
                <Field
                  type="number"
                  step="0.01"
                  id="price"
                  name="price"
                  placeholder="Ej: 12.50"
                  value={values.price}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-1 p-2 w-3/4 max-w-md border rounded-md dark:bg-gray-800 dark:text-white"
                />
                {touched.price && errors.price && <small className="text-red-500">{errors.price}</small>}
              </div>
              {/* priceWithTax */}
              <div>
                <label htmlFor="priceWithTax" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Precio con Iva incluida: </label>
                <Field
                  type="number"
                  step="0.01"
                  id="priceWithTax"
                  name="priceWithTax"
                  placeholder="Ej: 15.50"
                  value={values.priceWithTax}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-1 p-2 w-3/4 max-w-md border rounded-md dark:bg-gray-800 dark:text-white"
                />
                {touched.priceWithTax && errors.priceWithTax && <small className="text-red-500">{errors.priceWithTax}</small>}
              </div>
              {/* discountPrice */}
              <div>
                <label htmlFor="discountPrice" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Precio Con descuento: </label>
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

              <div>
                <label htmlFor="category_id" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Categoria</label>
                <Field
                  as="select"
                  id="category_id"
                  name="category_id"
                  value={values.category_id}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-1 p-2 w-3/4 max-w-md border rounded-md dark:bg-gray-800 dark:text-white"
                >
                  <option value="" disabled>Seleccione una Categoria</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </Field>
                {touched.category_id && errors.category_id && <small className="text-red-500">{errors.category_id}</small>}
              </div>

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

              {/* stock */}
              <div>
                <label htmlFor="stock" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Cantidad de producto disponible: </label>
                <Field
                  type="number"
                  id="stock"
                  name="stock"
                  placeholder="Ej: Col. Franciso Casa #4"
                  value={values.stock}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-1 p-2 w-3/4 max-w-md border rounded-md dark:bg-gray-800 dark:text-white"
                />
                {touched.stock && errors.stock && <small className="text-red-500">{errors.stock}</small>}
              </div>


              {/* stockMinimun */}
              <div>
                <label htmlFor="stockMinimun" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Stock Minimo</label>
                <Field
                  type = "number"
                  id="stockMinimun"
                  name="stockMinimun"
                  value={values.stockMinimun}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-1 p-2 w-3/4 max-w-md border rounded-md dark:bg-gray-800 dark:text-white"
                />
                {touched.stockMinimun && errors.stockMinimun && <small className="text-red-500">{errors.stockMinimun}</small>}
              </div>
              <div className="mb-3">
            <label className="block text-gray-950 text-sm font-medium dark:text-gray-300">Picture (optional)</label>
            <input
                type="file"
                name="picture"
                onChange={handleFileChange}
                className="w-full text-gray-950 dark:text-white"
                accept="image/*"
                />
            </div>
            {preview && (
                <div className="mb-3">
                <p className="text-sm mb-1 dark:text-gray-300">Image Preview:</p>
                <img src={preview} alt="Preview" className="w-32 h-32 object-cover rounded" />
                </div>
            )}

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
