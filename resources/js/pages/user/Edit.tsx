import { Head, Link } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Toaster } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserEdit } from "./hooks/useUserEdit"; // Hook optimizado sin password
import { ArrowLeft, Loader2, Save } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

interface User {
    id: number;
    name: string;
    firstName: string;
    lastName: string;
    birthdate: string;
    email: string;
    phoneNumber: string;
    role: string;
}

interface Role {
    name: string;
}

interface Props {
    user: User;
    roles: Role[];
}

export default function UserEdit({ user, roles }: Props) {
    // Usamos el hook especializado que solo maneja los datos que ves en pantalla
    const { data, setData, submit, processing, errors } = useUserEdit(user);

    return (
        <AppLayout>
            <Head title={`Editar Usuario: ${user.name}`} />
            <Toaster position="top-right" richColors />

            <div className="max-w-3xl mx-auto p-6 space-y-6">
                {/* Cabecera consistente con el módulo de Marcas */}
                <div className="flex items-center gap-4">
                    <Button
                        asChild
                        variant="ghost"
                        size="icon"
                        className="rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    >
                        <Link href="/users">
                            <ArrowLeft className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
                        </Link>
                    </Button>
                    <div>
                        <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                            Editar Usuario
                        </h2>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 font-instrument">
                            Actualizando la información de <span className="font-bold text-zinc-900 dark:text-zinc-100">{user.name}</span>.
                        </p>
                    </div>
                </div>

                {/* Tarjeta de Formulario estilo CotizaSis */}
                <form
                    onSubmit={submit}
                    className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-sm rounded-xl p-8 space-y-8 transition-colors"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">

                        {/* Nombre de Usuario */}
                        <div className="space-y-2">
                            <Label htmlFor="name" className={errors.name ? "text-red-500" : "text-zinc-700 dark:text-zinc-300"}>
                                Username
                            </Label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(e) => setData("name", e.target.value)}
                                className={`bg-transparent ${errors.name ? "border-red-500" : "border-zinc-200 dark:border-zinc-800"}`}
                            />
                            {errors.name && <p className="text-xs font-medium text-red-500">{errors.name}</p>}
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <Label htmlFor="email" className={errors.email ? "text-red-500" : "text-zinc-700 dark:text-zinc-300"}>
                                Correo Electrónico
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData("email", e.target.value)}
                                className={`bg-transparent ${errors.email ? "border-red-500" : "border-zinc-200 dark:border-zinc-800"}`}
                            />
                            {errors.email && <p className="text-xs font-medium text-red-500">{errors.email}</p>}
                        </div>

                        {/* Primer Nombre */}
                        <div className="space-y-2">
                            <Label htmlFor="firstName" className="text-zinc-700 dark:text-zinc-300">Primer Nombre</Label>
                            <Input
                                id="firstName"
                                value={data.firstName}
                                onChange={(e) => setData("firstName", e.target.value)}
                                className="bg-transparent border-zinc-200 dark:border-zinc-800"
                            />
                        </div>

                        {/* Apellido */}
                        <div className="space-y-2">
                            <Label htmlFor="lastName" className="text-zinc-700 dark:text-zinc-300">Apellido</Label>
                            <Input
                                id="lastName"
                                value={data.lastName}
                                onChange={(e) => setData("lastName", e.target.value)}
                                className="bg-transparent border-zinc-200 dark:border-zinc-800"
                            />
                        </div>

                        {/* Teléfono */}
                        <div className="space-y-2">
                            <Label htmlFor="phoneNumber" className="text-zinc-700 dark:text-zinc-300">Teléfono</Label>
                            <Input
                                id="phoneNumber"
                                value={data.phoneNumber}
                                onChange={(e) => setData("phoneNumber", e.target.value)}
                                className="bg-transparent border-zinc-200 dark:border-zinc-800"
                            />
                        </div>

                        {/* Fecha Nacimiento */}
                        <div className="space-y-2">
                            <Label htmlFor="birthdate" className="text-zinc-700 dark:text-zinc-300">Fecha de Nacimiento</Label>
                            <Input
                                id="birthdate"
                                type="date"
                                value={data.birthdate}
                                onChange={(e) => setData("birthdate", e.target.value)}
                                className="bg-transparent border-zinc-200 dark:border-zinc-800 dark:[color-scheme:dark]"
                            />
                        </div>

                        {/* Rol (Ocupa ancho completo) */}
                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="role" className={errors.role ? "text-red-500" : "text-zinc-700 dark:text-zinc-300"}>
                                Rol del Sistema
                            </Label>
                            <Select
                                value={data.role}
                                onValueChange={(value) => setData('role', value)}
                            >
                                <SelectTrigger className={`bg-transparent ${errors.role ? "border-red-500" : "border-zinc-200 dark:border-zinc-800"}`}>
                                    <SelectValue placeholder="Seleccione un rol" />
                                </SelectTrigger>
                                <SelectContent>
                                    {roles.map((r) => (
                                        <SelectItem key={r.name} value={r.name}>
                                            {r.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.role && <p className="text-xs font-medium text-red-500">{errors.role}</p>}
                        </div>
                    </div>

                    {/* Botones de Acción */}
                    <div className="flex justify-end items-center gap-3 pt-6 border-t border-zinc-100 dark:border-zinc-800">
                        <Button
                            type="button"
                            variant="outline"
                            asChild
                            className="dark:border-zinc-800 dark:hover:bg-zinc-900 dark:text-zinc-300"
                        >
                            <Link href="/users">Cancelar</Link>
                        </Button>

                        <Button
                            type="submit"
                            disabled={processing}
                            className="min-w-[140px] bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
                        >
                            {processing ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <Save className="mr-2 h-4 w-4" />
                            )}
                            Guardar Cambios
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
