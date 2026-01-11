import React from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Toaster } from "sonner";
import { useCustomerForm } from "./hooks/useCustomerForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea"; // Asegúrate de tener este componente o usa Input
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Save, MapPin, User, FileText, Loader2 } from "lucide-react";

interface PageProps {
    departments: any[];
    municipalities: any[];
    districts: any[];
}

export default function CustomerCreate() {
    // 1. Obtener datos de Inertia
    const props = usePage<PageProps>().props;

    // 2. Iniciar Hook de Lógica
    const {
        form,
        submit,
        filteredMunicipalities,
        filteredDistricts,
        loading
    } = useCustomerForm(props);

    const { register, setValue, formState: { errors }, watch } = form;

    return (
        <AppLayout>
            <Head title="Crear Cliente" />
            <Toaster position="top-right" richColors />

            <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-6">

                {/* Cabecera */}
                <div className="flex items-center gap-4 mb-6">
                    <Button asChild variant="ghost" size="icon" className="rounded-full">
                        <Link href={route('customers.index')}>
                            <ArrowLeft className="h-5 w-5 text-zinc-600" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 font-instrument">
                            Nuevo Cliente
                        </h1>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                            Complete la información para registrar un nuevo cliente en el sistema.
                        </p>
                    </div>
                </div>

                <form onSubmit={submit} className="space-y-8">

                    {/* Sección 1: Información General */}
                    <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm">
                        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-zinc-100 dark:border-zinc-800">
                            <User className="h-5 w-5 text-blue-600" />
                            <h3 className="font-semibold text-lg text-zinc-900 dark:text-zinc-100">Información General</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Nombre */}
                            <div className="space-y-2">
                                <Label htmlFor="name" className={errors.name && "text-red-500"}>Nombre Completo *</Label>
                                <Input id="name" {...register("name")} placeholder="Ej. Juan Pérez" />
                                {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
                            </div>

                            {/* Email */}
                            <div className="space-y-2">
                                <Label htmlFor="email" className={errors.email && "text-red-500"}>Correo Electrónico</Label>
                                <Input id="email" type="email" {...register("email")} placeholder="cliente@empresa.com" />
                                {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
                            </div>

                            {/* Teléfono */}
                            <div className="space-y-2">
                                <Label htmlFor="phoneNumber" className={errors.phoneNumber && "text-red-500"}>Teléfono *</Label>
                                <Input id="phoneNumber" {...register("phoneNumber")} placeholder="0000-0000" />
                                {errors.phoneNumber && <p className="text-xs text-red-500">{errors.phoneNumber.message}</p>}
                            </div>

                             {/* NIT */}
                             <div className="space-y-2">
                                <Label htmlFor="nit" className={errors.nit && "text-red-500"}>NIT</Label>
                                <Input id="nit" {...register("nit")} placeholder="0000-000000-000-0" />
                                {errors.nit && <p className="text-xs text-red-500">{errors.nit.message}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Sección 2: Ubicación */}
                    <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm">
                        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-zinc-100 dark:border-zinc-800">
                            <MapPin className="h-5 w-5 text-green-600" />
                            <h3 className="font-semibold text-lg text-zinc-900 dark:text-zinc-100">Dirección y Ubicación</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                            {/* Departamento */}
                            <div className="space-y-2">
                                <Label className={errors.department_id && "text-red-500"}>Departamento *</Label>
                                <Select onValueChange={(val) => setValue("department_id", val)} value={watch("department_id")}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Seleccione..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {props.departments.map((dept) => (
                                            <SelectItem key={dept.id} value={String(dept.id)}>{dept.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.department_id && <p className="text-xs text-red-500">{errors.department_id.message}</p>}
                            </div>

                            {/* Municipio */}
                            <div className="space-y-2">
                                <Label className={errors.municipality_id && "text-red-500"}>Municipio *</Label>
                                <Select
                                    onValueChange={(val) => setValue("municipality_id", val)}
                                    value={watch("municipality_id")}
                                    disabled={!watch("department_id")}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Seleccione..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {filteredMunicipalities.map((muni) => (
                                            <SelectItem key={muni.id} value={String(muni.id)}>{muni.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.municipality_id && <p className="text-xs text-red-500">{errors.municipality_id.message}</p>}
                            </div>

                            {/* Distrito */}
                            <div className="space-y-2">
                                <Label className={errors.district_id && "text-red-500"}>Distrito *</Label>
                                <Select
                                    onValueChange={(val) => setValue("district_id", val)}
                                    value={watch("district_id")}
                                    disabled={!watch("municipality_id")}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Seleccione..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {filteredDistricts.map((dist) => (
                                            <SelectItem key={dist.id} value={String(dist.id)}>{dist.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.district_id && <p className="text-xs text-red-500">{errors.district_id.message}</p>}
                            </div>
                        </div>

                        {/* Dirección Exacta */}
                        <div className="space-y-2">
                            <Label htmlFor="address" className={errors.address && "text-red-500"}>Dirección Exacta *</Label>
                            <Textarea
                                id="address"
                                {...register("address")}
                                placeholder="Colonia, Calle, Número de casa..."
                                className="resize-none"
                            />
                            {errors.address && <p className="text-xs text-red-500">{errors.address.message}</p>}
                        </div>

                        {/* Descripción Adicional */}
                        <div className="space-y-2 mt-4">
                            <Label htmlFor="description">Referencia / Descripción (Opcional)</Label>
                            <Input id="description" {...register("description")} placeholder="Frente a..." />
                        </div>
                    </div>

                    {/* Botones de Acción */}
                    <div className="flex justify-end gap-4 pt-4">
                        <Button variant="outline" asChild type="button">
                            <Link href={route('customers.index')}>Cancelar</Link>
                        </Button>
                        <Button type="submit" disabled={loading} className="bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900">
                            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                            Guardar Cliente
                        </Button>
                    </div>

                </form>
            </div>
        </AppLayout>
    );
}
