import AttendanceList from "./AttendanceList";
import AttendanceSetup from "./AttendanceSetup";
import { members } from "../../data/members";
import { useState } from "react";

import type { Attendance } from "../../types/Attendance";
import type { AttendanceMember } from "../../types/AttendanceMember";


export default function Attendance(){
    //Estados
    const [date,setDate]= useState("");
    const [type,setType] =useState<"Ensayo" | "Evento"> ("Ensayo");
    const [started,setStarted] = useState(false);
    const [attendanceMembers, setAttendanceMembers] = useState<AttendanceMember[]>([]);

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

    return (
        <div>
            <h1>Registrar ensayo</h1>

        {!started ? (

            <AttendanceSetup
                onStart={handleStart}
            />

        ) : (

            <AttendanceList 
                members={members}
                attendanceMembers={attendanceMembers}
            />

        )}
        </div>
    );
}