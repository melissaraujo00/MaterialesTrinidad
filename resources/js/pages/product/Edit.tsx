import React from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Button } from "@/components/ui/button";
import { Loader2, Save } from "lucide-react";
import { useProductEdit } from "./hooks/useProductEdit";


// ¡REUTILIZACIÓN TOTAL! Importamos los mismos componentes
import { ProductHeader } from "@/components/product-form/ProductHeader";
import { GeneralInfoCard } from "@/components/product-form/GeneralInfoCard";
import { PricingCard } from "@/components/product-form/PricingCard";
import { ImageUploadCard } from "@/components/product-form/ImageUploadCard";

// Tipado básico para lo que viene de Inertia
interface Props {
    product: any; // O tu interfaz Product completa
    categories: { id: number; name: string }[];
    brands: { id: number; name: string }[];
}

export default function ProductEdit() {
    // 1. Obtener datos de Inertia
    const { product, categories, brands } = usePage<Props>().props;

    // 2. Inicializar Hook de Edición
    const {
        form,
        submit,
        loading,
        imagePreview,
        handleImageChange,
        setImagePreview
    } = useProductEdit(product);

    // Helper para limpiar imagen (UI Logic)
    // Nota: Dependiendo de tu backend, esto podría requerir un campo extra "delete_image"
    // Por ahora mantenemos la lógica visual de limpiar el preview.
    const handleRemoveImage = () => {
        form.setValue("image", null, { shouldValidate: true });
        setImagePreview(null);
        const el = document.getElementById('image-upload') as HTMLInputElement;
        if(el) el.value = "";
    };

    return (
        <AppLayout>
            <Head title={`Editar ${product.name}`} />

            <div className="max-w-4xl mx-auto p-6">

                {/* Header Dinámico */}
                <ProductHeader
                    title={`Editar: ${product.name}`}
                    subtitle="Actualiza la información del producto existente."
                />

                <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* COLUMNA IZQUIERDA: Reutilizamos las mismas cards */}
                    <div className="md:col-span-2 space-y-6">
                        <GeneralInfoCard
                            form={form}
                            categories={categories}
                            brands={brands}
                        />

                        <PricingCard form={form} />
                    </div>

                    {/* COLUMNA DERECHA */}
                    <div className="space-y-6">
                        <ImageUploadCard
                            imagePreview={imagePreview}
                            onImageChange={handleImageChange}
                            onRemoveImage={handleRemoveImage}
                            error={form.formState.errors.image?.message as string}
                        />

                        {/* Botones de Acción */}
                        <div className="flex flex-col gap-3">
                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 transition-all"
                            >
                                {loading ? (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                ) : (
                                    <Save className="mr-2 h-4 w-4" />
                                )}
                                Actualizar Producto
                            </Button>

                            <Button variant="outline" asChild className="w-full dark:border-zinc-800 dark:text-zinc-300">
                                <Link href={route('products.index')}>Cancelar</Link>
                            </Button>
                        </div>
                    </div>

                </form>
            </div>
        </AppLayout>
    );
}
