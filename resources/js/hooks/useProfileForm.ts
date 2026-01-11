import { useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { toast } from 'sonner';
import { profileSchema } from '@/schemas/profileSchema';
import * as Yup from 'yup';
import { SharedData } from '@/types';

export const useProfileForm = () => {
    const { auth } = usePage<SharedData>().props;
    const [errors, setErrors] = useState<Record<string, string>>({});

    const form = useForm({
        name: auth.user.name || '',
        firstName: auth.user.firstName || '',
        lastName: auth.user.lastName || '',
        birthdate: auth.user.birthdate || '',
        email: auth.user.email || '',
        phoneNumber: auth.user.phoneNumber || '',
    });

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});

        try {
            await profileSchema.validate(form.data, { abortEarly: false });
            form.patch(route('profile.update'), {
                preserveScroll: true,
                onSuccess: () => toast.success("Perfil actualizado correctamente 🎉"),
                onError: (serverErrors) => setErrors(serverErrors),
            });
        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                const validationErrors: Record<string, string> = {};
                err.inner.forEach((e) => { if (e.path) validationErrors[e.path] = e.message; });
                setErrors(validationErrors);
            }
        }
    };

    return { ...form, errors, setErrors, submit };
};
