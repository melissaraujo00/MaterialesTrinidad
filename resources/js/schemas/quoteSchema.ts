import * as Yup from 'yup';

export const quoteValidationSchema = Yup.object({
  customer_id: Yup.number()
    .required('Debe seleccionar un cliente')
    .positive('Cliente inválido'),
  details: Yup.array()
    .min(1, 'Debe agregar al menos un producto')
    .required('Debe agregar productos'),
  subtotal: Yup.number()
    .min(0, 'El subtotal no puede ser negativo')
    .required(),
  total: Yup.number()
    .min(0, 'El total no puede ser negativo')
    .required()
});

// Constantes de estados de cotización
export const QUOTE_STATUS_OPTIONS = [
  { id: 'pendiente', name: 'Pendiente' },
  { id: 'confirmada', name: 'Confirmada' },
  { id: 'cancelada', name: 'Cancelada' },
  { id: 'venta', name: 'Venta' }
];

// Colores para badges de estado
export const QUOTE_STATUS_COLORS = {
  pendiente: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  confirmada: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  cancelada: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  venta: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
};
