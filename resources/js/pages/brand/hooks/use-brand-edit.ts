import { useForm } from "@inertiajs/react";
import { toast } from "sonner";
import { brandSchema } from "@/schemas/brandShema"; // Tu esquema centralizado
import { Brand } from "@/types"; // Tu interfaz de marca
import { ValidationError } from "yup";

export function useBrandEdit(brand: Brand) {
    // Inicializamos el formulario con los datos existentes de la marca
    const { data, setData, put, processing, errors, setError, clearErrors } = useForm({
        name: brand.name || "",
        description: brand.description || "",
    });

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        clearErrors();

        try {
            // Validamos con Yup antes de enviar
            await brandSchema.validate(data, { abortEarly: false });

            // Enviamos la actualización usando PUT (estándar REST en Laravel)
            put(route('brands.update', brand.id), {
                onSuccess: () => {
                    toast.success("Marca actualizada correctamente");
                },
                onError: (backendErrors) => {
                    console.error("Errores del servidor:", backendErrors);
                }
            });
        } catch (err) {
            if (err instanceof ValidationError) {
                // Mapeamos errores de Yup al objeto de errores de Inertia
                err.inner.forEach((error) => {
                    if (error.path) {
                        setError(error.path as any, error.message);
                    }
                });
            }
        }
    };

    return { data, setData, submit, processing, errors };
}
