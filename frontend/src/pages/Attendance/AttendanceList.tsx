import AttendanceMemberCard from "./AttendanceMemberCard";

import type { AttendanceMember } from "../../types/AttendanceMember";
import type { Member } from "../../types/Member";


type AttendanceListProps = {

    members: Member[];

    attendanceMembers: AttendanceMember[];

    onToggle: (memberId: number) => void;

};


export default function AttendanceList({

    members,

    attendanceMembers,

    onToggle

}: AttendanceListProps) {


    return (

        <div>

            <h2
                className="
                    text-xl
                    font-bold
                    mb-4
                "
            >
                Lista de miembros
            </h2>


            <div
                className="
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    gap-4
                "
            >

                {
                    members.map((member) => {

                        const attendance =
                            attendanceMembers.find(
                                item =>
                                    Number(item.memberId) ===
                                    Number(member.id)
                            );

                        /*
                         * Por seguridad, si por cualquier motivo
                         * todavía no existe la asistencia de este
                         * miembro, lo consideramos presente.
                         */
                        const memberAttendance: AttendanceMember =
                            attendance ?? {
                                memberId: Number(member.id),
                                presente: true
                            };


                        return (

                            <AttendanceMemberCard

                                key={member.id}

                                member={member}

                                attendance={memberAttendance}

                                onToggle={onToggle}

                            />

                        );

                    })
                }

            </div>

        </div>

    );

}