import { Head, Link } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useBrandEdit } from "./hooks/use-brand-edit";
import { Brand } from "@/types";
import { ArrowLeft, Loader2, Save } from "lucide-react";

interface Props {
    brand: Brand;
}

export default function Edit({ brand }: Props) {
    const { data, setData, submit, processing, errors } = useBrandEdit(brand);

    return (
        <AppLayout>
            <Head title={`Editar Marca: ${brand.name}`} />

            <div className="max-w-2xl mx-auto p-6 space-y-6">
                {/* Header dinámico */}
                <div className="flex items-center gap-4">
                    <Button
                        asChild
                        variant="ghost"
                        size="icon"
                        className="rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    >
                        <Link href="/brands">
                            <ArrowLeft className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
                        </Link>
                    </Button>
                    <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                        Editar Marca
                    </h2>
                </div>

                {/* Tarjeta del Formulario Adaptable */}
                <form
                    onSubmit={submit}
                    className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-sm rounded-xl p-8 space-y-6 transition-colors"
                >
                    <div className="space-y-4">
                        {/* Nombre de Marca */}
                        <div className="space-y-2">
                            <Label
                                htmlFor="name"
                                className={errors.name ? "text-red-500" : "text-zinc-700 dark:text-zinc-300"}
                            >
                                Nombre de Marca
                            </Label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(e) => setData("name", e.target.value)}
                                className={`
                                    bg-transparent transition-colors
                                    ${errors.name
                                        ? "border-red-500 focus-visible:ring-red-500"
                                        : "border-zinc-200 dark:border-zinc-800 focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-700"}
                                `}
                            />
                            {errors.name && (
                                <p className="text-xs font-medium text-red-500 animate-in fade-in slide-in-from-top-1">
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        {/* Descripción */}
                        <div className="space-y-2">
                            <Label
                                htmlFor="description"
                                className="text-zinc-700 dark:text-zinc-300"
                            >
                                Descripción
                            </Label>
                            <Textarea
                                id="description"
                                value={data.description}
                                onChange={(e) => setData("description", e.target.value)}
                                className="min-h-[120px] resize-none bg-transparent border-zinc-200 dark:border-zinc-800 shadow-none focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-700"
                            />
                            {errors.description && (
                                <p className="text-xs font-medium text-red-500">{errors.description}</p>
                            )}
                        </div>
                    </div>

                    {/* Footer del Formulario */}
                    <div className="flex justify-end gap-3 pt-6 border-t border-zinc-100 dark:border-zinc-800">
                        <Button
                            type="button"
                            variant="outline"
                            asChild
                            disabled={processing}
                            className="dark:border-zinc-800 dark:hover:bg-zinc-900 dark:text-zinc-300"
                        >
                            <Link href="/brands">Cancelar</Link>
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
