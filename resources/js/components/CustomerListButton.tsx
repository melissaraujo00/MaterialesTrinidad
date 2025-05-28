
interface Props {
    openModal: () => void;
}

export default function CustomerListButton({ openModal }: Props) {
    return (
        <button
            className="bg-green-600 text-white rounded px-2 py-1 text-sm hover:bg-green-700 transition flex items-center gap-1 mx-5"
            onClick={openModal}
        >
            Seleccionar Cliente
        </button>
    );
}