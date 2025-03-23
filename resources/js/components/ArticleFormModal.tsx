import { useState } from "react";


// Define las propiedades que recibe el componente
interface CategoryFormModalProps {
  isOpen: boolean;
  closeModal: () => void;
  category: { id?: number; name: string; description: string } | null;
}

export default function CategoryFormModal({ isOpen, closeModal, category }: CategoryFormModalProps) {
  const [name, setName] = useState(category?.name || "");
  const [description, setDescription] = useState(category?.description || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Categoría guardada:", { name, description });
    closeModal();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">{category ? "Edit Category" : "Add Category"}</h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input 
            type="text" 
            placeholder="Category Name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            className="border p-2 rounded"
            required
          />
          <textarea 
            placeholder="Description" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            className="border p-2 rounded"
            required
          />
          <div className="flex justify-end gap-2">
            <button type="button" onClick={closeModal} className="bg-gray-500 text-white px-3 py-1 rounded">
              Cancel
            </button>
            <button type="submit" className="bg-green-600 text-white px-3 py-1 rounded">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
