import React from "react";
import { Head, Link } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCategoryForm } from "./hooks/useCategoryForm";
import { ArrowLeft, Loader2, Layers } from "lucide-react";

export default function CategoryCreate() {
    // Usamos el hook nativo de Inertia que acabamos de crear
    const { data, setData, submit, processing, errors } = useCategoryForm();

    return (
        <AppLayout>
            <Head title="Crear Categoría" />

            <div className="max-w-2xl mx-auto p-6 space-y-6">
                {/* Cabecera interna */}
                <div className="flex items-center gap-4">
                    <Button
                        asChild
                        variant="ghost"
                        size="icon"
                        className="rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    >
                        <Link href={route('categories.index')}>
                            <ArrowLeft className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
                        </Link>
                    </Button>
                    <div>
                        <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                            Nueva Categoría
                        </h2>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                            Registra una nueva clasificación de productos.
                        </p>
                    </div>
                </div>

                {/* Tarjeta del Formulario */}
                <form
                    onSubmit={submit}
                    className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-sm rounded-xl p-8 space-y-6 transition-colors"
                >
                    <div className="grid gap-6">

                        {/* Campo: Nombre */}
                        <div className="space-y-2">
                            <Label
                                htmlFor="name"
                                className={errors.name ? "text-red-500" : "text-zinc-700 dark:text-zinc-300"}
                            >
                                Nombre de la Categoría
                            </Label>
                            <Input
                                id="name"
                                placeholder="Ej: Electrónica, Ropa, Hogar..."
                                value={data.name}
                                onChange={(e) => setData("name", e.target.value)}
                                className={`
                                    bg-transparent transition-colors
                                    ${errors.name
                                        ? "border-red-500 focus-visible:ring-red-500 bg-red-50/10"
                                        : "border-zinc-200 dark:border-zinc-800 focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-700"}
                                `}
                            />
                            {errors.name && (
                                <p className="text-xs font-medium text-red-500 animate-in fade-in slide-in-from-top-1">
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        {/* Campo: Descripción */}
                        <div className="space-y-2">
                            <Label
                                htmlFor="description"
                                className={errors.description ? "text-red-500" : "text-zinc-700 dark:text-zinc-300"}
                            >
                                Descripción
                            </Label>
                            <Textarea
                                id="description"
                                placeholder="Detalles sobre qué incluye esta categoría..."
                                value={data.description}
                                onChange={(e) => setData("description", e.target.value)}
                                className={`
                                    min-h-[120px] resize-none bg-transparent shadow-none
                                    ${errors.description
                                        ? "border-red-500 focus-visible:ring-red-500 bg-red-50/10"
                                        : "border-zinc-200 dark:border-zinc-800 focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-700"}
                                `}
                            />
                            {errors.description && (
                                <p className="text-xs font-medium text-red-500 animate-in fade-in slide-in-from-top-1">
                                    {errors.description}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Botones de Acción */}
                    <div className="flex justify-end items-center gap-3 pt-6 border-t border-zinc-100 dark:border-zinc-800">
                        <Button
                            type="button"
                            variant="outline"
                            asChild
                            disabled={processing}
                            className="dark:border-zinc-800 dark:hover:bg-zinc-900 dark:text-zinc-300"
                        >
                            <Link href={route('categories.index')}>Cancelar</Link>
                        </Button>

                        <Button
                            type="submit"
                            disabled={processing}
                            className="min-w-[140px] bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
                        >
                            {processing ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <Layers className="mr-2 h-4 w-4" />
                            )}
                            Guardar
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
