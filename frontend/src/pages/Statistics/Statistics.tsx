import { useEnsayos } from "../../contexts/EnsayosContext";

export default function Statistics(){

    const { ensayos } = useEnsayos();


    // Calculamos asistentes por ensayo
    const totalAsistencias = ensayos.map((ensayo) => {

        const presentes = ensayo.asistencia.filter(
            (attendance) => attendance.presente
        );

        return presentes.length;

    });


    // Calculamos la media de asistencia
    const mediaAsistencia = totalAsistencias.length > 0
        ? totalAsistencias.reduce(
            (total, actual) => total + actual,
            0
        ) / totalAsistencias.length
        : 0;


    return (
        <div>

            <h1>Estadísticas</h1>


            <p>
                Ensayos realizados: {ensayos.length}
            </p>


            <p>
                Media de asistentes por ensayo:
                {mediaAsistencia.toFixed(2)}
            </p>


            <h2>Asistencia por ensayo</h2>

            {
                totalAsistencias.map((total, index) => (

                    <p key={index}>
                        Ensayo {index + 1}: {total} asistentes
                    </p>

                ))
            }


        </div>
    );
}