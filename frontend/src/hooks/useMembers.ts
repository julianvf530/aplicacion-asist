import { useEffect, useState } from "react";

import type { Member } from "../types/Member";

import {
    getMembers,
    createMember,
    updateMember as updateMemberApi,
    deleteMember as deleteMemberApi,
    importMembers as importMembersApi
} from "../api/membersApi";

export function useMembers() {

    const [members, setMembers] = useState<Member[]>([]);


    async function loadMembers() {

        const data = await getMembers();

        setMembers(data);

    }


    useEffect(() => {

        loadMembers();

    }, []);


    async function addMember(member: Omit<Member, "id">) {

        const newMember = await createMember(member);

        setMembers(prev =>

            [...prev, newMember]

                .sort((a, b) => a.numero - b.numero)

        );

    }


    async function updateMember(member: Member) {

        const updated = await updateMemberApi(member);

        setMembers(prev =>

            prev
                .map(m =>

                    m.id === updated.id

                        ? updated

                        : m

                )
                .sort((a, b) => a.numero - b.numero)

        );

    }


    async function deleteMember(id: number) {

        await deleteMemberApi(id);

        setMembers(prev =>

            prev.filter(

                member => member.id !== id

            )

        );

    }


    async function importMembers(file: File) {

    await importMembersApi(file);

    await loadMembers();

    }


    return {

        members,

        addMember,

        updateMember,

        deleteMember,

        loadMembers,
        
        importMembers

    };

}