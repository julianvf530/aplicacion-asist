import type { Member } from "../types/Member";

import Card from "./ui/Card";
import Button from "./ui/Button";


type MemberCardProps = {

    member: Member;

    onEdit: () => void;

    onDelete: () => void;

};


export default function MemberCard({

    member,

    onEdit,

    onDelete

}: MemberCardProps) {


    return (

        <Card
            className="
                mb-4
                flex
                justify-between
                items-center
            "
        >


            <div>

                <div
                    className="
                        flex
                        items-center
                        gap-3
                        mb-1
                    "
                >

                    <span
                        className="
                            bg-blue-600
                            text-white
                            rounded-full
                            w-8
                            h-8
                            flex
                            items-center
                            justify-center
                            font-bold
                            text-sm
                        "
                    >
                        {member.numero}
                    </span>

                    <h2
                        className="
                            text-xl
                            font-bold
                        "
                    >
                        {member.nombre}
                    </h2>

                </div>


                <p className="text-gray-600">

                    {member.instrumento}

                    {" · "}

                    Categoría {member.categoria}

                </p>


            </div>



            <div
                className="
                    flex
                    gap-3
                "
            >

                <Button
                    variant="secondary"
                    onClick={onEdit}
                >

                    Editar

                </Button>


                <Button
                    variant="danger"
                    onClick={onDelete}
                >
                    Dar de baja
                </Button>


            </div>



        </Card>

    );

}