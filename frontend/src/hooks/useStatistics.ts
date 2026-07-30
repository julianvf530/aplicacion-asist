import { useEffect, useState } from "react";

import {
    getStatistics
} from "../api/statisticsApi";

import type {
    Statistics
} from "../api/statisticsApi";


export function useStatistics() {

    const [statistics, setStatistics] =
        useState<Statistics | null>(null);


    async function loadStatistics() {

        const data = await getStatistics();

        setStatistics(data);

    }


    useEffect(() => {

        loadStatistics();

    }, []);


    return {
        statistics,
        loadStatistics
    };

}