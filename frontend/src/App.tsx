import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastProvider } from "./contexts/ToastContext";

import MainLayout from "./layouts/MainLayout.tsx";

import Home from "./pages/Home/Home.tsx";
import Members from "./pages/Members/Members";
import Statistics from "./pages/Statistics/Statistics";
import History from "./pages/History/History";
import Attendance from "./pages/Attendance/Attendance";


export default function App(){

    return (
        <ToastProvider>

            <BrowserRouter>

                <Routes>

                    <Route element={<MainLayout />}>

                        <Route 
                            path="/"
                            element={<Home />}
                        />

                        <Route
                            path="/attendance"
                            element={<Attendance />}
                        />

                        <Route
                            path="/statistics"
                            element={<Statistics />}
                        />

                        <Route
                            path="/members"
                            element={<Members />}
                        />

                        <Route
                            path="/history"
                            element={<History />}
                        />

                    </Route>

                </Routes>

            </BrowserRouter>
        </ToastProvider>
    );

}