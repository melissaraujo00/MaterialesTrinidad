import React from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Toaster } from "sonner";
import { Button } from "@/components/ui/button";
import { Save, Loader2 } from "lucide-react";

// Tu hook (la versión de arriba)
import { useUserEdit } from "./hooks/useUserEdit";

// Componentes Reutilizables (Versión Inertia que definimos antes)
import { UserHeader } from "@/components/user-form/UserHeader";
import { UserGeneralInfo } from "@/components/user-form/UserGeneralInfo";
import { UserSecurity } from "@/components/user-form/UserSecurity";

interface Props {
    user: any;
    roles: { name: string }[];
}

export default function UserEdit({ user, roles }: Props) {
    // Usamos tu hook
    const { data, setData, submit, processing, errors } = useUserEdit(user);

    return (
        <AppLayout>
            <Head title={`Editar ${user.name}`} />
            <Toaster position="top-right" richColors />

            <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-6">

                <UserHeader
                    title="Editar Usuario"
                    subtitle={`Actualizando información de ${user.firstName} ${user.lastName}`}
                />

                <form onSubmit={submit}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                        {/* Columna Izquierda (Datos Generales) */}
                        <div className="md:col-span-2 space-y-6">
                            <UserGeneralInfo
                                data={data}
                                setData={setData}
                                errors={errors}
                            />
                        </div>

                        {/* Columna Derecha (Seguridad y Roles) */}
                        <div className="space-y-6">
                            <UserSecurity
                                data={data}
                                setData={setData}
                                errors={errors}
                                roles={roles}
                            />

                            {/* Botones */}
                            <div className="flex flex-col gap-3 pt-2">
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900"
                                >
                                    {processing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                                    Guardar Cambios
                                </Button>

                                <Button variant="outline" asChild className="w-full dark:border-zinc-800 dark:text-zinc-300">
                                    <Link href={route('users.index')}>Cancelar</Link>
                                </Button>
                            </div>
                        </div>

                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
