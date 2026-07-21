import AttendanceMemberCard from "./AttendanceMemberCard";
import type { AttendanceMember } from "../../types/AttendanceMember";
import type { Member } from "../../types/Member";

type AttendanceListProps= {
    members: Member[];
    attendanceMembers: AttendanceMember[];
    onToggle: (memberId:number) => void 
}

export default function AttendanceList ({members,attendanceMembers,onToggle}: AttendanceListProps ) {
    
    return(
        <div>
            <h2>
                Lista de Miembros
            </h2>

           {members.map((member) => {

            const attendance = attendanceMembers.find(
                (item) => item.memberId === member.id
            );


            return (
                <AttendanceMemberCard
                    key={member.id}
                    member={member}
                    attendance={attendance!}
                    onToggle={onToggle}
                />
            );

        })}


    </div>

    )
}