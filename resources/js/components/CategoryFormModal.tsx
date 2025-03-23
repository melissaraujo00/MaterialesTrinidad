import { useState, useEffect } from "react";
import { router } from "@inertiajs/react";
import { toast } from "sonner";

interface Category {
  id?: number;
  name: string;
  description: string;
}

interface Props {
  isOpen: boolean;
  closeModal: () => void;
  category?: Category | null;
}

export default function CategoryFormModal({ isOpen, closeModal, category }: Props) {
  const [formData, setFormData] = useState<Category>({
    name: "",
    description: ""
  });

  const [isDuplicate, setIsDuplicate] = useState(false);  // Para manejar el estado de duplicado
  const [isInvalidName, setIsInvalidName] = useState(false); // Para manejar el estado de nombre inválido
  const [isShortName, setIsShortName] = useState(false);  // Para manejar el estado de nombre corto
  const [isShortDescription, setIsShortDescription] = useState(false);  // Para manejar el estado de descripción corta

  useEffect(() => {
    if (category) {
      setFormData({ name: category.name, description: category.description });
    } else {
      setFormData({ name: "", description: "" });
    }
  }, [category]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "name") {
      // Validar nombre con solo letras y al menos 3 caracteres
      const nameRegex = /^[A-Za-z\s]+$/;
      const nameIsValid = nameRegex.test(value);
      setIsInvalidName(!nameIsValid);
      setIsShortName(value.length < 3);
      
      if (nameIsValid && value.length >= 3) {
        checkCategoryDuplicate(value);  // Verificar duplicado solo si el nombre es válido
      } else {
        setIsDuplicate(false);  // No se verifica duplicado si el nombre es inválido
      }
    }

    if (name === "description") {
      setIsShortDescription(value.length < 3); // Validar descripción de al menos 3 caracteres
    }
  };

  // Verifica si la categoría ya existe
  const checkCategoryDuplicate = async (name: string) => {
    const response = await fetch(`/categories/check-duplicate?name=${name}`);
    const data = await response.json();
    setIsDuplicate(data.exists);  // Actualiza el estado para indicar si es duplicado
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validaciones previas antes de enviar
    if (isDuplicate) {
      toast.error("¡Esta categoría ya existe!");
      return;  // No enviar el formulario si el nombre es duplicado
    }

    if (isInvalidName) {
      toast.error("El nombre de la categoría solo debe contener letras.");
      return;  // No enviar el formulario si el nombre es inválido
    }

    if (isShortName) {
      toast.error("El nombre debe tener al menos 3 caracteres.");
      return;  // No enviar el formulario si el nombre es demasiado corto
    }

    if (isShortDescription) {
      toast.error("La descripción debe tener al menos 3 caracteres.");
      return;  // No enviar el formulario si la descripción es demasiado corta
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);

    const successMessage = category?.id ? "Categoría actualizada correctamente" : "Categoría creada correctamente";
    const errorMessage = category?.id ? "Error al actualizar la categoría" : "La categoría ya existe.";

    if (category?.id) {
      data.append("_method", "PUT");
      router.post(`/categories/${category.id}`, data, {
        onSuccess: () => {
          toast.success(successMessage);
          closeModalAndClear();  // Limpiar los campos y cerrar el modal
          router.reload();
        },
        onError: (errors) => {
          toast.error(errorMessage);
          console.error(errors.message || "Error al enviar la categoría.");
        },
      });
    } else {
      router.post("/categories", data, {
        onSuccess: () => {
          toast.success(successMessage);
          closeModalAndClear();  // Limpiar los campos y cerrar el modal
          router.reload();
        },
        onError: (errors) => {
          toast.error(errorMessage);
          console.error(errors.message || "Error al enviar la categoría.");
        },
      });
    }
  };

  const closeModalAndClear = () => {
    setFormData({ name: "", description: "" }); // Limpiar los campos
    closeModal();  // Cerrar el modal
  };

  const handleCancel = () => {
    setFormData({ name: "", description: "" }); // Limpiar los campos
    closeModal();  // Cerrar el modal
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl dark:bg-gray-800 dark:text-white">
        <h2 className="text-lg text-gray-950 font-semibold mb-4 dark:text-white">
          {category ? "Editar categoría" : "Agregar categoría"}
        </h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-3">
            <label className="block text-gray-950 text-sm font-medium dark:text-gray-300">Nombre de la categoría</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full border rounded p-2 text-gray-950 dark:bg-gray-700 dark:text-white ${isDuplicate || isInvalidName || isShortName ? 'border-red-500' : ''}`}
              required
            />
            {isDuplicate && <p className="text-red-500 text-xs mt-1">¡Esta categoría ya existe!</p>}
            {isInvalidName && <p className="text-red-500 text-xs mt-1">El nombre solo debe contener letras.</p>}
            {isShortName && <p className="text-red-500 text-xs mt-1">El nombre debe tener al menos 3 caracteres.</p>}
          </div>
          <div className="mb-3">
            <label className="block text-gray-950 text-sm font-medium dark:text-gray-300">Descripción</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={`w-full border rounded p-2 text-gray-950 dark:bg-gray-700 dark:text-white ${isShortDescription ? 'border-red-500' : ''}`}
              required
            />
            {isShortDescription && <p className="text-red-500 text-xs mt-1">La descripción debe tener al menos 3 caracteres.</p>}
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-500"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400"
            >
              {category ? "Actualizar" : "Crear"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
