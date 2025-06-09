import { ShoppingCart } from "lucide-react";



export default function ShoppingCarButton() {
    return (
        <button
            className="bg-green-600 text-white rounded px-2 py-1 text-sm hover:bg-green-700 transition flex items-center gap-1   "
            
            >
           <ShoppingCart className="w-4 h-4" />
            agregar cotizacion
        </button>
    );
}