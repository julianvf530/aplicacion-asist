import type { Member } from "../../types/Member";
import type { AttendanceMember } from "../../types/AttendanceMember";

type attendanceMemberCardProps = {
    member:Member,
    attendance: AttendanceMember,
    onToggle : (memberId:number) => void
}

export default function AttendanceMemberCard ({member,attendance,onToggle} : attendanceMemberCardProps) {
    
    return(

        <div>
            <h3>
                {member.nombre}
            </h3>

            <p>
                {member.categoria} - {member.instrumento}
            </p>

            <button onClick={() => onToggle(member.id)}>
                {attendance.presente ? "Presente" : "Ausente"}
            </button>

        </div>

    )

}