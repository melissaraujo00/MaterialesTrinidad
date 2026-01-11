import React from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Toaster } from "sonner";
import { useCustomerEdit } from "./hooks/useCustomerEdit"; // Importamos el nuevo hook
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Save, MapPin, User, Loader2 } from "lucide-react";

interface PageProps {
    customer: any;
    departments: any[];
    municipalities: any[];
    districts: any[];
}

export default function CustomerEdit() {
    const props = usePage<PageProps>().props;

    // Usamos el hook de edición
    const {
        form,
        submit,
        filteredMunicipalities,
        filteredDistricts,
        loading
    } = useCustomerEdit(props);

    const { register, setValue, watch, formState: { errors } } = form;

    return (
        <AppLayout>
            <Head title={`Editar Cliente: ${props.customer.name}`} />
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
                            Editar Cliente
                        </h1>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                            Actualizando información de <span className="font-semibold text-zinc-900 dark:text-zinc-100">{props.customer.name}</span>
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
                            <div className="space-y-2">
                                <Label htmlFor="name" className={errors.name && "text-red-500"}>Nombre Completo *</Label>
                                <Input id="name" {...register("name")} />
                                {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email" className={errors.email && "text-red-500"}>Correo Electrónico</Label>
                                <Input id="email" type="email" {...register("email")} />
                                {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phoneNumber" className={errors.phoneNumber && "text-red-500"}>Teléfono *</Label>
                                <Input id="phoneNumber" {...register("phoneNumber")} />
                                {errors.phoneNumber && <p className="text-xs text-red-500">{errors.phoneNumber.message}</p>}
                            </div>

                             <div className="space-y-2">
                                <Label htmlFor="nit" className={errors.nit && "text-red-500"}>NIT</Label>
                                <Input id="nit" {...register("nit")} />
                                {errors.nit && <p className="text-xs text-red-500">{errors.nit.message}</p>}
                            </div>

                            {/* Estado (Solo visible en edición) */}
                            <div className="space-y-2">
                                <Label>Estado del Cliente</Label>
                                <Select
                                    onValueChange={(val: any) => setValue("status", val)}
                                    value={watch("status")}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="activo">Activo</SelectItem>
                                        <SelectItem value="inactivo">Inactivo</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    {/* Sección 2: Ubicación */}
                    <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm">
                        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-zinc-100 dark:border-zinc-800">
                            <MapPin className="h-5 w-5 text-green-600" />
                            <h3 className="font-semibold text-lg text-zinc-900 dark:text-zinc-100">Dirección</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                            <div className="space-y-2">
                                <Label>Departamento</Label>
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
                            </div>

                            <div className="space-y-2">
                                <Label>Municipio</Label>
                                <Select
                                    onValueChange={(val) => setValue("municipality_id", val)}
                                    value={watch("municipality_id")}
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
                            </div>

                            <div className="space-y-2">
                                <Label className={errors.district_id && "text-red-500"}>Distrito *</Label>
                                <Select
                                    onValueChange={(val) => setValue("district_id", val)}
                                    value={watch("district_id")}
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

                        <div className="space-y-2">
                            <Label htmlFor="address" className={errors.address && "text-red-500"}>Dirección Exacta *</Label>
                            <Textarea id="address" {...register("address")} className="resize-none" />
                            {errors.address && <p className="text-xs text-red-500">{errors.address.message}</p>}
                        </div>

                        <div className="space-y-2 mt-4">
                            <Label htmlFor="description">Referencia / Descripción</Label>
                            <Input id="description" {...register("description")} />
                        </div>
                    </div>

                    <div className="flex justify-end gap-4 pt-4">
                        <Button variant="outline" asChild type="button">
                            <Link href={route('customers.index')}>Cancelar</Link>
                        </Button>
                        <Button type="submit" disabled={loading} className="bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900">
                            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                            Actualizar Cliente
                        </Button>
                    </div>

                </form>
            </div>
        </AppLayout>
    );
}
