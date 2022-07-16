import React, {FC, useMemo} from 'react';

import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../utils/helpers/hooks";
import { IResult} from "../../../types/questions";
import {getTimerTime} from "../../../utils/helpers/functions";
import {checkedDelete} from "../../../store/questions/questions.slice";
import QuestionsPage from "../../QuestionsPage/QuestionsPage";


interface TicketPageProps {
    type : "exam" | "ticket" | "theme",
    time : number
}
const TicketPage: FC<TicketPageProps> = ( { type, time }) => {

    const dispatch = useAppDispatch()
    const { id } = useParams()
    const navigate = useNavigate()
    const { ticketsData, checkedQuestions } = useAppSelector(state => state.pdd)
    const currentTicket = useMemo( () => {
        return ticketsData[Number(id) - 1]
    },[ticketsData])

    const finishTicketHandler = (timer : number) =>{
        const isPassed = Object.values(checkedQuestions).reduce( (acc,curr) => curr.isCorrect ? acc : acc+=1,0) <= currentTicket.length - 2
        const resId = Math.ceil( new Date().getSeconds() * Math.random() )
        const newResult : IResult = {
            id : resId,
            isPassed,
            timeFinished : getTimerTime( ( time * 60 ) - timer ),
            ticketType : type,
            topic : `Билет ${id} результаты тренировки`,
            checkedQuestions,
            currentTicket
        }
        const localStorageData = JSON.parse(localStorage.getItem("results") || "{}");
        const data = { ...localStorageData, [resId] : newResult}
        localStorage.setItem("results",JSON.stringify(data))
        dispatch(checkedDelete())
        navigate(`result/${resId}`)
    }

    if (!currentTicket) return <div>Loading....</div>
    return (
        <QuestionsPage questionsData={currentTicket} time={20} title={`Билет ${id} ПДД 2022 раешать онлайн`}
                       finish={finishTicketHandler} />
    );
}

export default TicketPage;