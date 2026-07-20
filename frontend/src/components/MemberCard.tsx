import type { Member } from "../types/Member"

type MemberCardProps= {
   member:Member;
    onEdit: () => void;
    onDelete: () => void;
}

export default function MemberCard({member,onEdit,onDelete } : MemberCardProps){
    
    return(
        <div>
            <h2>{member.nombre}</h2>
            <p>
                {member.categoria} {member.instrumento}
            </p>
            <button onClick ={onEdit} >Editar</button> - <button onClick ={onDelete}  >Eliminar</button>
        </div>
    )

}