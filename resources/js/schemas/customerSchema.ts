import * as yup from "yup"; // Importamos todo bajo el alias 'yup'

export const customerSchema = yup.object({
    name: yup.string().min(2, 'El nombre debe tener al menos 2 caracteres').required('El nombre es requerido '),
    email: yup.string().email('Formato de correo no válido'),
    phoneNumber: yup.string().matches(/^[0-9]{8}$/, 'El número de teléfono debe tener 8 dígitos y solo tener numeros').required('Campo requerido'),
    nit: yup.string().matches(/^\d{4}-\d{6}-\d{3}-\d{1}$/, 'El NIT debe tener el formato 0000-000000-000-0').transform((curr, orig) => orig === "" ? null : curr),
    status: yup.string().required("Seleccione un estado"),
    department_id: yup.string().required("El Departamento es requerido"),
    municipality_id: yup.string().required("El Municipio es requerido"),
    district_id: yup.string().required("El distrito es requerido"),
});

export type CustomerFormData = yup.InferType<typeof customerSchema>;
