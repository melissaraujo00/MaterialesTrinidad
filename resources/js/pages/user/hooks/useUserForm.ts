import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userSchema, UserFormData } from "@/schemas/userSchema";
import { router } from "@inertiajs/react";
import { toast } from "sonner";


const formatDateToMySQL = (date: Date | string | null | undefined) => {
    if (!date) return null;

    if (typeof date === 'string' && !date.includes('T')) return date;

    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
};

export const useUserForm = () => {
    const form = useForm<UserFormData>({
        resolver: yupResolver(userSchema),
        defaultValues: {
            name: "",
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            birthdate: "",
            role: "",
            password: "",
            confirmPassword: "",
        },
    });

    const { handleSubmit, setError, reset } = form;

    const submit = (data: UserFormData) => {
        const payload = {
            ...data,
            birthdate: formatDateToMySQL(data.birthdate),
        };

        router.post(route("users.store"), payload as any, {
            onSuccess: () => {
                toast.success("Usuario creado con éxito");
                reset();
            },
            onError: (errors) => {
                toast.error("Error al crear usuario.");
                Object.keys(errors).forEach((field) => {
                    setError(field as any, { type: "server", message: errors[field] });
                });
            },
        });
    };

    return {
        form,
        submit: handleSubmit(submit),
        loading: form.formState.isSubmitting,
    };
};
