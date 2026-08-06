import { useRef, useState } from "react";

import { useMembers } from "../../hooks/useMembers";
import { useToast } from "../../hooks/useToast";

import MemberCard from "../../components/MemberCard";
import MemberForm from "../../components/MemberForm";

import PageContainer from "../../components/ui/PageContainer";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

import type { ChangeEvent } from "react";
import type { Member } from "../../types/Member";

export default function Members() {

    const [text, setText] = useState("");

    const [editingMember, setEditingMember] =
        useState<Member | null>(null);

    const [showForm, setShowForm] =
        useState(false);

    const fileInputRef =
        useRef<HTMLInputElement>(null);

    const {
        members,
        addMember,
        updateMember,
        deleteMember,
        importMembers
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

    const handleEdit = (member: Member) => {

        setEditingMember(member);

    };

    const handleSave = async (member: Member) => {

        try {

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

                    numero: member.numero,

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

        } catch (error: any) {

            showToast(

                error.response?.data?.message ??

                error.message ??

                "Ha ocurrido un error",

                "error"

            );

        }

    };

    const handleDelete = async (member: Member) => {

        const confirmed = window.confirm(
            `¿Seguro que quieres dar de baja a "${member.nombre}"?\n\nSeguirá apareciendo en el historial de asistencias.`
        );

        if (!confirmed) {
            return;
        }

        await deleteMember(member.id);

        showToast(
            "Miembro dado de baja correctamente",
            "success"
        );

    };

    const handleImport = async (

        event: React.ChangeEvent<HTMLInputElement>

    ) => {

        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        try {

            await importMembers(file);

            showToast(
                "Miembros importados correctamente",
                "success"
            );

            event.target.value = "";

        } catch {

            showToast(
                "Error al importar el Excel",
                "error"
            );

        }

    };

    return (

        <PageContainer>

            <input

                ref={fileInputRef}

                type="file"

                accept=".xlsx,.xls"

                hidden

                onChange={handleImport}

            />

            <div
                className="
                    flex
                    flex-col
                    md:flex-row
                    md:justify-between
                    md:items-center
                    gap-4
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

                <div
                    className="
                        flex
                        gap-3
                    "
                >

                    <Button

                        variant="secondary"

                        onClick={() =>
                            fileInputRef.current?.click()
                        }

                    >

                        Importar Excel

                    </Button>

                    <Button
                        onClick={() =>
                            setShowForm(true)
                        }
                    >

                        Añadir miembro

                    </Button>

                </div>

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

                            onCancel={() =>
                                setShowForm(false)
                            }

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

                            onCancel={() =>
                                setEditingMember(null)
                            }

                        />

                    </div>

                )

            }

            <div>

                {

                    filteredMembers.map((member) => (

                        <MemberCard

                            key={member.id}

                            member={member}

                            onEdit={() =>
                                handleEdit(member)
                            }

                            onDelete={() =>
                                handleDelete(member)
                            }

                        />

                    ))

                }

            </div>

        </PageContainer>

    );

}