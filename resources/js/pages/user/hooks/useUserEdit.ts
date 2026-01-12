import { useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { userSchemaEdit } from '@/schemas/useSchemaEdit'; // Asegúrate de tener este schema
import * as Yup from 'yup';

const formatDateToMySQL = (date: string) => {
    if (!date) return '';
    const d = new Date(date);
    if (isNaN(d.getTime())) return date;
    return d.toISOString().split('T')[0];
};

export const useUserEdit = (user: any) => {
    const [errors, setErrors] = useState<Record<string, string>>({});

    const form = useForm({
        name: user?.name || '',
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        email: user?.email || '',
        phoneNumber: user?.phoneNumber || '',
        birthdate: user?.birthdate ? user.birthdate.split('T')[0] : '',
        role: user?.roles?.[0]?.name || user?.role || '',
        password: '',
        confirmPassword: '',
    });


    useEffect(() => {
        if (user) {
            form.setData({
                name: user.name || '',
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                email: user.email || '',
                phoneNumber: user.phoneNumber || '',
                birthdate: user.birthdate ? user.birthdate.split('T')[0] : '',
                role: user.roles?.[0]?.name || user.role || '',
                password: '',
                confirmPassword: '',
            });
        }
    }, [user]);

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});

        try {
            await userSchemaEdit.validate(form.data, { abortEarly: false });

            form.transform((data) => {
                const payload = {
                    ...data,
                    birthdate: formatDateToMySQL(data.birthdate),
                };

                if (!payload.password) {
                    delete (payload as any).password;
                    delete (payload as any).confirmPassword;
                }

                return payload;
            });


            form.put(route('users.update', user.id), {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success("Usuario actualizado correctamente");
                    form.setData(data => ({ ...data, password: '', confirmPassword: '' }));
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
