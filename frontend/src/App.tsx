import React from 'react';
import {BrowserRouter,Routes,Route,Link} from "react-router-dom";

import MainLayout from "./layouts/MainLayouts/MainLayout.tsx"; 

import Home from "./pages/Home/Home.tsx" ;
import Members from './pages/Members/Members';
import Statistics from './pages/Statistics/Statistics';
import History from './pages/History/History';
import Attendance from './pages/Attendance/Attendance';

export default function App(){
    return (
        <BrowserRouter>
            <Routes>

                <Route element= {<MainLayout />}>
                    <Route path = "/" element={<Home />} />
                    <Route path = "/attendance" element={<Attendance/>}/>
                    <Route path = "/statistics" element={<Statistics/>}/>
                    <Route path = "/members" element={<Members/>} />
                    <Route path="/history" element={<History />} />
        
                </Route>

            </Routes>
        </BrowserRouter>
    )
}