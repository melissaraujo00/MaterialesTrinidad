import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useProfileForm } from '@/hooks/useProfileForm'; // Asegúrate de tenerlo creado
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, Link, usePage } from '@inertiajs/react';
import { Toaster } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Ajustes de Perfil',
        href: '/settings/profile',
    },
];

export default function Profile({ mustVerifyEmail, status }: { mustVerifyEmail: boolean; status?: string }) {
    const { auth } = usePage<SharedData>().props;

    // Desacoplamiento de lógica: Usamos el hook personalizado
    const { data, setData, submit, errors, processing, recentlySuccessful } = useProfileForm();

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Ajustes de Perfil" />
            <Toaster position="top-right" richColors />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall
                        title="Información de perfil"
                        description="Actualiza tu información personal y dirección de contacto."
                    />

                    <form onSubmit={submit} className="space-y-6 max-w-2xl">
                        {/* Username / Name */}
                        <div className="grid gap-2">
                            <Label htmlFor="name">Nombre de Usuario</Label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                autoComplete="name"
                                placeholder="Nombre de usuario"
                                aria-invalid={!!errors.name}
                                className={errors.name ? 'border-destructive focus-visible:ring-destructive' : ''}
                            />
                            {errors.name && <p className="text-destructive text-xs font-medium">{errors.name}</p>}
                        </div>

                        {/* Firts Name & Last Name en Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="firstName">Primer Nombre</Label>
                                <Input
                                    id="firstName"
                                    value={data.firstName}
                                    onChange={(e) => setData('firstName', e.target.value)}
                                    aria-invalid={!!errors.firstName}
                                    className={errors.firstName ? 'border-destructive' : ''}
                                />
                                {errors.firstName && <p className="text-destructive text-xs">{errors.firstName}</p>}
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="lastName">Apellido</Label>
                                <Input
                                    id="lastName"
                                    value={data.lastName}
                                    onChange={(e) => setData('lastName', e.target.value)}
                                    aria-invalid={!!errors.lastName}
                                    className={errors.lastName ? 'border-destructive' : ''}
                                />
                                {errors.lastName && <p className="text-destructive text-xs">{errors.lastName}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Birthdate */}
                            <div className="grid gap-2">
                                <Label htmlFor="birthdate">Fecha de Nacimiento</Label>
                                <Input
                                    id="birthdate"
                                    type="date"
                                    value={data.birthdate}
                                    onChange={(e) => setData('birthdate', e.target.value)}
                                    aria-invalid={!!errors.birthdate}
                                    className={errors.birthdate ? 'border-destructive' : ''}
                                />
                                {errors.birthdate && <p className="text-destructive text-xs">{errors.birthdate}</p>}
                            </div>

                            {/* Phone Number */}
                            <div className="grid gap-2">
                                <Label htmlFor="phoneNumber">Número de Teléfono</Label>
                                <Input
                                    id="phoneNumber"
                                    type="text"
                                    value={data.phoneNumber}
                                    onChange={(e) => setData('phoneNumber', e.target.value)}
                                    placeholder="88888888"
                                    aria-invalid={!!errors.phoneNumber}
                                    className={errors.phoneNumber ? 'border-destructive' : ''}
                                />
                                {errors.phoneNumber && <p className="text-destructive text-xs">{errors.phoneNumber}</p>}
                            </div>
                        </div>

                        {/* Email */}
                        <div className="grid gap-2">
                            <Label htmlFor="email">Correo electrónico</Label>
                            <Input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                autoComplete="username"
                                aria-invalid={!!errors.email}
                                className={errors.email ? 'border-destructive' : ''}
                            />
                            {errors.email && <p className="text-destructive text-xs">{errors.email}</p>}
                        </div>

                        {/* Email Verification Section */}
                        {mustVerifyEmail && auth.user.email_verified_at === null && (
                            <div className="p-4 rounded-lg border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/50">
                                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                                    Tu dirección de correo no está verificada.
                                    <Link
                                        href={route('verification.send')}
                                        method="post"
                                        as="button"
                                        className="ml-2 font-medium text-zinc-900 underline underline-offset-4 hover:text-zinc-700 dark:text-zinc-100 dark:hover:text-zinc-300"
                                    >
                                        Reenviar correo de verificación.
                                    </Link>
                                </p>

                                {status === 'verification-link-sent' && (
                                    <div className="mt-2 text-sm font-medium text-green-600 dark:text-green-400">
                                        Se ha enviado un nuevo enlace de verificación.
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Actions */}
                        <div className="flex items-center gap-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                            <Button type="submit" disabled={processing}>
                                {processing ? 'Guardando...' : 'Guardar Cambios'}
                            </Button>

                            <Transition
                                show={recentlySuccessful}
                                enter="transition ease-in-out"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"
                            >
                                <p className="text-sm text-zinc-500 dark:text-zinc-400">Cambios guardados.</p>
                            </Transition>
                        </div>
                    </form>
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
