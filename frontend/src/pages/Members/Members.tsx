import { members } from "../../data/members";
import MemberCard from "../../components/MemberCard";
import { useState } from "react";
import type { ChangeEvent } from "react";


export default function Members(){
    const [text,setText] =useState("");
   
    const manejo = (event: ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value);
    }

    const filteredMembers = members.filter((member) => 
        member.nombre.toLowerCase().includes(text.toLowerCase())
    )

    return (
        <div>
            <h1>Miembros</h1>
            <input
                type="text"
                value={text}
                onChange= {manejo}
            />

            {filteredMembers.map((member) =>

                <MemberCard
                    key={member.id}
                    member={member}
                />    
            )}
        </div>
    );
}