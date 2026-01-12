import * as Yup from 'yup';

 export const userSchemaEdit = Yup.object({
    name: Yup.string().min(3, "El nombre debe tener al menos 3 caracteres").required("Campo requerido"),
    firstName: Yup.string().min(3, "El nombre debe tener al menos 3 caracteres").required("Campo requerido"),
    lastName: Yup.string().min(3, "El nombre debe tener al menos 3 caracteres").required("Campo requerido"),
    email: Yup.string().email("Email no válido").required("Campo requerido"),
    phoneNumber: Yup.string()
      .matches(/^[0-9]{8}$/, "El número de teléfono debe tener 8 dígitos y solo contener números")
      .required("Campo requerido"),
    birthdate: Yup.date().max(new Date(), 'La fecha de nacimiento no puede ser en el futuro').required('Campo requerido'),
    role: Yup.string().required("Campo requerido")
  });
