import * as Yup from 'yup';

export const brandSchema = Yup.object({
    name: Yup.string()
        .min(3, 'El nombre debe tener al menos 3 caracteres')
        .required('Campo requerido')
        .matches(/^[^0-9]*$/, 'No se permiten números'),

    description: Yup.string()
        .min(5, 'La descripción debe tener al menos 5 caracteres')
        .nullable(),
});
