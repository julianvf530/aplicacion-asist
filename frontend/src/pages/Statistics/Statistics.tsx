import { useStatistics } from "../../hooks/useStatistics";

import PageContainer from "../../components/ui/PageContainer";
import Card from "../../components/ui/Card";

export default function Statistics() {

    const { statistics } = useStatistics();


    if (!statistics) {

        return (

            <PageContainer>

                <h1
                    className="
                        text-3xl
                        font-bold
                        mb-6
                    "
                >
                    Estadísticas
                </h1>

                <p>Cargando estadísticas...</p>

            </PageContainer>

        );

    }


    return (

        <PageContainer>

            <h1
                className="
                    text-3xl
                    font-bold
                    mb-8
                "
            >
                Estadísticas
            </h1>


            <div
                className="
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    xl:grid-cols-3
                    gap-6
                "
            >

                <Card>

                    <p className="text-gray-500">
                        📅 Ensayos realizados
                    </p>

                    <p className="text-4xl font-bold mt-2">
                        {statistics.ensayosRealizados}
                    </p>

                </Card>


                <Card>

                    <p className="text-gray-500">
                        ✅ Asistencias
                    </p>

                    <p
                        className="
                            text-4xl
                            font-bold
                            text-green-600
                            mt-2
                        "
                    >
                        {statistics.totalAsistencias}
                    </p>

                </Card>


                <Card>

                    <p className="text-gray-500">
                        ❌ Ausencias
                    </p>

                    <p
                        className="
                            text-4xl
                            font-bold
                            text-red-600
                            mt-2
                        "
                    >
                        {statistics.totalAusencias}
                    </p>

                </Card>


                <Card>

                    <p className="text-gray-500">
                        📊 Asistencia media
                    </p>

                    <p
                        className="
                            text-4xl
                            font-bold
                            text-blue-600
                            mt-2
                        "
                    >
                        {statistics.porcentajeAsistencia}%
                    </p>

                </Card>


                <Card>

                    <p className="text-gray-500">
                        🥇 Más asistencias
                    </p>

                    {

                        statistics.mejorAsistencia ? (

                            <>

                                <p
                                    className="
                                        text-xl
                                        font-bold
                                        mt-2
                                    "
                                >
                                    {statistics.mejorAsistencia.nombre}
                                </p>

                                <p className="text-gray-600">
                                    {statistics.mejorAsistencia.total} asistencias
                                </p>

                            </>

                        ) : (

                            <p className="mt-2">
                                Sin datos
                            </p>

                        )

                    }

                </Card>


                <Card>

                    <p className="text-gray-500">
                        🚫 Más ausencias
                    </p>

                    {

                        statistics.masAusencias ? (

                            <>

                                <p
                                    className="
                                        text-xl
                                        font-bold
                                        mt-2
                                    "
                                >
                                    {statistics.masAusencias.nombre}
                                </p>

                                <p className="text-gray-600">
                                    {statistics.masAusencias.total} ausencias
                                </p>

                            </>

                        ) : (

                            <p className="mt-2">
                                Sin datos
                            </p>

                        )

                    }

                </Card>

            </div>

        </PageContainer>

    );

}