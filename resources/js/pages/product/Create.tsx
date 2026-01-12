import React from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useProductForm } from "./hooks/useProductForm";

// Sub-componentes importados
import { ProductHeader } from "@/components/product-form/ProductHeader";
import { GeneralInfoCard } from "@/components/product-form/GeneralInfoCard";
import { PricingCard } from "@/components/product-form/PricingCard";
import { ImageUploadCard } from "@/components/product-form/ImageUploadCard";

interface Category { id: number; name: string; }
interface Brand { id: number; name: string; }

export default function ProductCreate() {
    const { categories, brands } = usePage<{ categories: Category[], brands: Brand[] }>().props;

    // Desestructuramos el hook.
    // Nota: Extraemos 'form' completo para pasarlo a los hijos.
    const {
        form,
        submit,
        loading,
        imagePreview,
        handleImageChange,
        setImagePreview // Necesario para la función de reset manual abajo
    } = useProductForm();

    // Pequeño helper para limpiar la imagen (Lógica de UI)
    const handleRemoveImage = () => {
        form.setValue("image", null, { shouldValidate: true });
        setImagePreview(null);
        const el = document.getElementById('image-upload') as HTMLInputElement;
        if(el) el.value = "";
    };

    return (
        <AppLayout>
            <Head title="Crear Producto" />

            <div className="max-w-4xl mx-auto p-6">

                <ProductHeader />

                <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* COLUMNA IZQUIERDA: Datos Principales */}
                    <div className="md:col-span-2 space-y-6">
                        <GeneralInfoCard
                            form={form}
                            categories={categories}
                            brands={brands}
                        />
                        <PricingCard form={form} />
                    </div>

                    {/* COLUMNA DERECHA: Multimedia y Acciones */}
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
                                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Guardar Producto
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
