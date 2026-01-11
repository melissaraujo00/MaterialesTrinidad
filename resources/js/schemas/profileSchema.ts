import * as Yup from 'yup';
export const profileSchema = Yup.object({
    name: Yup.string().min(3, "Mínimo 3 caracteres").required("Campo requerido"),
    firstName: Yup.string().min(3, "Mínimo 3 caracteres").required("Campo requerido"),
    lastName: Yup.string().min(3, "Mínimo 3 caracteres").required("Campo requerido"),
    email: Yup.string().email("Email no válido").required("Campo requerido"),
    phoneNumber: Yup.string().matches(/^[0-9]{8}$/, "Debe tener 8 dígitos").required("Campo requerido"),
    birthdate: Yup.date().max(new Date(), 'Fecha no válida').required('Campo requerido')
});
