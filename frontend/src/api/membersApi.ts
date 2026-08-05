import api from "./api";
import type { Member } from "../types/Member";

export async function getMembers() {
    const response = await api.get("/members");
    return response.data;
}

export async function createMember(member: Omit<Member, "id">) {
    const response = await api.post("/members", member);
    return response.data;
}

export async function updateMember(member: Member) {
    const response = await api.put(`/members/${member.id}`, member);
    return response.data;
}

export async function deleteMember(id: number) {
    await api.delete(`/members/${id}`);
}


export async function importMembers(file: File) {

    const formData = new FormData();

    formData.append("file", file);

    const response = await api.post(
        "/import/members",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
    );

    return response.data;

}