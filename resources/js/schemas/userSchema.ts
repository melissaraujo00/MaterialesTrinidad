import * as Yup from 'yup';

export const userSchema = Yup.object({
    name: Yup.string().min(2, 'El nombre debe tener al menos 2 caracteres').required('Campo requerido'),
    firstName: Yup.string().min(2, 'El primer nombre debe tener al menos 2 caracteres').required('Campo requerido'),
    lastName: Yup.string().min(2, 'El apellido debe tener al menos 2 caracteres').required('Campo requerido'),
    email: Yup.string().email('Formato de correo no válido').required('Campo requerido'),
    birthdate: Yup.date().max(new Date(), 'La fecha de nacimiento no puede ser en el futuro').required('Campo requerido'),
    phoneNumber: Yup.string().matches(/^[0-9]{8}$/, 'El número de teléfono debe tener 8 dígitos y solo tener numeros').required('Campo requerido'),
    password: Yup.string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .matches(/[A-Z]/, 'La contraseña debe tener al menos una letra mayúscula')
    .matches(/[\W_]/, 'La contraseña debe tener al menos un carácter especial')
    .required('Campo requerido'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), undefined], 'Las contraseñas no coinciden').required('Campo requerido'),
    role: Yup.string().required('Campo requerido'),
});

export type UserFormData = Yup.InferType<typeof userSchema>;
