import {

    createContext,

    useState,

    type ReactNode

} from "react";

import Toast from "../components/Toast";

import type {

    Toast as ToastType,

    ToastType as Type

} from "../types/Toast";

type ToastContextType = {

    showToast: (

        message: string,

        type?: Type

    ) => void;

};

export const ToastContext =

    createContext<ToastContextType>(

        {} as ToastContextType

    );

export function ToastProvider({

    children

}: {

    children: ReactNode

}) {

    const [toasts, setToasts] =

        useState<ToastType[]>([]);

    function showToast(

        message: string,

        type: Type = "success"

    ) {

        const toast = {

            id: Date.now(),

            message,

            type

        };

        setToasts(prev => [

            ...prev,

            toast

        ]);

        setTimeout(() => {

            setToasts(prev =>

                prev.filter(

                    t => t.id !== toast.id

                )

            );

        },3000);

    }

    return (

        <ToastContext.Provider

            value={{

                showToast

            }}

        >

            {children}

            <div

                className="
                    fixed
                    top-5
                    right-5
                    flex
                    flex-col
                    gap-3
                    z-50
                "

            >

                {

                    toasts.map(

                        toast =>

                            <Toast

                                key={toast.id}

                                toast={toast}

                            />

                    )

                }

            </div>

        </ToastContext.Provider>

    );

}