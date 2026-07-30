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

                <h2
                    className="
                        text-xl
                        font-bold
                    "
                >

                    {member.nombre}

                </h2>


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

                    Eliminar

                </Button>


            </div>



        </Card>

    );

}