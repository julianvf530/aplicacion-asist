import type { ReactNode } from "react";


type PageContainerProps = {

    children: ReactNode;

};


export default function PageContainer({

    children

}: PageContainerProps) {


    return (

        <main

            className="
                min-h-screen
                bg-gray-100
                p-6
            "

        >

            <div

                className="
                    max-w-6xl
                    mx-auto
                "

            >

                {children}

            </div>


        </main>

    );

}