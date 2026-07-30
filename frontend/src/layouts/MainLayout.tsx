import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";


export default function MainLayout(){

    return (

        <div
            className="
                min-h-screen
                bg-gray-100
            "
        >


            <Header />


            <main
                className="
                    max-w-7xl
                    mx-auto
                    px-6
                    py-6
                "
            >

                <Outlet />

            </main>


        </div>

    );

}