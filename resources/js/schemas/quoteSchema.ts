
import * as Yup from 'yup';

export const quoteValidationSchema = Yup.object({
  customer_id: Yup.string()
    .required('Seleccione un cliente'),
  date: Yup.date()
    .required('La fecha es requerida')
    .typeError('Fecha inválida'),
  items: Yup.array()
    .of(
      Yup.object({
        product_id: Yup.string()
          .required('Seleccione un producto'),
        quantity: Yup.number()
          .positive('La cantidad debe ser positiva')
          .required('La cantidad es requerida')
          .typeError('Debe ser un número válido'),
        price: Yup.number()
          .positive('El precio debe ser positivo')
          .required('El precio es requerido')
          .typeError('Debe ser un número válido')
      })
    )
    .min(1, 'Debe agregar al menos un producto')
    .required('Debe agregar productos'),
  discount: Yup.number()
    .min(0, 'El descuento no puede ser negativo')
    .max(100, 'El descuento no puede exceder el 100%')
    .typeError('Debe ser un número válido'),
  status: Yup.string()
    .required('Seleccione un estado'),
  notes: Yup.string()
    .max(500, 'Las notas no pueden exceder 500 caracteres')
});

// Constantes de estados de cotización
export const QUOTE_STATUS_OPTIONS = [
  { id: 'pendiente', name: 'Pendiente' },
  { id: 'enviada', name: 'Enviada' },
  { id: 'aprobada', name: 'Aprobada' },
  { id: 'rechazada', name: 'Rechazada' }
];

// Colores para badges de estado
export const QUOTE_STATUS_COLORS = {
  pendiente: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  enviada: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  aprobada: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  rechazada: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
};
