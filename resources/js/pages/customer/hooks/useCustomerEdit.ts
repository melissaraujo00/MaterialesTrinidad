import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
    // 1. Configuramos los valores por defecto
    // Usamos el operador ?. (optional chaining) por si las relaciones no vienen cargadas
    const form = useForm<CustomerFormData>({
        resolver: zodResolver(customerSchema),
        defaultValues: {
            name: customer.name || "",
            email: customer.email || "",
            phoneNumber: customer.phoneNumber || "",
            nit: customer.nit || "",
            // Aquí obtenemos los IDs de los padres a través de las relaciones
            department_id: String(customer.district?.municipality?.department_id || customer.department_id || ""),
            municipality_id: String(customer.district?.municipality_id || customer.municipality_id || ""),
            district_id: String(customer.district_id || customer.district?.id || ""), // Intentamos varias formas
            address: customer.address || "",
            description: customer.description || "",
            status: customer.status || "activo",
        },
    });

    const { watch, setValue, formState: { dirtyFields } } = form;

    // Obtenemos valores en tiempo real
    const selectedDepartmentId = watch("department_id");
    const selectedMunicipalityId = watch("municipality_id");

    // 2. Filtrado de listas (Memoizado para rendimiento)
    const filteredMunicipalities = useMemo(() => {
        if (!selectedDepartmentId) return [];
        return municipalities.filter((m) => String(m.department_id) === String(selectedDepartmentId));
    }, [selectedDepartmentId, municipalities]);

    const filteredDistricts = useMemo(() => {
        if (!selectedMunicipalityId) return [];
        return districts.filter((d) => String(d.municipality_id) === String(selectedMunicipalityId));
    }, [selectedMunicipalityId, districts]);


    // 3. Reset inteligente de hijos
    // SOLO si el usuario tocó el campo (dirtyFields), limpiamos los hijos.
    // Esto evita que se borren los datos al cargar la página por primera vez.

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


    // 4. Envío del formulario
    const submit = (data: CustomerFormData) => {
        router.put(route("customers.update", customer.id), data as any, {
            onSuccess: () => toast.success("Cliente actualizado correctamente"),
            onError: (errors) => {
                toast.error("Error al actualizar");
                console.error(errors);
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
