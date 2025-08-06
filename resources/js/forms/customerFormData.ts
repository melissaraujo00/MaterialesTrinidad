import { toast } from "sonner";
import { router } from "@inertiajs/react";

export const handleSubmit = (values: any) => {
    const data = new FormData();
    data.append("name", values.name);
    data.append("email", values.email);
    data.append("phoneNumber", values.phoneNumber);
    data.append("nit", values.nit);
    data.append("district_id", values.district_id);
    data.append("address", values.address);
    data.append("description", values.description);
    data.append("status", values.status);

    router.post("/customers", data, {
        onSuccess: () => {
            setTimeout(() => {
                toast.success("Cliente creado con éxito.");
            }, 1000);
        },
        onError: (errors) => {
            console.error("Errores de validación:", errors);
            toast.error("Hubo un error al crear el cliente. Verifica los datos.");
        },
    });
};
