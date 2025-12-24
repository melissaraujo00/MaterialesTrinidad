import * as Yup from 'yup';

export const productValidationSchema = Yup.object({
    name: Yup.string().min(2, 'El nombre debe tener al menos 2 caracteres').required('El nombre es requerido'),
    priceWithTax: Yup.number().typeError('Debe ser un número').positive('Debe ser mayor a 0').required('Requerido'),
    discountPrice: Yup.number().typeError('Debe ser un número').min(0, 'No puede ser negativo').required('Requerido'),
    description: Yup.string().max(255, 'Máximo 255 caracteres').nullable(),
    category_id: Yup.string().required('La categoría es requerida'),
    brand_id: Yup.string().nullable(),
    stock: Yup.number().integer().min(0).required('Requerido'),
    stockMinimun: Yup.number().integer().min(0).required('Requerido'),
    image: Yup.mixed()
        .nullable()
        .test("fileSize", "La imagen debe ser menor de 2MB", (value) => {
            return !value || (value instanceof File && value.size <= 2097152);
        })
        .test("fileFormat", "Formato no soportado", (value) => {
            return !value || (value instanceof File && ["image/jpeg", "image/png", "image/webp"].includes(value.type));
        })
});

