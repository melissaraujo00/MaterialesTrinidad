// pages/quote/edit.tsx
import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import { Toaster } from 'sonner';
import { Formik, Form, FieldArray } from 'formik';
import AppLayout from '@/layouts/app-layout';
import { FormField, SelectField } from '@/components/forms';
import { useFormSubmit } from '@/hooks';
import { useQuoteItems } from '@/hooks/forms/useQuoteItems';
import { quoteValidationSchema, QUOTE_STATUS_OPTIONS } from '@/schemas/quoteSchema';
import { Quote } from '@/types/entities/quote';
import { Customer } from '@/types/entities/customer';
import { Product } from '@/types/entities/product';

interface PageProps {
  quote: Quote;
  customers: Customer[];
  products: Product[];
}

export default function QuoteEdit() {
  const { quote, customers, products } = usePage<PageProps>().props;

  // Inicializar items desde la cotización existente
  const initialItems = quote.items.map(item => ({
    product_id: item.product_id.toString(),
    quantity: item.quantity,
    price: item.price
  }));

  const quoteItems = useQuoteItems({
    products,
    initialItems
  });

  const { handleSubmit } = useFormSubmit({
    route: `/quotes/${quote.id}`,
    method: 'put',
    successMessage: 'Cotización actualizada con éxito'
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-SV', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  return (
    <AppLayout>
      <Head title="Editar Cotización" />
      <Toaster position="top-right" richColors />

      <div className="flex flex-col gap-6 p-6 bg-white text-black shadow-lg rounded-xl dark:bg-black/10 dark:text-white">
        <h2 className="text-2xl font-semibold mb-4">Editar Cotización #{quote.id}</h2>

        <Formik
          initialValues={{
            customer_id: quote.customer_id.toString(),
            date: quote.date,
            items: quoteItems.items,
            discount: quote.discount || 0,
            notes: quote.notes || '',
            status: quote.status
          }}
          validationSchema={quoteValidationSchema}
          onSubmit={(values) => {
            const dataToSubmit = {
              ...values,
              items: quoteItems.items,
              subtotal: quoteItems.subtotal,
              tax: quoteItems.taxAmount,
              discount: quoteItems.discountAmount,
              total: quoteItems.total
            };
            handleSubmit(dataToSubmit);
          }}
          enableReinitialize
        >
          {({ values, setFieldValue, errors, touched }) => (
            <Form className="space-y-6">
              {/* Información General */}
              <div className="border-b pb-4">
                <h3 className="text-lg font-medium mb-3">Información General</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <SelectField
                    name="customer_id"
                    label="Cliente"
                    options={customers}
                    placeholder="Seleccione un cliente"
                    required
                  />

                  <FormField
                    name="date"
                    label="Fecha"
                    type="date"
                    required
                  />

                  <SelectField
                    name="status"
                    label="Estado"
                    options={QUOTE_STATUS_OPTIONS}
                    required
                  />
                </div>
              </div>

              {/* Items de Cotización */}
              <div className="border-b pb-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-medium">Productos</h3>
                  <button
                    type="button"
                    onClick={() => {
                      quoteItems.addItem();
                      setFieldValue('items', [...quoteItems.items, { product_id: '', quantity: 1, price: 0 }]);
                    }}
                    className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition"
                  >
                    + Agregar Producto
                  </button>
                </div>

                <FieldArray name="items">
                  {() => (
                    <div className="space-y-3">
                      {quoteItems.items.map((item, index) => (
                        <div key={index} className="grid grid-cols-12 gap-2 items-start bg-gray-50 dark:bg-gray-900 p-3 rounded">
                          <div className="col-span-5">
                            <select
                              value={item.product_id}
                              onChange={(e) => {
                                const value = e.target.value;
                                quoteItems.updateItem(index, 'product_id', value);
                                setFieldValue(`items.${index}.product_id`, value);
                                const price = quoteItems.getProductPrice(value);
                                setFieldValue(`items.${index}.price`, price);
                              }}
                              className="w-full px-2 py-1 border rounded text-sm dark:bg-gray-800 dark:border-gray-700"
                            >
                              <option value="">Seleccionar producto</option>
                              {products.map((product) => (
                                <option key={product.id} value={product.id}>
                                  {product.name} - {formatPrice(product.price)}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="col-span-2">
                            <input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => {
                                const value = e.target.value;
                                quoteItems.updateItem(index, 'quantity', value);
                                setFieldValue(`items.${index}.quantity`, value);
                              }}
                              placeholder="Cant."
                              min="1"
                              className="w-full px-2 py-1 border rounded text-sm dark:bg-gray-800 dark:border-gray-700"
                            />
                          </div>

                          <div className="col-span-2">
                            <input
                              type="number"
                              value={item.price}
                              onChange={(e) => {
                                const value = e.target.value;
                                quoteItems.updateItem(index, 'price', value);
                                setFieldValue(`items.${index}.price`, value);
                              }}
                              placeholder="Precio"
                              step="0.01"
                              min="0"
                              className="w-full px-2 py-1 border rounded text-sm dark:bg-gray-800 dark:border-gray-700"
                            />
                          </div>

                          <div className="col-span-2 flex items-center">
                            <span className="text-sm font-medium">
                              {formatPrice(quoteItems.calculateItemSubtotal(item))}
                            </span>
                          </div>

                          <div className="col-span-1 flex items-center">
                            <button
                              type="button"
                              onClick={() => {
                                quoteItems.removeItem(index);
                                const newItems = quoteItems.items.filter((_, i) => i !== index);
                                setFieldValue('items', newItems);
                              }}
                              className="text-red-600 hover:text-red-800 text-sm"
                              disabled={quoteItems.items.length === 1}
                            >
                              🗑️
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </FieldArray>

                {typeof errors.items === 'string' && touched.items && (
                  <p className="text-red-500 text-sm mt-2">{errors.items}</p>
                )}
              </div>

              {/* Resumen de Totales */}
              <div className="border-b pb-4">
                <h3 className="text-lg font-medium mb-3">Resumen</h3>

                <div className="max-w-md ml-auto space-y-2">
                  <div className="flex items-center gap-4">
                    <label className="text-sm font-medium w-32">Descuento (%):</label>
                    <input
                      type="number"
                      value={quoteItems.discount}
                      onChange={(e) => {
                        const value = Number(e.target.value) || 0;
                        quoteItems.setDiscount(value);
                        setFieldValue('discount', value);
                      }}
                      min="0"
                      max="100"
                      step="0.01"
                      className="px-3 py-1 border rounded w-24 dark:bg-gray-800 dark:border-gray-700"
                    />
                  </div>

                  <div className="border-t pt-2 space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal:</span>
                      <span className="font-medium">{formatPrice(quoteItems.subtotal)}</span>
                    </div>

                    {quoteItems.discount > 0 && (
                      <div className="flex justify-between text-sm text-green-600">
                        <span>Descuento ({quoteItems.discount}%):</span>
                        <span>-{formatPrice(quoteItems.discountAmount)}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-sm">
                      <span>IVA (13%):</span>
                      <span className="font-medium">{formatPrice(quoteItems.taxAmount)}</span>
                    </div>

                    <div className="flex justify-between text-lg font-bold border-t pt-2">
                      <span>Total:</span>
                      <span>{formatPrice(quoteItems.total)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notas */}
              <div>
                <FormField
                  name="notes"
                  label="Notas / Observaciones"
                  placeholder="Información adicional sobre la cotización..."
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
                  Actualizar Cotización
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </AppLayout>
  );
}
