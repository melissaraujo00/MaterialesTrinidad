import { router } from "@inertiajs/react";
import { toast } from "sonner";

interface Category {
    id: number;
    name: string;
    description: string;
}

interface Props {
    isOpen: boolean,
    closeModal: () => void,
    category: Category | null
}

export default function DeleteCategoryModal({ isOpen, closeModal, category }: Props) {
    if (!isOpen || !category) return null;

    const handleDelete = () => {
        router.delete(`/categories/${category.id}`, {
            onSuccess: () => {
                toast.success('categoria eliminada conrrectamente')
                closeModal()
                window.location.reload();
            },
            onError: (errors) => {
                console.error("error al eliminar categoria:", errors)
                toast.error("error al eliminar la categoria")
            }
        })
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-400/40  z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md dark:bg-gray-800 dark:text-white">
                <h2 className="text-lg text-gray-950 font-semibold mb-4 dark:text-white">
                    Confirmar eliminación
                </h2>
                <p className="mb-6 text-gray-700 dark:text-gray-300">
                    ¿Estás seguro que deseas eliminar la categoria <span className="font-bold">{category.name}</span>?
                    <br />
                    Esta acción no se puede deshacer.
                </p>
                <div className="flex justify-end gap-2">
                    <button
                        type="button"
                        onClick={closeModal}
                        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-500"
                    >
                        Cancelar
                    </button>
                    <button
                        type="button"
                        onClick={handleDelete}
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-400"
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    )


}