import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { ProductFormData } from "@/schemas/productSchema";

export const PricingCard = ({ form }: { form: UseFormReturn<ProductFormData> }) => {
    const { register, formState: { errors } } = form;

    return (
        <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-4">
            <h3 className="font-semibold text-lg text-zinc-900 dark:text-zinc-100">Precio e Inventario</h3>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label className={errors.priceWithTax && "text-red-500"}>Precio *</Label>
                    <Input type="number" step="0.01" {...register("priceWithTax")} className={errors.priceWithTax && "border-red-500 bg-red-50/10"} />
                    {errors.priceWithTax && <p className="text-xs text-red-500">{errors.priceWithTax.message}</p>}
                </div>
                <div className="space-y-2">
                    <Label>Descuento</Label>
                    <Input type="number" step="0.01" {...register("discountPrice")} />
                </div>
                <div className="space-y-2">
                    <Label className={errors.stock && "text-red-500"}>Stock *</Label>
                    <Input type="number" {...register("stock")} className={errors.stock && "border-red-500 bg-red-50/10"} />
                    {errors.stock && <p className="text-xs text-red-500">{errors.stock.message}</p>}
                </div>
                <div className="space-y-2">
                    <Label className={errors.stockMinimun && "text-red-500"}>Mínimo *</Label>
                    <Input type="number" {...register("stockMinimun")} className={errors.stockMinimun && "border-red-500 bg-red-50/10"} />
                    {errors.stockMinimun && <p className="text-xs text-red-500">{errors.stockMinimun.message}</p>}
                </div>
            </div>
        </div>
    );
};
