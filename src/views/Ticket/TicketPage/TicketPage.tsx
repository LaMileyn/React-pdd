import React, {FC, useMemo} from 'react';

import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../utils/helpers/hooks";
import { IResult} from "../../../types/questions";
import {getTimerTime, localStorageAdd} from "../../../utils/helpers/functions";
import {checkedDelete} from "../../../store/questions/questions.slice";
import QuestionsPage from "../../QuestionsPage/QuestionsPage";
import {nanoid} from "nanoid";



const TicketPage: FC = () => {

    const dispatch = useAppDispatch()
    const { id } = useParams()
    const navigate = useNavigate()
    const { ticketsData, checkedQuestions } = useAppSelector(state => state.pdd)
    const currentTicket = useMemo( () => {
        return ticketsData[Number(id) - 1]
    },[ticketsData])
    const minutesToDo = 20;
    const finishTicketHandler = (timer : number) =>{
        const isPassed = Object.values(checkedQuestions).reduce( (acc,curr) => curr.isCorrect ? acc : acc+=1,0) <= currentTicket.length - 2
        const resId = nanoid()
        const newResult : IResult = {
            id : resId,
            isPassed,
            timeFinished : getTimerTime( ( minutesToDo * 60 ) - timer ),
            ticketType : "ticket",
            topic : `Билет ${id} результаты тренировки`,
            checkedQuestions,
            currentTicket
        }

        // const localStorageData = JSON.parse(localStorage.getItem("results") || "{}");
        // const data = { ...localStorageData, [resId] : newResult}
        // localStorage.setItem("results",JSON.stringify(data))

        localStorageAdd('results',newResult)
        dispatch(checkedDelete())
        navigate(`result/${resId}`)
    }

    if (!currentTicket) return <div>Loading....</div>
    return (
        <QuestionsPage questionsData={currentTicket} time={minutesToDo} title={`Билет ${id} ПДД 2022 раешать онлайн`}
                       finish={finishTicketHandler} />
    );
}

export default TicketPage;