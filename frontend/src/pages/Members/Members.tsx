import { useState } from "react";

import { useMembers } from "../../hooks/useMembers";
import { useToast } from "../../hooks/useToast";

import MemberCard from "../../components/MemberCard";
import MemberForm from "../../components/MemberForm";

import PageContainer from "../../components/ui/PageContainer";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";


import type { ChangeEvent } from "react";
import type { Member } from "../../types/Member";


export default function Members(){


    const [text,setText] = useState("");
    
    const [editingMember,setEditingMember] =
        useState<Member | null>(null);


    const [showForm,setShowForm] =
        useState(false);


    const {
        members,
        addMember,
        updateMember,
        deleteMember

    } = useMembers();

    const { showToast } = useToast();


    const manejo = (
        event: ChangeEvent<HTMLInputElement>
    ) => {

        setText(event.target.value);

    };



    const filteredMembers = members.filter((member) =>

        member.nombre
            .toLowerCase()
            .includes(text.toLowerCase())

    );



    const handleEdit = (member:Member) => {

        setEditingMember(member);

    };



    const handleSave = async (member: Member) => {

        const exists = members.some(

            (m) => m.id === member.id

        );

        if (exists) {

            await updateMember(member);

            showToast(
                "Miembro actualizado correctamente",
                "success"
            );

        } else {

            await addMember({

                nombre: member.nombre,

                categoria: member.categoria,

                instrumento: member.instrumento

            });

            showToast(
                "Miembro añadido correctamente",
                "success"
            );

        }

        setEditingMember(null);

        setShowForm(false);

    };



   const handleDelete = async (member: Member) => 
    {
        const confirmed = window.confirm(
            `¿Seguro que quieres eliminar a "${member.nombre}"?`
        );

        if (!confirmed) {
            return;
        }

        await deleteMember(member.id);

        showToast(
            "Miembro eliminado correctamente",
            "success"
        );

    };



    return (

        <PageContainer>


            <div
                className="
                    flex
                    justify-between
                    items-center
                    mb-6
                "
            >

                <h1
                    className="
                        text-3xl
                        font-bold
                    "
                >
                    Miembros
                </h1>


                <Button

                    onClick={() => setShowForm(true)}

                >

                    Añadir miembro

                </Button>


            </div>



            <div className="mb-6">

                <Input

                    type="text"

                    value={text}

                    onChange={manejo}

                    placeholder="Buscar miembro..."

                />

            </div>



            {
                showForm && (

                    <div className="mb-6">

                        <MemberForm

                            onSave={handleSave}

                            onCancel={() => setShowForm(false)}
                        />

                    </div>

                )
            }



            {
                editingMember && (

                    <div className="mb-6">

                        <MemberForm

                            member={editingMember}

                            onSave={handleSave}

                            onCancel={() => setEditingMember(null)}

                        />

                    </div>

                )
            }



            <div>


                {
                    filteredMembers.map((member)=>(

                        <MemberCard

                            key={member.id}

                            member={member}

                            onEdit={() => handleEdit(member)}

                            onDelete={() => handleDelete(member)}

                        />

                    ))
                }


            </div>



        </PageContainer>

    );

}