import type { Ensayo } from "../types/Ensayo";
import type { AttendanceMember } from "../types/AttendanceMember";

import { useState } from "react";

import { useMembers } from "../hooks/useMembers";

import Card from "./ui/Card";
import Button from "./ui/Button";


type HistoryCardProps = {

    ensayo: Ensayo;

    onDelete: (id:number)=>Promise<void>;

};



export default function HistoryCard({

    ensayo,

    onDelete

}: HistoryCardProps) {


    const [showDetails,setShowDetails] =
        useState(false);


    const { members } = useMembers();



    const presentes =
        ensayo.asistencia?.filter(
            (attendance:AttendanceMember)=>
                attendance.presente
        ) ?? [];



    const ausentes =
        ensayo.asistencia?.filter(
            (attendance:AttendanceMember)=>
                !attendance.presente
        ) ?? [];



    const getMemberName = (memberId:number)=>{


        const member = members.find(
            (member)=>member.id === memberId
        );


        return member?.nombre ?? "Desconocido";

    };



    return (

        <Card
            className="
                mb-5
            "
        >


            <div
                className="
                    flex
                    justify-between
                    items-start
                "
            >


                <div>

                    <h2
                        className="
                            text-xl
                            font-bold
                        "
                    >

                        {ensayo.fecha}

                    </h2>


                    <p className="text-gray-600">

                        {ensayo.tipo}

                    </p>


                </div>


                <Button

                    variant="danger"

                    onClick={() => onDelete(ensayo.id)}

                >

                    Eliminar

                </Button>


            </div>



            <div
                className="
                    flex
                    gap-6
                    mt-4
                "
            >

                <p
                    className="
                        text-green-600
                        font-medium
                    "
                >

                    ✅ Presentes: {presentes.length}

                </p>



                <p
                    className="
                        text-red-600
                        font-medium
                    "
                >

                    ❌ Ausentes: {ausentes.length}

                </p>


            </div>



            <Button

                variant="secondary"

                className="mt-4"

                onClick={() =>
                    setShowDetails(!showDetails)
                }

            >

                {
                    showDetails
                    ? "Ocultar asistencia"
                    : "Ver asistencia"
                }

            </Button>



            {
                showDetails && (

                    <div
                        className="
                            mt-5
                            border-t
                            pt-4
                        "
                    >

                        {
                            ensayo.asistencia?.map(
                                (attendance)=>(


                                <p
                                    key={attendance.memberId}
                                    className="
                                        py-1
                                    "
                                >

                                    {
                                        getMemberName(
                                            attendance.memberId
                                        )
                                    }


                                    {
                                        attendance.presente
                                        ? " ✅"
                                        : " ❌"
                                    }


                                </p>


                            ))
                        }


                    </div>

                )
            }



        </Card>

    );

}