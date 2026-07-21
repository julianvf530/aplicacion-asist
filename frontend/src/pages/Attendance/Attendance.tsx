import AttendanceList from "./AttendanceList";
import AttendanceSetup from "./AttendanceSetup";
import AttendanceFilters from "./AttendanceFilters";

import { members } from "../../data/members";
import { useState } from "react";
import { useEnsayos } from "../../contexts/EnsayosContext";


import type { Attendance } from "../../types/Attendance";
import type { AttendanceMember } from "../../types/AttendanceMember";
import type { Ensayo } from "../../types/Ensayo";

export default function Attendance(){
    
    //Estados
    const [date,setDate]= useState("");
    const [type,setType] =useState<"Ensayo" | "Evento"> ("Ensayo");
    const [started,setStarted] = useState(false);
    const [attendanceMembers, setAttendanceMembers] = useState<AttendanceMember[]>([]);
    const [selectedCategory, setSelectedCategory] = useState("Todas");
    const { addEnsayo } = useEnsayos();
    //handlers
    const handleStart = ( 
        selectedDate : string,
        selectedType : "Ensayo" | "Evento" 
    ) => {

        setDate(selectedDate);
        setType(selectedType);

        const initialAttendance = members.map((member) =>({
            memberId: member.id,
            presente:true
        }));
        setAttendanceMembers(initialAttendance);
        setStarted(true);
    }

    const handleToggleAttendance = (memberId:number) => {
        
        setAttendanceMembers((prevAttendance) =>
            prevAttendance.map((attendance)=>
                attendance.memberId === memberId
                    ?{
                        ...attendance,
                        presente : !attendance.presente
                    }
                    : attendance
            )
        );
    }

    const handleCategoryChange = (category:string) => {
        setSelectedCategory(category);
    }

    const handleSaveEnsayo = () => {

        const nuevoEnsayo: Ensayo = {
            id: Date.now(),
            fecha: date,
            tipo: type,
            asistencia: attendanceMembers
        };


        addEnsayo(nuevoEnsayo)
        

    };

    //funciones
    const filteredMembers = selectedCategory === "Todas"
        ? members
        : members.filter((member => member.categoria === selectedCategory))


    return (
        <div>
            <h1>Registrar ensayo</h1>

        {!started ? (

            <AttendanceSetup
                onStart={handleStart}
            />

        ) : (
            <div>
                <AttendanceFilters
                        selectedCategory={selectedCategory}
                        onSelectCategory={handleCategoryChange}
                    />

                <AttendanceList 
                    members={filteredMembers}
                    attendanceMembers={attendanceMembers}
                    onToggle={handleToggleAttendance}
                />
                <button onClick = {handleSaveEnsayo}>
                    Guardar Ensayo
                </button>

            </div>

        )}
        </div>
    );
}