import type { Member } from "../types/Member"

type MemberCardProps= {
   member:Member

}

export default function MemberCard({member}: MemberCardProps){
    
    return(
        <div>
            <h2>{member.nombre}</h2>
            <p>
                {member.categoria} {member.instrumento}
            </p>
        </div>
    )

}