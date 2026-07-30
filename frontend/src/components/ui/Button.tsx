import type { ButtonHTMLAttributes, ReactNode } from "react";


type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {

    children: ReactNode;

    variant?: "primary" | "danger" | "secondary";

};


export default function Button({

    children,

    variant = "primary",

    className = "",

    ...props

}: ButtonProps) {


    const styles = {

        primary:
            "bg-blue-600 hover:bg-blue-700 text-white",

        danger:
            "bg-red-600 hover:bg-red-700 text-white",

        secondary:
            "bg-gray-200 hover:bg-gray-300 text-gray-800"

    };


    return (

        <button

            className={`
                px-4
                py-2
                rounded-lg
                font-medium
                transition
                ${styles[variant]}
                ${className}
            `}

            {...props}

        >

            {children}

        </button>

    );

}