import { members } from "../../data/members";
import MemberCard from "../../components/MemberCard";

export default function Members(){
    
    return (
        <div>
            <h1>Miembros</h1>

            {members.map((member) =>

                <MemberCard
                    key={member.id}
                    member={member}
                />    
            )}
        </div>
    );
}