import api from "./api";


export async function getAttendanceStatistics() {

    const response = await api.get(
        "/statistics/attendance"
    );

    return response.data;

}



export async function getMonthlyWarnings() {

    const response = await api.get(
        "/statistics/warnings"
    );

    return response.data;

}