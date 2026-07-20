import type { Member } from "../types/Member";
import { useState } from "react";


type MemberFormProps = {
    member?: Member;
    onSave: (member: Member) => void;
};

export default function MemberForm({ member,onSave }: MemberFormProps) {
    //estados 
    const [nombre,setNombre] = useState(member?.nombre ?? "");
    const [categoria,setCategoria] = useState(member?.categoria ?? "");
    const [instrumento,setInstrumento] = useState(member?.instrumento ?? "");

    const handleSubmit = () => {
        const updateMember:Member = {
            
            id: member ? member.id: Date.now(),
            nombre,
            categoria,
            instrumento
        }
        onSave(updateMember)
    }

    return (
        <div>
            <h2>
                {member ? "Editar miembro" : "Añadir miembro"}
            </h2>

            <input
                type="text"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
            />

            <input
                type="text"
                placeholder="Categoría"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
            />

            <input
                type="text"
                placeholder="Instrumento"
                value={instrumento}
                onChange={(e) => setInstrumento(e.target.value)}
            />

            <button onClick={handleSubmit}>
                Guardar
            </button>
        </div>
    );
}