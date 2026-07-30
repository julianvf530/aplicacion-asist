import type { Member } from "../../types/Member";
import type { AttendanceMember } from "../../types/AttendanceMember";

import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";


type AttendanceMemberCardProps = {

    member:Member;

    attendance:AttendanceMember;

    onToggle:(memberId:number)=>void;

};



export default function AttendanceMemberCard({

    member,

    attendance,

    onToggle

}:AttendanceMemberCardProps){


    return (

        <Card>


            <h3
                className="
                    text-lg
                    font-bold
                "
            >

                {member.nombre}

            </h3>



            <p
                className="
                    text-gray-600
                    mb-4
                "
            >

                {member.categoria}
                {" · "}
                {member.instrumento}


            </p>



            <Button

                variant={
                    attendance.presente
                    ? "primary"
                    : "danger"
                }

                onClick={() =>
                    onToggle(member.id)
                }

            >

                {
                    attendance.presente
                    ? "✅ Presente"
                    : "❌ Ausente"
                }


            </Button>


        </Card>

    );

}