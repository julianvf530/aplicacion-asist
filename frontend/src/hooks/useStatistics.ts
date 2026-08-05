import { useEffect, useState } from "react";

import type { AttendanceStatistics } from "../types/Statistics";

import {
    getAttendanceStatistics,
    getMonthlyWarnings
} from "../api/statisticsApi";


export function useStatistics() {


    const [
        attendance,
        setAttendance
    ] = useState<AttendanceStatistics[]>([]);


    const [
        warnings,
        setWarnings
    ] = useState<AttendanceStatistics[]>([]);



    async function loadStatistics() {

        const attendanceData =
            await getAttendanceStatistics();


        const warningsData =
            await getMonthlyWarnings();


        setAttendance(attendanceData);

        setWarnings(warningsData);

    }



    useEffect(() => {

        loadStatistics();

    }, []);



    return {

        attendance,

        warnings,

        loadStatistics

    };

}