import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';


interface Quote {
    id: number;
    total: number;
    date: Date;
    status: string;
    customer?: {
        name: string;
    };
}

interface ConfirmQuoteModalProps {
    isOpen: boolean;
    closeModal: () => void;
    quote: Quote | null;
    onConfirm: (quoteId: number) => void;
    isLoading?: boolean;
}

export default function ConfirmQuoteModal({ 
    isOpen, 
    closeModal, 
    quote, 
    onConfirm, 
    isLoading = false 
}: ConfirmQuoteModalProps) {
    
    const handleConfirm = () => {
        if (quote) {
            onConfirm(quote.id);
        }
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0   bg-gray-400/80 bg-opacity-40" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-gray-800">
                                <div className="flex items-center gap-4 mb-4">
                                    
                                    <div>
                                        <Dialog.Title
                                            as="h3"
                                            className="text-lg font-medium leading-6 text-gray-900 dark:text-white"
                                        >
                                            Confirmar Cotización
                                        </Dialog.Title>
                                    </div>
                                </div>

                                <div className="mt-2">
                                    <p className="text-sm text-gray-500 dark:text-gray-300 mb-4">
                                        ¿Estás seguro de que quieres confirmar esta cotización? Esta acción cambiará el estado de la cotización a "Confirmada".
                                    </p>
                                    
                                    {quote && (
                                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4">
                                            <div className="space-y-2">
                                                <div className="flex justify-between">
                                                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                                                        Cotización #:
                                                    </span>
                                                    <span className="text-sm text-gray-900 dark:text-white">
                                                        {quote.id}
                                                    </span>
                                                </div>
                                                {quote.customer && (
                                                    <div className="flex justify-between">
                                                        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                                                            Cliente:
                                                        </span>
                                                        <span className="text-sm text-gray-900 dark:text-white">
                                                            {quote.customer.name}
                                                        </span>
                                                    </div>
                                                )}
                                                <div className="flex justify-between">
                                                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                                                        Total:
                                                    </span>
                                                    <span className="text-sm text-gray-900 dark:text-white">
                                                        ${quote.total.toLocaleString()}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                                                        Estado actual:
                                                    </span>
                                                    <span className="text-sm">
                                                        <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded dark:bg-red-900 dark:text-red-300">
                                                            {quote.status}
                                                        </span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="mt-6 flex gap-3 justify-end">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600"
                                        onClick={closeModal}
                                        disabled={isLoading}
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                        onClick={handleConfirm}
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Confirmando...
                                            </>
                                        ) : (
                                            'Confirmar Cotización'
                                        )}
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}