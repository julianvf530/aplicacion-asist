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

    const handleSave = (updateMember:Member) => {
        setMembersList((prevMembers) => 
            prevMembers.map((member) => 
            member.id === updateMember.id
            ?updateMember
            :member
            )
        );
        setEditingMember(null);
    }
    const handleDelete= (member:Member) => {

    }

    return (
        <div>
            <h1>Miembros</h1>

            
            <input
                type="text"
                value={text}
                onChange= {manejo}
            />

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