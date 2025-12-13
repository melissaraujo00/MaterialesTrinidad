// pages/product/edit.tsx
import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import { Toaster } from 'sonner';
import { Formik, Form } from 'formik';
import AppLayout from '@/layouts/app-layout';
import { FormField, SelectField } from '@/components/forms';
import { useFormSubmit } from '@/hooks';
import { productValidationSchema, UNIT_OPTIONS, STATUS_OPTIONS } from '@/schemas/productSchema';
import { Product, Category } from '@/types/entities/product';

interface PageProps {
  product: Product;
  categories: Category[];
}

export default function ProductEdit() {
  const { product, categories } = usePage<PageProps>().props;

  const { handleSubmit } = useFormSubmit({
    route: `/products/${product.id}`,
    method: 'put',
    successMessage: 'Producto actualizado con éxito'
  });

  return (
    <AppLayout>
      <Head title="Editar Producto" />
      <Toaster position="top-right" richColors />

      <div className="flex flex-col gap-6 p-6 bg-white text-black shadow-lg rounded-xl dark:bg-black/10 dark:text-white">
        <h2 className="text-2xl font-semibold mb-4">Editar Producto</h2>

        <Formik
          initialValues={{
            name: product.name || '',
            description: product.description || '',
            price: product.price || '',
            stock: product.stock || '',
            category_id: product.category_id?.toString() || '',
            unit: product.unit || '',
            status: product.status || 'activo'
          }}
          validationSchema={productValidationSchema}
          onSubmit={handleSubmit}
        >
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

                <SelectField
                  name="category_id"
                  label="Categoría"
                  options={categories}
                  placeholder="Seleccione una categoría"
                  required
                />
              </div>

              <div className="mt-4">
                <FormField
                  name="description"
                  label="Descripción"
                  placeholder="Descripción detallada del producto..."
                />
              </div>
            </div>

            {/* Precios e Inventario */}
            <div className="border-b pb-4">
              <h3 className="text-lg font-medium mb-3">Precios e Inventario</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  name="price"
                  label="Precio"
                  type="number"
                  placeholder="0.00"
                  required
                />

                <FormField
                  name="stock"
                  label="Stock Actual"
                  type="number"
                  placeholder="0"
                  required
                />

                <SelectField
                  name="unit"
                  label="Unidad de Medida"
                  options={UNIT_OPTIONS}
                  placeholder="Seleccione unidad"
                  required
                />
              </div>
            </div>

            {/* Estado */}
            <div>
              <SelectField
                name="status"
                label="Estado"
                options={STATUS_OPTIONS}
                required
              />
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
                Actualizar Producto
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </AppLayout>
  );
}
