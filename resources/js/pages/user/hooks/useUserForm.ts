import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import { toast } from 'sonner';
import { userSchema } from '@/schemas/userSchema';
import * as Yup from 'yup';

export const useUserForm = () => {
    const [errors, setErrors] = useState<Record<string, string>>({});

    const form = useForm({
        name: '',
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        birthdate: '',
        role: '',
        password: '',
        confirmPassword: '',
    });

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});

        try {
            // Validamos contra el esquema de Yup
            await userSchema.validate(form.data, { abortEarly: false });

            form.post(route('users.store'), {
                preserveScroll: true,
                onSuccess: () => toast.success("Usuario creado con éxito"),
                onError: (serverErrors) => setErrors(serverErrors),
            });
        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                const validationErrors: Record<string, string> = {};
                err.inner.forEach((e) => { if (e.path) validationErrors[e.path] = e.message; });
                setErrors(validationErrors);
                console.error("Validación fallida:", validationErrors);
            }
        }
    };

    return { ...form, errors, submit };
};
