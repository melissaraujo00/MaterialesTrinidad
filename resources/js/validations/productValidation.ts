import * as Yup from 'yup';

export const validationSchema = Yup.object({
    name: Yup.string().min(2, 'El nombre debe tener al menos 2 caracteres').required('El nombre es requerido'),
    priceWithTax: Yup.number().typeError('El precio es requerido').positive('El precio debe ser positivo y mayor a 0').required('El precio es requerido'),
    discountPrice: Yup.number().typeError('El precio con descuento es requerido').positive('El precio con descuento debe ser positivo y mayor a 0').required('El precio con descuento es requerido'),
    description: Yup.string().max(255, 'La descripción no puede exceder los 255 caracteres'),
    category_id: Yup.string(),
    brand_id: Yup.string(),
    stock: Yup.number().integer().min(0, 'El stock debe ser un número entero').required('El stock es requerido'),
    stockMinimun: Yup.number().integer().min(0, 'El stock mínimo debe ser un número entero').required('El stock mínimo es requerido'),
    image: Yup.mixed()
        .nullable()
        .test("fileSize", "La imagen es muy grande debe de ser menor de 2MB", (value) => {
            return !value || (value instanceof File && value.size <= 2097152);
        })
        .test("fileFormat", "Formato no soportado", (value) => {
            return !value || (value instanceof File && ["image/jpeg", "image/png", "image/webp"].includes(value.type));
        })
        .test("filePathLength", "La ruta del archivo excede los 255 caracteres", (value) => {
            return !value || (value instanceof File && value.name.length <= 255);
        }),
});
