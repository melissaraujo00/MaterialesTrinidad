import { Head, Link, usePage } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Toaster } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserForm } from "./hooks/useUserForm";
import { ArrowLeft, Loader2, UserPlus } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

export default function UserCreate() {
    const { roles } = usePage<{ roles: { name: string }[] }>().props;
    const { data, setData, submit, processing, errors } = useUserForm();

    return (
        <AppLayout>
            <Head title="Crear Usuario" />
            <Toaster position="top-right" richColors />

            <div className="max-w-3xl mx-auto p-6 space-y-6">
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
                            Nuevo Usuario
                        </h2>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                            Asigna credenciales y roles para un nuevo miembro del sistema.
                        </p>
                    </div>
                </div>

                <form
                    onSubmit={submit}
                    className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-sm rounded-xl p-8 space-y-8 transition-colors"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">

                        <div className="space-y-2">
                            <Label htmlFor="name" className={errors.name ? "text-red-500" : "text-zinc-700 dark:text-zinc-300"}>
                                Nombre de Usuario
                            </Label>
                            <Input
                                id="name"
                                placeholder="ej. Juan Perez"
                                value={data.name}
                                onChange={(e) => setData("name", e.target.value)}
                                className={`bg-transparent ${errors.name ? "border-red-500 focus-visible:ring-red-500" : "border-zinc-200 dark:border-zinc-800"}`}
                            />
                            {errors.name && <p className="text-xs font-medium text-red-500">{errors.name}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email" className={errors.email ? "text-red-500" : "text-zinc-700 dark:text-zinc-300"}>
                                Correo Electrónico
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="usuario@cotizasis.com"
                                value={data.email}
                                onChange={(e) => setData("email", e.target.value)}
                                className={`bg-transparent ${errors.email ? "border-red-500 focus-visible:ring-red-500" : "border-zinc-200 dark:border-zinc-800"}`}
                            />
                            {errors.email && <p className="text-xs font-medium text-red-500">{errors.email}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="firstName" className="text-zinc-700 dark:text-zinc-300">Primer Nombre</Label>
                            <Input
                                id="firstName"
                                value={data.firstName}
                                onChange={(e) => setData("firstName", e.target.value)}
                                className="bg-transparent border-zinc-200 dark:border-zinc-800"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="lastName" className="text-zinc-700 dark:text-zinc-300">Apellido</Label>
                            <Input
                                id="lastName"
                                value={data.lastName}
                                onChange={(e) => setData("lastName", e.target.value)}
                                className="bg-transparent border-zinc-200 dark:border-zinc-800"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phoneNumber" className="text-zinc-700 dark:text-zinc-300">Teléfono</Label>
                            <Input
                                id="phoneNumber"
                                placeholder="88888888"
                                value={data.phoneNumber}
                                onChange={(e) => setData("phoneNumber", e.target.value)}
                                className="bg-transparent border-zinc-200 dark:border-zinc-800"
                            />
                        </div>

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

                        {/* Contraseña */}
                        <div className="space-y-2">
                            <Label htmlFor="password" className={errors.password ? "text-red-500" : "text-zinc-700 dark:text-zinc-300"}>
                                Contraseña
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                value={data.password}
                                onChange={(e) => setData("password", e.target.value)}
                                className={`bg-transparent ${errors.password ? "border-red-500" : "border-zinc-200 dark:border-zinc-800"}`}
                            />
                            {errors.password && <p className="text-xs font-medium text-red-500">{errors.password}</p>}
                        </div>

                        {/* Confirmar Contraseña */}
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword" className={errors.confirmPassword ? "text-red-500" : "text-zinc-700 dark:text-zinc-300"}>
                                Confirmar Contraseña
                            </Label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                value={data.confirmPassword}
                                onChange={(e) => setData("confirmPassword", e.target.value)}
                                className={`bg-transparent ${errors.confirmPassword ? "border-red-500" : "border-zinc-200 dark:border-zinc-800"}`}
                            />
                            {errors.confirmPassword && <p className="text-xs font-medium text-red-500">{errors.confirmPassword}</p>}
                        </div>

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
                                    {roles.map((role) => (
                                        <SelectItem key={role.name} value={role.name}>
                                            {role.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.role && <p className="text-xs font-medium text-red-500">{errors.role}</p>}
                        </div>
                    </div>

                    <div className="flex justify-end items-center gap-3 pt-6 border-t border-zinc-100 dark:border-zinc-800">
                        <Button
                            type="button"
                            variant="outline"
                            asChild
                            disabled={processing}
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
                                <UserPlus className="mr-2 h-4 w-4" />
                            )}
                            Crear Usuario
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
