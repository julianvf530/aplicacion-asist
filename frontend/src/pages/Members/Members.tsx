import { members } from "../../data/members";
import MemberCard from "../../components/MemberCard";
import { useState } from "react";
import MemberForm from "../../components/MemberForm";

import type { ChangeEvent } from "react";
import type { Member } from "../../types/Member";


export default function Members(){
    //estados de la aplicación
    const [text,setText] =useState("");
    const [editingMember,setEditingMember] = useState< Member | null>(null)
    const [membersList,setMembersList] = useState(members);
    const [showForm,setShowForm] = useState(false);

    //funciones para manejar la aplicación
    const manejo = (event: ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value);
    }

    const filteredMembers = membersList.filter((member) => 
        member.nombre.toLowerCase().includes(text.toLowerCase())
    )

    const handleEdit = (member:Member) => {
        setEditingMember(member)
    }

    const handleSave = (updatedMember:Member) => {
        const exists= membersList.some(
            (member)  => member.id === updatedMember.id
        )

        if(exists){

            setMembersList((prevMembers) => 
            prevMembers.map((member) => 
            member.id === updatedMember.id
            ?updatedMember
            :member
            ));

        }else{
            setMembersList((prevMembers)=> [
             ...prevMembers,
            updatedMember
        ]);
        }
            
        setEditingMember(null);
        setShowForm(false);
    }

    const handleDelete= (member:Member) => {

        setMembersList((prevMembers)=>
            prevMembers.filter((m) => m.id !== member.id) 
        );
    }

    return (
        <div>
            <h1>Miembros</h1>

            
            <input
                type="text"
                value={text}
                onChange= {manejo}
            />

            <button onClick={()=> setShowForm(true)}>
                Añadir Miembro
            </button>
            
            {showForm && (<MemberForm onSave={handleSave} />)}


            {editingMember && (
                <MemberForm 
                member={editingMember}
                onSave={handleSave}/>
            )}
            

            {filteredMembers.map((member) =>

                <MemberCard
                    key={member.id}
                    member={member}
                    onEdit={() => handleEdit(member)}
                    onDelete={() => handleDelete(member) }
                />    
            )}

            

        </div>
    );
}