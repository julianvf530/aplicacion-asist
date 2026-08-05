import { useStatistics } from "../../hooks/useStatistics";

import PageContainer from "../../components/ui/PageContainer";
import Card from "../../components/ui/Card";


export default function Statistics() {


    const {
        attendance,
        warnings
    } = useStatistics();



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

            <Card>

                <h2
                    className="
                        text-2xl
                        font-bold
                        mb-5
                    "
                >
                    ⚠️ Menos del 80% el último mes
                </h2>



                {
                    warnings.length === 0 ? (

                        <p>
                            No hay miembros con baja asistencia.
                        </p>

                    ) : (


                        <div
                            className="
                                overflow-x-auto
                            "
                        >

                            <table
                                className="
                                    w-full
                                    text-left
                                "
                            >

                                <thead>

                                    <tr
                                        className="
                                            border-b
                                        "
                                    >

                                        <th>
                                            Nº
                                        </th>

                                        <th>
                                            Nombre
                                        </th>

                                        <th>
                                            Categoría
                                        </th>

                                        <th>
                                            Asistencia
                                        </th>

                                    </tr>

                                </thead>



                                <tbody>

                                    {
                                        warnings.map((member)=>(

                                            <tr
                                                key={member.id}
                                                className="
                                                    border-b
                                                "
                                            >

                                                <td>
                                                    {member.numero}
                                                </td>


                                                <td>
                                                    {member.nombre}
                                                </td>


                                                <td>
                                                    {member.categoria}
                                                </td>


                                                <td
                                                    className="
                                                        text-red-600
                                                        font-bold
                                                    "
                                                >
                                                    {member.porcentaje}%
                                                </td>


                                            </tr>

                                        ))
                                    }


                                </tbody>


                            </table>


                        </div>

                    )

                }


            </Card>
            
             <Card
                className="
                    mb-8
                "
            >

                <h2
                    className="
                        text-2xl
                        font-bold
                        mb-5
                    "
                >
                    📊 Porcentaje de asistencia
                </h2>



                <div
                    className="
                        overflow-x-auto
                    "
                >

                    <table
                        className="
                            w-full
                            text-left
                        "
                    >

                        <thead>

                            <tr
                                className="
                                    border-b
                                "
                            >

                                <th>
                                    Nº
                                </th>

                                <th>
                                    Nombre
                                </th>

                                <th>
                                    Categoría
                                </th>

                                <th>
                                    Asistencia
                                </th>

                            </tr>

                        </thead>



                        <tbody>

                            {
                                attendance.map((member)=>(

                                    <tr
                                        key={member.id}
                                        className="
                                            border-b
                                        "
                                    >

                                        <td>
                                            {member.numero}
                                        </td>


                                        <td>
                                            {member.nombre}
                                        </td>


                                        <td>
                                            {member.categoria}
                                        </td>


                                        <td
                                            className="
                                                font-bold
                                            "
                                        >
                                            {member.porcentaje}%
                                        </td>


                                    </tr>

                                ))
                            }


                        </tbody>


                    </table>


                </div>


            </Card>




        </PageContainer>

    );

}