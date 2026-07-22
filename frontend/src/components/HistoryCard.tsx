import type { Ensayo } from "../types/Ensayo"
import type { AttendanceMember } from "../types/AttendanceMember"
import { useState } from "react"
import { members } from "../data/members"
import { useEnsayos } from "../contexts/EnsayosContext"


type historyCardProps = {
    ensayo:Ensayo
}

export default function HistoryCard({ensayo}: historyCardProps) {
    const [showDetails, setShowDetails] =useState(false);
    
    const {deleteEnsayo} = useEnsayos();

    const presentes = 
        ensayo.asistencia.filter(
            (attendance:AttendanceMember) => attendance.presente
        )
    const ausentes = 
        ensayo.asistencia.filter(
            (attendance:AttendanceMember) => !attendance.presente
        )

    
    const getMemberName = (memberId:number) => {
        const member = members.find(
            (member) => member.id === memberId
        )

        return member?.nombre ?? "deconocido"
    }


    return(
        <div>
            <h2>{ensayo.fecha}</h2>

            <p>{ensayo.tipo}</p>

            <p>Presentes: {presentes.length}</p>

            <p>Ausentes: {ausentes.length}</p>

            <button onClick={ () => setShowDetails(!showDetails)}>
                
                {showDetails ? "ocultar asistencia" : "ver asistencia"}
            
            </button>
            
            <button onClick={() => deleteEnsayo(ensayo.id)}>

             Eliminar
            
            </button>


                {
                    showDetails && ( 

                        ensayo.asistencia.map((attendance) => (

                            <p key={attendance.memberId}>

                                {getMemberName(attendance.memberId)}

                                {
                                    attendance.presente
                                    ? " ✅"
                                    : " ❌"
                                }

                            </p>

                        ))
                    )
                }


        </div>
    )

}
