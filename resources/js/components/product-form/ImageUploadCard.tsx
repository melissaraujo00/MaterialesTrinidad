import { Image as ImageIcon, Upload, AlertCircle } from "lucide-react";


interface Props {
    imagePreview: string | null;
    onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onRemoveImage: () => void;
    error?: string;
}

export const ImageUploadCard = ({ imagePreview, onImageChange, onRemoveImage, error }: Props) => {
    return (
        <div className={`bg-white dark:bg-zinc-950 border rounded-xl p-6 shadow-sm space-y-4 ${error ? 'border-red-500' : 'border-zinc-200 dark:border-zinc-800'}`}>
            <h3 className="font-semibold text-lg flex items-center gap-2 text-zinc-900 dark:text-zinc-100">
                <ImageIcon className="h-5 w-5 text-purple-600" /> Imagen
            </h3>

            <div className="relative overflow-hidden border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-lg p-4 flex flex-col items-center justify-center hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
                {imagePreview ? (
                    <div className="relative w-full aspect-square">
                        <img src={imagePreview} alt="Preview" className="w-full h-full object-contain rounded-md" />
                        <button
                            type="button"
                            onClick={onRemoveImage}
                            className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full hover:bg-red-700 transition"
                        >✕</button>
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <Upload className="h-10 w-10 text-zinc-400 mx-auto mb-2" />
                        <p className="text-sm text-zinc-500">Click para subir</p>
                        <p className="text-xs text-zinc-400 mt-1">JPG, PNG &lt; 2MB</p>
                    </div>
                )}
                {/* Nota: el input file siempre debe estar disponible para ser clickeado a menos que haya preview cubriendo todo */}
                <input id="image-upload" type="file" accept="image/*" onChange={onImageChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
            </div>

            {error && (
                <div className="flex items-center gap-2 text-red-600 text-xs font-medium p-2 bg-red-50 rounded">
                    <AlertCircle className="h-4 w-4" /> {error}
                </div>
            )}
        </div>
    );
};
