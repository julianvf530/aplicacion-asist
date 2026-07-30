import { useNavigate } from "react-router-dom";

import Card from "../../components/ui/Card";
import PageContainer from "../../components/ui/PageContainer";

import { useMembers } from "../../hooks/useMembers";
import { useEnsayos } from "../../hooks/useEnsayos";

export default function Home() {

    const navigate = useNavigate();

    const { members } = useMembers();
    const { ensayos } = useEnsayos();

    const options = [
        {
            title: "Registrar ensayo",
            description: "Crear un nuevo registro de asistencia",
            path: "/attendance",
            icon: "📝"
        },
        {
            title: "Miembros",
            description: "Gestionar los miembros de la banda",
            path: "/members",
            icon: "👥"
        },
        {
            title: "Historial",
            description: "Consultar ensayos anteriores",
            path: "/history",
            icon: "📜"
        },
        {
            title: "Estadísticas",
            description: "Consultar datos de asistencia",
            path: "/statistics",
            icon: "📊"
        }
    ];

    const ultimoEnsayo =
        ensayos.length > 0
            ? ensayos[ensayos.length - 1]
            : null;

    return (

        <PageContainer>

            <div className="mb-10">

                <h1
                    className="
                        text-3xl
                        font-bold
                        mb-2
                    "
                >
                    Control de asistencia
                </h1>

                <p className="text-gray-600">
                    Gestiona los ensayos y miembros de la banda
                </p>

            </div>

            <div
                className="
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    gap-6
                "
            >

                {options.map((option) => (

                    <Card
                        key={option.path}
                        className="
                            cursor-pointer
                            hover:shadow-xl
                            hover:-translate-y-1
                            transition-all
                            duration-200
                        "
                    >

                        <div
                            onClick={() => navigate(option.path)}
                        >

                            <div
                                className="
                                    text-5xl
                                    mb-4
                                "
                            >
                                {option.icon}
                            </div>

                            <h2
                                className="
                                    text-xl
                                    font-bold
                                    mb-2
                                "
                            >
                                {option.title}
                            </h2>

                            <p className="text-gray-600">
                                {option.description}
                            </p>

                        </div>

                    </Card>

                ))}

            </div>

            <div
                className="
                    mt-10
                    border-t
                    border-gray-200
                    pt-6
                "
            >

                <p
                    className="
                        text-sm
                        text-gray-500
                        mb-4
                    "
                >
                    Resumen
                </p>

                <div
                    className="
                        flex
                        flex-wrap
                        gap-8
                        text-sm
                        text-gray-600
                    "
                >

                    <div>

                        👥

                        <span className="ml-1 font-semibold text-gray-900">
                            {members.length}
                        </span>

                        {" "}miembros

                    </div>

                    <div>

                        📅

                        <span className="ml-1 font-semibold text-gray-900">
                            {ensayos.length}
                        </span>

                        {" "}ensayos registrados

                    </div>

                    <div>

                        🕒 Último ensayo:

                        <span className="ml-1 font-semibold text-gray-900">

                            {
                                ultimoEnsayo
                                    ? ultimoEnsayo.fecha
                                    : "Sin datos"
                            }

                        </span>

                    </div>

                </div>

            </div>

        </PageContainer>

    );

}