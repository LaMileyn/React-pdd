import React from 'react';
import './styles/main.scss'
import './styles/variables.scss'
import MainPage from "./views/Main/MainPage/MainPage";
import Header from "./components/Header/Header";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./components/MainLayout/MainLayout";

const App = () => {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<MainLayout/>}>
                    <Route index element={<MainPage/>}/>
                </Route>
                <Route path="*" element={<div>404 - Страница не найдена</div>}/>
            </Routes>
        </div>
    );
}

export default App;
