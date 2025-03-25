import { type BreadcrumbItem, type SharedData } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';


import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Ajustes de Perfil',
        href: '/settings/profile',
    },
];

interface ProfileForm {
    name: string;
    firstName: string;
    lastName: string;
    birthdate: string;
    email: string;
    phoneNumber: string;
}

export default function Profile({ mustVerifyEmail, status }: { mustVerifyEmail: boolean; status?: string }) {
    const { auth } = usePage<SharedData>().props;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm<Required<ProfileForm>>({
        name: auth.user.name,
        firstName: auth.user.firstName,
        lastName: auth.user.lastName,
        birthdate: auth.user.birthdate,
        email: auth.user.email,
        phoneNumber: auth.user.phoneNumber
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route('profile.update'), {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Ajustes de Perfil" />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Información de perfil" description="Actualiza tu nombre y dirección de correo electrónico" />


                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Nombre</Label>

                            <Input
                                id="name"
                                className="mt-1 block w-full"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                                autoComplete="name"
                                placeholder="Nombre completo"
                            />

                            <InputError className="mt-2" message={errors.name} />
                        </div>
                        <div>
                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            First Name
                            </label>
                            <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={data.firstName}
                            onChange={(e) => setData('firstName', e.target.value)}

                            className="mt-1 p-2 w-3/4 max-w-md border rounded-md dark:bg-gray-800 dark:text-white"
                            required
                            />
                            {errors.firstName && <div className="text-red-500 text-sm">{errors.firstName}</div>}
                        </div>

                        <div>
                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Last Name
                            </label>
                            <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={data.lastName}
                            onChange={(e) => setData('lastName', e.target.value)}
                            className="mt-1 p-2 w-3/4 max-w-md border rounded-md dark:bg-gray-800 dark:text-white"
                            required
                            />
                            {errors.lastName && <div className="text-red-500 text-sm">{errors.lastName}</div>}
                        </div>
                        <div>
                            <label htmlFor="birthdate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Birthdate
                            </label>
                            <input
                            type="date"
                            id="birthdate"
                            name="birthdate"
                            value={data.birthdate}
                            onChange={(e) => setData('birthdate', e.target.value)}
                            className="mt-1 p-2 w-3/4 max-w-md border rounded-md dark:bg-gray-800 dark:text-white"
                            required
                            />
                            {errors.birthdate && <div className="text-red-500 text-sm">{errors.birthdate}</div>}
                        </div>


                        <div className="grid gap-2">
                            <Label htmlFor="email">Dirección de correo electrónico</Label>

                            <Input
                                id="email"
                                type="email"
                                className="mt-1 block w-full"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                required
                                autoComplete="username"
                                placeholder="Correo electrónico"
                            />

                            <InputError className="mt-2" message={errors.email} />
                        </div>

                        {mustVerifyEmail && auth.user.email_verified_at === null && (
                            <div>
                                <p className="text-muted-foreground -mt-4 text-sm">
                                    Tu dirección de correo electrónico no está verificada.{' '}
                                    <Link
                                        href={route('verification.send')}
                                        method="post"
                                        as="button"
                                        className="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500"
                                    >
                                        Haz clic aquí para reenviar el correo de verificación.
                                    </Link>
                                </p>

                                {status === 'verification-link-sent' && (
                                    <div className="mt-2 text-sm font-medium text-green-600">
                                        Se ha enviado un nuevo enlace de verificación a tu dirección de correo electrónico.
                                    </div>
                                )}
                            </div>
                        )}

                        <div>
                            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Phone Number
                            </label>
                            <input
                           type="text"
                            id="phoneNumber"
                            name="phoneNumber"
                            value={data.phoneNumber}
                            onChange={(e) => setData('phoneNumber', e.target.value)}
                            className="mt-1 p-2 w-3/4 max-w-md border rounded-md dark:bg-gray-800 dark:text-white"
                                required
                            />
                            {errors.phoneNumber && <div className="text-red-500 text-sm">{errors.phoneNumber}</div>}
                        </div>

                        <div className="flex items-center gap-4">
                            <Button disabled={processing}>Guardar</Button>

                            <Transition
                                show={recentlySuccessful}
                                enter="transition ease-in-out"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"
                            >
                                <p className="text-sm text-neutral-600">Guardado</p>
                            </Transition>
                        </div>
                    </form>
                </div>
            </SettingsLayout>
        </AppLayout>
    );

}
