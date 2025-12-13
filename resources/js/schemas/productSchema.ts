// resources/js/schemas/productSchema.ts
import * as Yup from 'yup';

// Validación del formulario de producto
export const productValidationSchema = Yup.object({
  name: Yup.string()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .required('El nombre es requerido'),

  description: Yup.string()
    .max(500, 'La descripción no puede exceder 500 caracteres')
    .nullable(),

  // CAMBIO: price -> priceWithTax
  priceWithTax: Yup.number()
    .typeError('Debe ser un número válido')
    .positive('El precio debe ser mayor a 0')
    .required('El precio es requerido'),

  // NUEVO: discountPrice (Requerido en BD, puede ser 0)
  discountPrice: Yup.number()
    .typeError('Debe ser un número válido')
    .min(0, 'El descuento no puede ser negativo')
    .required('El precio de descuento es requerido (pon 0 si no aplica)'),

  stock: Yup.number()
    .typeError('Debe ser un número válido')
    .integer('El stock debe ser un número entero')
    .min(0, 'El stock no puede ser negativo')
    .required('El stock es requerido'),

  // NUEVO: stockMinimun
  stockMinimun: Yup.number()
    .typeError('Debe ser un número válido')
    .integer('El stock mínimo debe ser entero')
    .min(0, 'El stock mínimo no puede ser negativo')
    .required('El stock mínimo es requerido'),

  category_id: Yup.string()
    .required('Seleccione una categoría'),

  // NUEVO: brand_id (Opcional/Nullable)
  brand_id: Yup.mixed()
    .nullable()
    .label('Marca'),

  unit: Yup.string()
    .required('Seleccione una unidad de medida'),

  status: Yup.string()
    .required('Seleccione un estado')
});

// Constantes de unidades de medida
export const UNIT_OPTIONS = [
  { id: 'unidad', name: 'Unidad' },
  { id: 'm2', name: 'Metro Cuadrado (m²)' },
  { id: 'm', name: 'Metro (m)' },
  { id: 'kg', name: 'Kilogramo (kg)' },
  { id: 'lb', name: 'Libra (lb)' },
  { id: 'litro', name: 'Litro (L)' },
  { id: 'galon', name: 'Galón (gal)' },
  { id: 'saco', name: 'Saco' },
  { id: 'caja', name: 'Caja' }
];

// Constantes de estados
export const STATUS_OPTIONS = [
  { id: 'activo', name: 'Activo' },
  { id: 'inactivo', name: 'Inactivo' }
];
