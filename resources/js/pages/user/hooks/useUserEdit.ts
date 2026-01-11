import { useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { userSchemaEdit } from '@/schemas/useSchemaEdit';
import * as Yup from 'yup';

export const useUserEdit = (user: any) => {
    const [errors, setErrors] = useState<Record<string, string>>({});

    const form = useForm({
        name: user?.name || '',
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        email: user?.email || '',
        phoneNumber: user?.phoneNumber || '',
        birthdate: user?.birthdate || '',
        role: user?.roles?.[0]?.name || user?.role || '',
    });

    // Sincroniza los datos si el objeto user cambia (importante para Inertia)
    useEffect(() => {
        if (user) {
            form.setData({
                name: user.name || '',
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                email: user.email || '',
                phoneNumber: user.phoneNumber || '',
                birthdate: user.birthdate || '',
                role: user.roles?.[0]?.name || user.role || '',
            });
        }
    }, [user]);

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});

        try {
            // Validar con el esquema que NO pide contraseña
            await userSchemaEdit.validate(form.data, { abortEarly: false });

            form.put(route('users.update', user.id), {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success("Usuario actualizado correctamente");
                },
                onError: (serverErrors) => {
                    setErrors(serverErrors);
                    toast.error("Error al actualizar el perfil");
                },
            });
        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                const validationErrors: Record<string, string> = {};
                err.inner.forEach((e) => {
                    if (e.path) validationErrors[e.path] = e.message;
                });
                setErrors(validationErrors);
            }
        }
    };

    return {
        data: form.data,
        setData: form.setData,
        submit,
        processing: form.processing,
        errors
    };
};
