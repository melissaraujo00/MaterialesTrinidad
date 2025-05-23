import { Head, usePage, router } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Toaster, toast } from "sonner";
import { Formik, Form, Field } from "formik";
import { useState, useEffect } from "react";
import * as Yup from "yup";

export default function ProductEdit() {
  const { product, brands, categories } = usePage<{
    product: {
      id: number;
      name: string;
      description: string;
      price: number;
      discountPrice: number;
      priceWithTax: number
      category_id: number;
      brand_id: number;
      stock: number;
      stockMinimun: number;
      image: string;
    };
    brands: { id: number; name: string }[];
    categories: { id: number; name: string }[];
  }>().props;

  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (product.image) {
      // Asegúrate de que la URL sea absoluta (agregando el dominio si es necesario)
      if (product.image.startsWith('/storage')) {
        // Aquí obtenemos la URL base del sitio
        const baseUrl = window.location.origin;
        setPreview(baseUrl + product.image);
        console.log("URL completa:", baseUrl + product.image);
      } else {
        setPreview(product.image);
      }
    }
  }, [product]);



  const validationSchema = Yup.object({
    name: Yup.string().min(2, "Debe tener al menos 2 caracteres").required("Requerido"),
    price: Yup.number()
      .typeError("Por favor ingresa un valor numérico válido")  // Este es el mensaje personalizado
      .positive("Debe ser positivo")
      .required("Requerido"),
    discountPrice: Yup.number().positive("Debe ser positivo").required("Requerido"),
    description: Yup.string().max(255, "Máximo 255 caracteres").nullable(),
    category_id: Yup.string(),
    brand_id: Yup.string(),
    stock: Yup.number().integer().min(0, "Debe ser número entero").required("Requerido"),
    stockMinimun: Yup.number().integer().min(0, "Debe ser número entero").required("Requerido"),
    image: Yup.mixed()
      .nullable()
      .test("fileSize", "La imagen es muy grande", (value) => {
        return !value || (value instanceof File && value.size <= 2 * 1024 * 1024); // Verifica que
      })
      .test("fileFormat", "Formato no soportado", (value) => {
        return !value || (value instanceof File && ["image/jpeg", "image/png", "image/webp"].includes(value.type));
      }),
  });

  const handleSubmit = (values: any) => {
    const data = new FormData();
    data.append("name", values.name);
    data.append("description", values.description || "");
    data.append("price", values.price.toString());
    data.append("priceWithTax", values.priceWithTax.toString());
    data.append("discountPrice", values.discountPrice.toString());
    data.append("category_id", values.category_id.toString());
    data.append("brand_id", values.brand_id.toString());
    data.append("stock", values.stock.toString());
    data.append("stockMinimun", values.stockMinimun.toString());

    if (values.image && values.image instanceof File) {
      data.append("image", values.image);
    }

    data.append("_method", "PUT");

    router.post(`/products/${product.id}`, data, {
      onSuccess: () => {
        setTimeout(() => {
          toast.success("Producto actualizado con éxito.");
        }, 1000);
      },
      onError: (errors) => {
        console.log(errors)
        toast.error(Object.values(errors)[0])
      },
    });
  };

  return (
    <AppLayout>
      <Head title="Editar Producto" />
      <Toaster position="top-right" richColors />

      <div className="flex flex-col gap-6 p-6 bg-white text-black shadow-lg rounded-xl dark:bg-black/10 dark:text-white">
        <h2 className="text-2xl font-semibold mb-4">Editar Producto</h2>

        <Formik
          initialValues={{
            name: product.name,
            description: product.description,
            price: product.price,
            discountPrice: product.discountPrice,
            priceWithTax: product.priceWithTax,
            category_id: product.category_id,
            brand_id: product.brand_id,
            stock: product.stock,
            stockMinimun: product.stockMinimun,
            image: null,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, handleBlur, touched, errors, setFieldValue,setFieldTouched }) => (
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
                    const price = parseFloat(event.target.value);
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
                  placeholder="Ej: 100"
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
                  placeholder="Ej: 10"
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
              <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Imagen</label>
                <input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={e => {
                    const file = e.currentTarget.files?.[0] ?? null;
                    setFieldValue("image", file);
                    // marcar como tocado para que Formik muestre el error
                    setFieldTouched("image", true, false);
                    if (file) setPreview(URL.createObjectURL(file));
                  }}
                  onBlur={() => {
                    setFieldTouched("image", true, false);
                  }}
                />
                {touched.image && errors.image && (
                  <div className="text-red-500 mt-1">{errors.image}</div>
                )}


                {/* Image Preview */}
                {preview && (
                  <div className="mb-3">
                    <p className="text-sm mb-1 dark:text-gray-300">Vista previa de la imagen:</p>
                    <img
                      src={preview}
                      alt="Vista previa"
                      className="w-32 h-32 object-cover rounded-md border border-gray-300"
                      onError={(e) => {
                        console.error("Error al cargar la imagen:", e);
                        // Muestra un mensaje de error
                        (e.target as HTMLImageElement).src = "https://via.placeholder.com/150?text=Error+al+cargar";
                        // También muestra la URL que causó el error
                        console.log("URL que causó el error:", preview);
                      }}
                    />
                  </div>
                )}
              </div>

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
                  editar producto
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </AppLayout>
  );
}
