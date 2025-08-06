import * as Yup from 'yup';

export const validationSchema = Yup.object({
    name: Yup.string().min(2, 'El nombre debe tener al menos 2 caracteres').required('El nombre es requerido '),
    email: Yup.string().email('Formato de correo no válido'),
    phoneNumber: Yup.string().matches(/^[0-9]{8}$/, 'El número de teléfono debe tener 8 dígitos y solo tener numeros').required('Campo requerido'),
    nit: Yup.string().matches(/^\d{4}-\d{6}-\d{3}-\d{1}$/, 'El NIT debe tener el formato 0000-000000-000-0'),
    status: Yup.string().required("Seleccione un estado"),
    department_id: Yup.string().required("El Departamento es requerido"),
    municipality_id: Yup.string().required("El Municipio es requerido"),
    district_id: Yup.string().required("El distrito es requerido"),
});
