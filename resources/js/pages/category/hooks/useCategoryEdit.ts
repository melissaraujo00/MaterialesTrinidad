import { useForm } from "@inertiajs/react";
import { toast } from "sonner";
import { FormEventHandler } from "react";

// Definimos la interfaz aquí para asegurar el tipado
interface Category {
    id: number;
    name: string;
    description: string;
}

export const useCategoryEdit = (category: Category) => {
    // Inicializamos con los datos de la base de datos
    const form = useForm({
        name: category.name || "",
        description: category.description || "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        // Usamos PUT para actualizar
        form.put(route("categories.update", category.id), {
            onSuccess: () => {
                toast.success("Categoría actualizada correctamente");
            },
            onError: (errors) => {
                if (errors.name) {
                    toast.error(errors.name);
                } else if (errors.description) {
                    toast.error(errors.description);
                } else {
                    toast.error("No se pudo actualizar la categoría.");
                }
            },
        });
    };

    return { ...form, submit };
};
