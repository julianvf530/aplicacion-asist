import type { Toast as ToastType } from "../types/Toast";

type ToastProps = {

    toast: ToastType;

};

export default function Toast({

    toast

}: ToastProps) {

    const colors = {

        success: "bg-green-600",

        error: "bg-red-600",

        info: "bg-blue-600"

    };

    return (

        <div

            className={`
                px-5
                py-3
                rounded-lg
                shadow-lg
                text-white
                ${colors[toast.type]}
            `}

        >

            {toast.message}

        </div>

    );

}