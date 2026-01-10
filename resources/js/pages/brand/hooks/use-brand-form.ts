import { useForm } from "@inertiajs/react";
import { toast } from "sonner";
import { brandSchema } from "@/schemas/brandShema";
import { ValidationError } from "yup";

export function useBrandForm() {
    const { data, setData, post, processing, errors, setError, clearErrors, reset } = useForm({
        name: "",
        description: "",
    });

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        clearErrors(); // Limpiamos errores previos

        try {
            // Validamos contra el esquema de Yup
            await brandSchema.validate(data, { abortEarly: false });

            // Si pasa Yup, enviamos a Laravel
            post("/brands", {
                onSuccess: () => {
                    toast.success("Marca creada con éxito");
                    reset();
                },
            });
        } catch (err) {
            if (err instanceof ValidationError) {
                // Mapeamos los errores de Yup al objeto de errores de Inertia
                err.inner.forEach((error) => {
                    if (error.path) setError(error.path as any, error.message);
                });
            }
        }
    };

    return { data, setData, submit, processing, errors };
}
