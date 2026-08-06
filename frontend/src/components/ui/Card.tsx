import type { ReactNode } from "react";


type CardProps = {

    children: ReactNode;

    className?: string;

};


export default function Card({

    children,

    className = ""

}: CardProps) {


    return (

        <div
            className={`
                bg-white
                rounded-xl
                shadow-md
                p-4
                md:p-5
                ${className}
            `}
        >

            {children}

        </div>

    );

}