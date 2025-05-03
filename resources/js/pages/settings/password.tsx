import InputError from '@/components/input-error';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { type BreadcrumbItem } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler, useRef } from 'react';
import { toast } from "sonner";
import { Toaster } from "sonner";
import { usePage } from "@inertiajs/react";
import * as Yup from 'yup';
import { useState } from "react";

import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Ajuste de Contraseña',
        href: '/settings/password',
    },
];

export default function Password() {
    const passwordInput = useRef<HTMLInputElement>(null);
    const currentPasswordInput = useRef<HTMLInputElement>(null);
    const passwordRegex = /^(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
    const [validationError, setValidationError] = useState<string | null>(null);

    const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword: FormEventHandler = (e) => {
        e.preventDefault();

        if (passwordRegex.test(data.password)) {
            setValidationError(null); // Limpiar error si la contraseña es válida

            put(route('password.update'), {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success("Contraseña actualizada con éxito.");
                    reset();
                },
                onError: (errors) => {
                    if (errors.password) {
                        reset('password', 'password_confirmation');
                        passwordInput.current?.focus();
                    }

                    if (errors.current_password) {
                        reset('current_password');
                        currentPasswordInput.current?.focus();
                    }
                },
            });
        } else {
            setValidationError("La contraseña debe tener al menos 8 caracteres, una mayúscula y un símbolo.");
        }


    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Ajuste de Perfil "/>
            <SettingsLayout>
                <div className="space-y-6 ">
                    <HeadingSmall title="Actualizar contraseña" description="Asegúrate de que tu cuenta use una contraseña larga y aleatoria para mantenerla segura." />

                    <form onSubmit={updatePassword} className="space-y-6">
                        <div className="grid gap-2">
                            <Label htmlFor="current_password">contraseña actual</Label>

                            <Input
                                id="current_password"
                                ref={currentPasswordInput}
                                value={data.current_password}
                                onChange={(e) =>{
                                    setData('current_password', e.target.value)
                                    errors.current_password=""

                                }}
                                type="password"
                                className="mt-1 block w-full"
                                autoComplete="current-password"
                                placeholder="contraseña actual"
                            />

                            <InputError message={errors.current_password} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password">contraseña nueva</Label>

                            <Input
                                id="password"
                                ref={passwordInput}
                                value={data.password}
                                onChange={(e) =>{
                                    setData('password', e.target.value);
                                    setValidationError(null);
                                    errors.password=""
                                }}
                                type="password"
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                                placeholder="contraseña nueva"
                            />

                            <InputError message={errors.password} />
                            {validationError && <p style={{ color: 'red' }}>{validationError}</p>}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password_confirmation">confirmacion de la nueva contraseña</Label>

                            <Input
                                id="password_confirmation"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                type="password"
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                                placeholder="confirmacion"
                            />

                            <InputError message={errors.password_confirmation} />
                        </div>

                        <div className="flex items-center gap-4">
                            <Button disabled={processing}>Guardar contraseña</Button>

                            <Transition
                                show={recentlySuccessful}
                                enter="transition ease-in-out"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"
                            >
                                <p className="text-sm text-neutral-600">Guardar</p>
                            </Transition>
                        </div>
                    </form>
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
