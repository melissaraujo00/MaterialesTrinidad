import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { productSchema, ProductFormData } from "@/schemas/productSchema";
import { router } from "@inertiajs/react";
import { toast } from "sonner";
import { useState } from "react";

export const useProductForm = () => {
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    // 1. Configuración de React Hook Form + Yup
    const form = useForm<ProductFormData>({
        resolver: yupResolver(productSchema),
        mode: "onChange", // Valida mientras escribes (importante para la imagen)
        defaultValues: {
            name: "",
            description: "",
            priceWithTax: undefined, // undefined para que el input numérico esté vacío visualmente
            discountPrice: 0,
            stock: undefined,
            stockMinimun: 5,
            category_id: "",
            brand_id: "",
            image: null,
        },
    });

    const { handleSubmit, setError, setValue } = form;

    // 2. Manejador de Imagen Manual (porque RHF no controla inputs de archivo nativamente igual que texto)
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setValue("image", file, { shouldValidate: true }); // Valida con Yup al instante
            setImagePreview(URL.createObjectURL(file));
        } else {
            setValue("image", null, { shouldValidate: true });
            setImagePreview(null);
        }
    };

    // 3. Envío al Backend (Laravel)
    const onValid = (data: ProductFormData) => {
        router.post(route("products.store"), data as any, {
            forceFormData: true, // CRÍTICO: Para subir archivos
            onSuccess: () => {
                toast.success("Producto creado con éxito");
                form.reset();
                setImagePreview(null);
            },
            onError: (serverErrors) => {
                // Mapear errores del servidor a los campos del formulario
                Object.keys(serverErrors).forEach((key) => {

                    setError(key as any, { type: "server", message: serverErrors[key] });
                });
                toast.error("Error al guardar. Revisa el formulario.");
            },
        });
    };

    const onInvalid = (errors: any) => {
        console.log("Errores de validación Yup:", errors);
        toast.warning("Por favor corrige los errores marcados.");
    };

    return {
        form,
        submit: handleSubmit(onValid, onInvalid),
        loading: form.formState.isSubmitting,
        imagePreview,
        handleImageChange,
        setImagePreview // Por si quieres borrar la imagen manualmente
    };
};
