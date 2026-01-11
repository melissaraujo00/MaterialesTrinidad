import { z } from "zod";

export const customerSchema = z.object({
    name: z.string()
        .min(2, "El nombre debe tener al menos 2 caracteres"),

    email: z.string()
        .email("Formato de correo no válido")
        .optional()
        .or(z.literal('')), // Permite vacío o un email válido

    phoneNumber: z.string()
        .regex(/^[0-9]{8}$/, "El número de teléfono debe tener 8 dígitos y solo números"),

    // Validación de NIT: Formato estricto 0000-000000-000-0, pero opcional (puede ir vacío)
    nit: z.string()
        .regex(/^\d{4}-\d{6}-\d{3}-\d{1}$/, "El NIT debe tener el formato 0000-000000-000-0")
        .optional()
        .or(z.literal('')),

    department_id: z.string().min(1, "El Departamento es requerido"),
    municipality_id: z.string().min(1, "El Municipio es requerido"),
    district_id: z.string().min(1, "El distrito es requerido"),

    address: z.string().min(5, "La dirección es requerida"),
    description: z.string().optional(),
    status: z.enum(["activo", "inactivo"], {
        errorMap: () => ({ message: "Seleccione un estado" })
    }),
});

export type CustomerFormData = z.infer<typeof customerSchema>;
