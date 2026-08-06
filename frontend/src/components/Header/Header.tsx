import { NavLink } from "react-router-dom";

export default function Header() {

    const links = [

        {
            name: "Ensayo",
            path: "/attendance"
        },

        {
            name: "Historial",
            path: "/history"
        },

        {
            name: "Miembros",
            path: "/members"
        },

        {
            name: "Estadísticas",
            path: "/statistics"
        }

    ];


    return (

        <header
            className="
                bg-white
                shadow
            "
        >

            <div
                className="
                    max-w-7xl
                    mx-auto
                    px-4
                    md:px-6
                    py-4

                    flex
                    flex-col
                    md:flex-row

                    gap-4

                    md:justify-between
                    md:items-center
                "
            >

                <NavLink
                    to="/"
                    className="
                        flex
                        flex-col
                        items-center
                        md:items-start
                    "
                >

                    <span
                        className="
                            text-lg
                            md:text-xl
                            font-bold
                        "
                    >
                        🎵 Asistencia Olga
                    </span>

                    <span
                        className="
                            text-xs
                            md:text-sm
                            text-gray-500
                        "
                    >
                        Control de ensayos
                    </span>

                </NavLink>


                <nav
                    className="
                        flex
                        flex-wrap
                        justify-center
                        gap-4
                        md:gap-6
                    "
                >

                    {
                        links.map((link) => (

                            <NavLink
                                key={link.path}
                                to={link.path}
                                className={({ isActive }) => `
                                    font-medium
                                    transition
                                    whitespace-nowrap

                                    ${
                                        isActive
                                            ? "text-blue-600"
                                            : "text-gray-700 hover:text-blue-600"
                                    }
                                `}
                            >

                                {link.name}

                            </NavLink>

                        ))
                    }

                </nav>

            </div>

        </header>

    );

}