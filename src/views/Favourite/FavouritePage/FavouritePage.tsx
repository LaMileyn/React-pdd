import React, {FC, useEffect, useState} from 'react';
import {IQuestion, IResult} from "../../../types/questions";
import {useAppDispatch, useAppSelector} from "../../../utils/helpers/hooks";
import {useNavigate} from "react-router-dom";
import {nanoid} from "nanoid";
import {getTimerTime, localStorageAdd} from "../../../utils/helpers/functions";
import {checkedDelete} from "../../../store/questions/questions.slice";
import QuestionsPage from "../../QuestionsPage/QuestionsPage";

const FavouritePage : FC = (props) => {

    const [data,setData] = useState<IQuestion[]>([])
    useEffect( () => {
        let res = JSON.parse(localStorage.getItem("favouriteQuestions")!)
        setData(Object.values(res))
    },[])
    const { checkedQuestions } = useAppSelector(state => state.pdd)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const minutesToDo = data.length;
    const finishTicketHandler = (timer : number) =>{
        const isPassed = Object.values(checkedQuestions).reduce( (acc,curr) => curr.isCorrect ? acc : acc+=1,0) <= data.length - 2
        const resId = nanoid()
        const newResult : IResult = {
            id : String(resId),
            isPassed,
            timeFinished : getTimerTime( ( minutesToDo * 60 ) - timer ),
            ticketType : "favourite",
            topic : `Ваши избранные вопросы`,
            checkedQuestions,
            currentTicket : data
        }
        localStorageAdd('results',newResult)
        dispatch(checkedDelete())
        navigate(`result/${resId}`)
    }
    if (!data.length) return <div>.......</div>
    return (
        <QuestionsPage questionsData={data} time={minutesToDo} title={`Ваши избранные`} finish={finishTicketHandler} />
    );
}

export default FavouritePage;