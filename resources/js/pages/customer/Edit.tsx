import React from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Toaster } from "sonner";
import { Button } from "@/components/ui/button";
import { Save, Loader2 } from "lucide-react";
import { PageProps } from '@inertiajs/core';

// Hooks y Componentes
import { useCustomerEdit } from "./hooks/useCustomerEdit";
import { CustomerHeader } from "@/components/customer-form/CustomerHeader";
import { CustomerGeneralInfo } from "@/components/customer-form/CustomerGeneralInfo";
import { CustomerAddress } from "@/components/customer-form/CustomerAddress";

// Tipado
interface Props extends PageProps {
    customer: any;
    departments: any[];
    municipalities: any[];
    districts: any[];
}

export default function CustomerEdit() {
    const props = usePage<Props>().props;

    // Usamos el hook de edición
    const {
        form,
        submit,
        filteredMunicipalities,
        filteredDistricts,
        loading
    } = useCustomerEdit(props);

    return (
        <AppLayout>
            <Head title={`Editar ${props.customer.name}`} />
            <Toaster position="top-right" richColors />

            <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-6">

                {/* Cabecera Dinámica */}
                <CustomerHeader
                    title="Editar Cliente"
                    subtitle={
                        <span>Actualizando información de <span className="font-semibold text-zinc-900 dark:text-zinc-100">{props.customer.name}</span></span>
                    }
                />

                <form onSubmit={submit} className="space-y-8">

                    {/* Reutilizamos los bloques del Create */}
                    <CustomerGeneralInfo form={form} />

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
                            Actualizar Cliente
                        </Button>
                    </div>

                </form>
            </div>
        </AppLayout>
    );
}
