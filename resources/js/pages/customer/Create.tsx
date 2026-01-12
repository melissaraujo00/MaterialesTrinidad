import React from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Toaster } from "sonner";
import { Button } from "@/components/ui/button";
import { Save, Loader2 } from "lucide-react";
import { PageProps } from '@inertiajs/core';

// Importación de Hooks
import { useCustomerForm } from "./hooks/useCustomerForm";

// Importación de Sub-componentes
import { CustomerHeader } from "@/components/customer-form/CustomerHeader";
import { CustomerGeneralInfo } from "@/components/customer-form/CustomerGeneralInfo";
import { CustomerAddress } from "@/components/customer-form/CustomerAddress";

// Tipado extendido de Inertia
interface Props extends PageProps {
    departments: any[];
    municipalities: any[];
    districts: any[];
}

export default function CustomerCreate() {
    // 1. Obtener datos de Inertia (Contexto Global)
    const props = usePage<Props>().props;

    // 2. Iniciar Hook de Lógica del Formulario
    const {
        form,
        submit,
        filteredMunicipalities,
        filteredDistricts,
        loading
    } = useCustomerForm(props);

    return (
        <AppLayout>
            <Head title="Crear Cliente" />
            <Toaster position="top-right" richColors />

            <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-6">

                {/* Cabecera */}
                <CustomerHeader />

                <form onSubmit={submit} className="space-y-8">

                    {/* Bloques de Formulario */}
                    <CustomerGeneralInfo form={form} />

                    {/* Pasamos las listas filtradas al componente de dirección.
                        El componente es "tonto", no sabe filtrar, solo muestra.
                    */}
                    <CustomerAddress
                        form={form}
                        departments={props.departments}
                        filteredMunicipalities={filteredMunicipalities}
                        filteredDistricts={filteredDistricts}
                    />

                    {/* Botones de Acción */}
                    <div className="flex justify-end gap-4 pt-4">
                        <Button variant="outline" asChild type="button">
                            <Link href={route('customers.index')}>Cancelar</Link>
                        </Button>

                        <Button
                            type="submit"
                            disabled={loading}
                            className="bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 min-w-[150px]"
                        >
                            {loading ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <Save className="mr-2 h-4 w-4" />
                            )}
                            Guardar Cliente
                        </Button>
                    </div>

                </form>
            </div>
        </AppLayout>
    );
}
