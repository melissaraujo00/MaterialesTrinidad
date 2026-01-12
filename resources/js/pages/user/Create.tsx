import React from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Toaster } from "sonner";
import { Button } from "@/components/ui/button";
import { UserPlus, Loader2 } from "lucide-react";

// Hooks y Componentes
import { useUserForm } from "./hooks/useUserForm";
import { UserHeader } from "@/components/user-form/UserHeader";
import { UserGeneralInfo } from "@/components/user-form/UserGeneralInfo";
import { UserSecurity } from "@/components/user-form/UserSecurity";

export default function UserCreate() {
    // 1. Obtener Roles de Inertia
    const { roles } = usePage<{ roles: { name: string }[] }>().props;

    // 2. Iniciar Hook
    const { form, submit, loading } = useUserForm();

    return (
        <AppLayout>
            <Head title="Crear Usuario" />
            <Toaster position="top-right" richColors />

            <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-6">

                {/* Cabecera */}
                <UserHeader />

                <form onSubmit={submit}>

                    {/* Layout de 2 columnas asimétricas */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                        {/* Columna Izquierda (2/3): Datos Personales */}
                        <div className="md:col-span-2 space-y-6">
                            <UserGeneralInfo form={form} />
                        </div>

                        {/* Columna Derecha (1/3): Seguridad */}
                        <div className="space-y-6">
                            <UserSecurity form={form} roles={roles} />

                            {/* Botones de Acción (móvil y desktop) */}
                            <div className="flex flex-col gap-3 pt-2">
                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900"
                                >
                                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <UserPlus className="mr-2 h-4 w-4" />}
                                    Crear Usuario
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
