import { useForm } from "@inertiajs/react";
import { toast } from "sonner";
import { FormEventHandler } from "react";

export const useCategoryForm = () => {
    // Definimos el estado inicial con useForm de Inertia
    const form = useForm({
        name: "",
        description: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        // Enviamos la petición POST
        form.post(route("categories.store"), {
            onSuccess: () => {
                toast.success("Categoría creada con éxito");
                form.reset();
            },
            onError: (errors) => {
                // Inertia carga los errores automáticamente en form.errors
                if (errors.name) {
                    toast.error(errors.name);
                } else if (errors.description) {
                    toast.error(errors.description);
                } else {
                    toast.error("Ocurrió un error al guardar.");
                }
            },
        });
    };

    return {
        ...form, // Esto exporta data, setData, processing, errors, reset, etc.
        submit
    };
};
