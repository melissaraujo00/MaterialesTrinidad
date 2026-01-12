import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { productSchema, ProductFormData } from "@/schemas/productSchema";
import { router } from "@inertiajs/react";
import { toast } from "sonner";
import { useState } from "react";

// Definimos la interfaz del Producto que viene de la BD
interface Product {
    id: number;
    name: string;
    description: string | null;
    priceWithTax: number;
    discountPrice: number;
    stock: number;
    stockMinimun: number;
    category_id: number | string;
    brand_id: number | string | null;
    image: string | null;
}

export const useProductEdit = (product: Product) => {
    // Estado para preview: Primero intenta la nueva imagen, sino la de la BD
    const [imagePreview, setImagePreview] = useState<string | null>(product.image);

    const form = useForm<ProductFormData>({
        resolver: yupResolver(productSchema),
        mode: "onChange",
        defaultValues: {
            name: product.name,
            description: product.description || "",
            // Aseguramos que sean números o undefined
            priceWithTax: Number(product.priceWithTax),
            discountPrice: Number(product.discountPrice),
            stock: Number(product.stock),
            stockMinimun: Number(product.stockMinimun),
            // Convertimos IDs a string para que los Selects funcionen bien
            category_id: String(product.category_id),
            brand_id: product.brand_id ? String(product.brand_id) : "",
            image: null, // En edición inicia null (significa "no cambiar imagen")
        },
    });

    const { handleSubmit, setError, setValue } = form;

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setValue("image", file, { shouldValidate: true });
            setImagePreview(URL.createObjectURL(file)); // Muestra la nueva
        } else {
            // Si cancela, no reseteamos a null el valor, sino que dejamos el previo?
            // Mejor estrategia: si cancela selección, no hacemos nada o volvemos a null
        }
    };

    const onValid = (data: ProductFormData) => {
        // Truco para enviar archivos en edición con Laravel
        router.post(route("products.update", product.id), {
            ...data,
            _method: "PUT", // <--- IMPORTANTE
        } as any, {
            forceFormData: true,
            onSuccess: () => {
                toast.success("Producto actualizado correctamente");
            },
            onError: (serverErrors) => {
                Object.keys(serverErrors).forEach((key) => {
                    setError(key as any, { type: "server", message: serverErrors[key] });
                });
                toast.error("No se pudo actualizar el producto.");
            },
        });
    };

    const onInvalid = (errors: any) => {
        console.log("Errores de validación:", errors);
        toast.warning("Por favor corrige los campos marcados.");
    };

    return {
        form,
        submit: handleSubmit(onValid, onInvalid),
        loading: form.formState.isSubmitting,
        imagePreview,
        handleImageChange,
        setImagePreview
    };
};
