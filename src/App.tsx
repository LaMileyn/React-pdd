import React, {useEffect} from 'react';
import './styles/main.scss'
import './styles/variables.scss'
import MainPage from "./views/Main/MainPage/MainPage";
import Header from "./components/Header/Header";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./components/MainLayout/MainLayout";
import TicketPage from "./views/Ticket/TicketPage/TicketPage";
import ResultPage from "./views/Result/ResultPage/ResultPage";
import {useAppDispatch} from "./utils/helpers/hooks";
import {fetchPdd} from "./store/questions/questions.actions";
import ExamPage from "./views/Exam/ExamPage/ExamPage";
import MistakesPage from "./views/Mistakes/MistakesPage/MistakesPage";
import FavouritePage from "./views/Favourite/FavouritePage/FavouritePage";

const App = () => {

    const dispatch = useAppDispatch()
    useEffect(() =>{
        dispatch(fetchPdd())
    },[dispatch])
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<MainLayout/>}>
                    <Route index element={<MainPage/>}/>
                    <Route path="ticket/:id" element={<TicketPage />}/>
                    <Route path="exam" element={<ExamPage />}/>
                    <Route path="mistakes" element={<MistakesPage />}/>
                    <Route path="mistakes/result/:resultId" element={<ResultPage />}/>
                    <Route path="favourite" element={<FavouritePage />}/>
                    <Route path="favourite/result/:resultId" element={<ResultPage />}/>
                    <Route path="themes/:id" element={<TicketPage />}/>
                    <Route path="ticket/:id/result/:resultId" element={<ResultPage />}/>
                    <Route path="exam/result/:resultId" element={<ResultPage />}/>
                    <Route path="themes/:id/result/:resultId" element={<ResultPage />}/>
                </Route>
                <Route path="*" element={<div>404 - Страница не найдена</div>}/>
            </Routes>
        </div>
    );
}

export default App;
