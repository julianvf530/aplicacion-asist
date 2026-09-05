import AttendanceList from "./AttendanceList";
import AttendanceSetup from "./AttendanceSetup";
import AttendanceFilters from "./AttendanceFilters";

import PageContainer from "../../components/ui/PageContainer";
import Button from "../../components/ui/Button";

import { useState } from "react";

import { useEnsayos } from "../../hooks/useEnsayos";
import { useMembers } from "../../hooks/useMembers";
import { useToast } from "../../hooks/useToast";

import type { AttendanceMember } from "../../types/AttendanceMember";

export default function Attendance() {

    const [date, setDate] = useState("");

    const [type, setType] =
        useState<"Ensayo" | "Evento">("Ensayo");

    const [started, setStarted] = useState(false);

    const [attendanceMembers, setAttendanceMembers] =
        useState<AttendanceMember[]>([]);

    const [selectedCategory, setSelectedCategory] =
        useState("Todas");

    const [saving, setSaving] = useState(false);

    const { createEnsayo } = useEnsayos();

    const { members } = useMembers();

    const { showToast } = useToast();


    const handleStart = (
        selectedDate: string,
        selectedType: "Ensayo" | "Evento"
    ) => {

        setDate(selectedDate);

        setType(selectedType);

        const initialAttendance = members.map((member) => ({

            memberId: Number(member.id),

            presente: true

        }));
        
        setAttendanceMembers(initialAttendance);

        setStarted(true);

    };


    const handleToggleAttendance = (memberId: number) => {

        setAttendanceMembers((prevAttendance) =>

            prevAttendance.map((attendance) =>

                attendance.memberId === memberId

                    ? {
                        ...attendance,
                        presente: !attendance.presente
                    }

                    : attendance

            )

        );

    };


    const handleCategoryChange = (category: string) => {

        setSelectedCategory(category);

    };


    const handleSaveEnsayo = async () => {

        setSaving(true);

        try {

            await createEnsayo({

                fecha: date,

                tipo: type,

                asistencia: attendanceMembers

            });

            showToast(
                "Ensayo guardado correctamente",
                "success"
            );

            setStarted(false);

            setAttendanceMembers([]);

            setSelectedCategory("Todas");

            setDate("");

            setType("Ensayo");

        } catch {

            showToast(
                "Error al guardar el ensayo",
                "error"
            );

        } finally {

            setSaving(false);

        }

    };


    const filteredMembers =

        selectedCategory === "Todas"

            ? members

            : members.filter(

                (member) =>

                    member.categoria === selectedCategory

            );


    return (

        <PageContainer>

            <h1
                className="
                    text-3xl
                    font-bold
                    mb-6
                "
            >
                Registrar ensayo
            </h1>


            {!started ? (

                <AttendanceSetup
                    onStart={handleStart}
                />

            ) : (

                <div>

                    <AttendanceFilters

                        selectedCategory={selectedCategory}

                        onSelectCategory={handleCategoryChange}

                    />


                    <AttendanceList

                        members={filteredMembers}

                        attendanceMembers={attendanceMembers}

                        onToggle={handleToggleAttendance}

                    />


                    <Button

                        className="mt-6"

                        onClick={handleSaveEnsayo}

                        disabled={saving}

                    >

                        {
                            saving
                                ? "Guardando..."
                                : "Guardar ensayo"
                        }

                    </Button>

                </div>

            )}

        </PageContainer>

    );

}