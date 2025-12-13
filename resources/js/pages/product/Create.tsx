// pages/product/create.tsx
import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import { Toaster } from 'sonner';
import { Formik, Form } from 'formik';
import AppLayout from '@/layouts/app-layout';
import { FormField, SelectField } from '@/components/forms';
import { useFormSubmit } from '@/hooks';
import { productValidationSchema, UNIT_OPTIONS, STATUS_OPTIONS } from '@/schemas/productSchema';
import { Category, Brand, ProductFormData } from '@/types/entities/product';

interface PageProps {
  categories: Category[];
  brands: Brand[]; // Asegúrate de enviar esto desde el ProductController
}

export default function ProductCreate() {
  const { categories, brands } = usePage<PageProps>().props;

  const { handleSubmit } = useFormSubmit({
    route: '/products',
    method: 'post',
    successMessage: 'Producto creado con éxito'
  });

  // Valores iniciales basados en tu interfaz ProductFormData
  const initialValues: ProductFormData = {
    name: '',
    description: '',
    priceWithTax: 0,
    discountPrice: 0,
    stock: '',     // Inicializamos como string para que el input esté vacío
    stockMinimun: '', // Inicializamos como string
    brand_id: '',
    category_id: '',
    unit: '',
    status: 'activo',
    image: ''
  };

  return (
    <AppLayout>
      <Head title="Crear Producto" />
      <Toaster position="top-right" richColors />

      <div className="flex flex-col gap-6 p-6 bg-white text-black shadow-lg rounded-xl dark:bg-black/10 dark:text-white">
        <h2 className="text-2xl font-semibold mb-4">Crear Nuevo Producto</h2>

        <Formik
          initialValues={initialValues}
          validationSchema={productValidationSchema}
          onSubmit={(values) => {
            // Convertimos strings vacíos a números si es necesario antes de enviar
            // Formik maneja esto, pero aseguramos la conversión para la API
            const payload = {
                ...values,
                stock: Number(values.stock),
                stockMinimun: Number(values.stockMinimun),
                priceWithTax: Number(values.priceWithTax),
                discountPrice: Number(values.discountPrice),
                // Si brand_id es vacío, enviamos null
                brand_id: values.brand_id ? Number(values.brand_id) : null,
            };
            handleSubmit(payload);
          }}
        >
          {({ values }) => (
            <Form className="space-y-4">
              {/* Información Básica */}
              <div className="border-b pb-4">
                <h3 className="text-lg font-medium mb-3">Información Básica</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    name="name"
                    label="Nombre del Producto"
                    placeholder="Ej: Cemento Holcim 50kg"
                    required
                  />

                  <div className="grid grid-cols-2 gap-4">
                     <SelectField
                        name="category_id"
                        label="Categoría"
                        options={categories}
                        placeholder="Seleccionar..."
                        required
                      />

                      <SelectField
                        name="brand_id"
                        label="Marca"
                        options={brands}
                        placeholder="Seleccionar..."
                      />
                  </div>
                </div>

                <div className="mt-4">
                  <FormField
                    name="description"
                    label="Descripción"
                    placeholder="Descripción detallada del producto..."
                  />
                </div>
              </div>

              {/* Precios */}
              <div className="border-b pb-4">
                <h3 className="text-lg font-medium mb-3">Precios</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    name="priceWithTax"
                    label="Precio Venta (con Impuestos)"
                    type="number"
                    placeholder="0.00"
                    required
                  />

                  <FormField
                    name="discountPrice"
                    label="Precio con Descuento"
                    type="number"
                    placeholder="0.00 (Dejar en 0 si no aplica)"
                  />
                </div>
              </div>

              {/* Inventario y Detalles */}
              <div className="border-b pb-4">
                <h3 className="text-lg font-medium mb-3">Inventario y Detalles</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Stock Actual */}
                    <FormField
                      name="stock"
                      label="Stock Actual"
                      type="number"
                      placeholder="0"
                      required
                    />

                    {/* Stock Mínimo (Nuevo campo) */}
                    <FormField
                      name="stockMinimun"
                      label="Stock Mínimo (Alerta)"
                      type="number"
                      placeholder="Ej: 5"
                      required
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <SelectField
                      name="unit"
                      label="Unidad de Medida"
                      options={UNIT_OPTIONS}
                      placeholder="Seleccione unidad"
                      required
                    />

                    <SelectField
                      name="status"
                      label="Estado"
                      options={STATUS_OPTIONS}
                      required
                    />
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-start space-x-4 pt-4">
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
