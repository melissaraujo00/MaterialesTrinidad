import * as Yup from 'yup';

export const productSchema = Yup.object({
    name: Yup.string()
        .min(2, 'El nombre debe tener al menos 2 caracteres')
        .required('El nombre es requerido'),

    priceWithTax: Yup.number()
        .typeError('El precio es requerido')
        .positive('El precio debe ser positivo y mayor a 0')
        .required('El precio es requerido'),

    discountPrice: Yup.number()
        .typeError('El precio con descuento es requerido')
        .min(0, 'El descuento no puede ser negativo') // Corregido a min(0) para permitir 0
        .required('El precio con descuento es requerido'), // Si es 0, es requerido

    description: Yup.string()
        .nullable() // Permite null
        .max(255, 'La descripción no puede exceder los 255 caracteres'),

    category_id: Yup.string().required("Seleccione una categoría"),
    brand_id: Yup.string().nullable(),

    stock: Yup.number()
        .integer()
        .min(0, 'El stock debe ser un número entero')
        .required('El stock es requerido'),

    stockMinimun: Yup.number()
        .integer()
        .min(0, 'El stock mínimo debe ser un número entero')
        .required('El stock mínimo es requerido'),

    image: Yup.mixed()
        .nullable()
        .test("fileSize", "La imagen es muy grande, debe ser menor de 2MB", (value) => {
            if (!value) return true; // Si no hay imagen, pasa
            return value instanceof File && value.size <= 2097152;
        })
        .test("fileFormat", "Formato no soportado (solo JPG, PNG, WEBP)", (value) => {
            if (!value) return true;
            return value instanceof File && ["image/jpeg", "image/png", "image/webp"].includes(value.type);
        })
        .test("filePathLength", "El nombre del archivo excede los 255 caracteres", (value) => {
             if (!value) return true;
             return value instanceof File && value.name.length <= 255;
        }),
});

// Tipo inferido para TypeScript
export type ProductFormData = Yup.InferType<typeof productSchema>;
