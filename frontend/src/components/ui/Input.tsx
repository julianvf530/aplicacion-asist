import type { InputHTMLAttributes } from "react";


type InputProps = InputHTMLAttributes<HTMLInputElement>;


export default function Input({

    className = "",

    ...props

}: InputProps) {


    return (

        <input

            className={`
                w-full
                border
                border-gray-300
                rounded-lg
                px-3
                py-2
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
                ${className}
            `}

            {...props}

        />

    );

}