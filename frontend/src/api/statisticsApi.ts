import api from "./api";

export type Statistics = {

    ensayosRealizados: number;

    totalAsistencias: number;

    totalAusencias: number;

    porcentajeAsistencia: number;

    mejorAsistencia: {

        nombre: string;

        total: number;

    } | null;

    masAusencias: {

        nombre: string;

        total: number;

    } | null;

};


export async function getStatistics(): Promise<Statistics> {

    const response =
        await api.get("/statistics");

    return response.data;

}