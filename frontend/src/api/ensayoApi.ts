import api from "./api";
import type { Ensayo } from "../types/Ensayo";

export async function getEnsayos() {

    const response = await api.get("/ensayos");

    return response.data;

}




export async function createEnsayo(
    ensayo: Omit<Ensayo, "id">
) {

    const response = await api.post(
        "/ensayos",
        ensayo
    );

    return response.data;

}


export async function deleteEnsayo(id: number) {

    await api.delete(`/ensayos/${id}`);

}