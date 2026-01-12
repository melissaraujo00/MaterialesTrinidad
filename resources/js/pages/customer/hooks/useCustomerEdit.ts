// hooks/useCustomerEdit.ts
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"; // <--- CAMBIO: Yup
import { customerSchema, CustomerFormData } from "@/schemas/customerSchema";
import { router } from "@inertiajs/react";
import { toast } from "sonner";
import { useEffect, useMemo } from "react";

interface Props {
    customer: any;
    departments: any[];
    municipalities: any[];
    districts: any[];
}

export const useCustomerEdit = ({ customer, departments, municipalities, districts }: Props) => {

    // 1. Configuración del Formulario con Yup
    const form = useForm<CustomerFormData>({
        resolver: yupResolver(customerSchema),
        defaultValues: {
            name: customer.name || "",
            email: customer.email || "",
            phoneNumber: customer.phoneNumber || "",
            nit: customer.nit || "",
            // Lógica para recuperar la ubicación anidada
            department_id: String(customer.district?.municipality?.department_id || customer.department_id || ""),
            municipality_id: String(customer.district?.municipality_id || customer.municipality_id || ""),
            district_id: String(customer.district_id || customer.district?.id || ""),
            address: customer.address || "",
            description: customer.description || "",
            status: customer.status || "activo",
        },
    });

    const { watch, setValue, formState: { dirtyFields }, setError } = form;

    // --- Lógica de Ubicación (Igual que en Create) ---
    const selectedDepartmentId = watch("department_id");
    const selectedMunicipalityId = watch("municipality_id");

    const filteredMunicipalities = useMemo(() => {
        if (!selectedDepartmentId) return [];
        return municipalities.filter((m) => String(m.department_id) === String(selectedDepartmentId));
    }, [selectedDepartmentId, municipalities]);

    const filteredDistricts = useMemo(() => {
        if (!selectedMunicipalityId) return [];
        return districts.filter((d) => String(d.municipality_id) === String(selectedMunicipalityId));
    }, [selectedMunicipalityId, districts]);

    // Reset inteligente (solo si se toca el campo)
    useEffect(() => {
        if (dirtyFields.department_id) {
            setValue("municipality_id", "");
            setValue("district_id", "");
        }
    }, [selectedDepartmentId, dirtyFields.department_id, setValue]);

    useEffect(() => {
        if (dirtyFields.municipality_id) {
            setValue("district_id", "");
        }
    }, [selectedMunicipalityId, dirtyFields.municipality_id, setValue]);

    // --- Envío ---
    const submit = (data: CustomerFormData) => {
        router.put(route("customers.update", customer.id), data as any, {
            onSuccess: () => toast.success("Cliente actualizado correctamente"),
            onError: (errors) => {
                toast.error("Error al actualizar, verifique los campos.");
                // Inyectar errores de Laravel a React Hook Form
                Object.keys(errors).forEach((field) => {
                    setError(field as any, { type: "server", message: errors[field] });
                });
            },
        });
    };

    return {
        form,
        submit: form.handleSubmit(submit),
        filteredMunicipalities,
        filteredDistricts,
        loading: form.formState.isSubmitting,
    };
};
