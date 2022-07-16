import React, {FC, useEffect, useMemo, useState} from 'react';
import styles from './ExamPage.module.scss';
import QuestionsPage from "../../QuestionsPage/QuestionsPage";
import {generateArrayOfQuestions, getTimerTime, localStorageAdd} from "../../../utils/helpers/functions";
import {useAppDispatch, useAppSelector} from "../../../utils/helpers/hooks";
import {IQuestion, IResult} from "../../../types/questions";
import {nanoid} from "nanoid";
import {checkedDelete} from "../../../store/questions/questions.slice";
import {useNavigate} from "react-router-dom";

const ExamPage: FC = (props) => {
    const { allQuestions, checkedQuestions } = useAppSelector( state => state.pdd)
    const [questions,setQuestions] = useState<IQuestion[]>([])
    useEffect( () => {
        if (!questions.length){
            const data = generateArrayOfQuestions(allQuestions, 20)
            setQuestions(data)
        }
    },[allQuestions])
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const minutesToDo = 20;
    const finish = (timer : number) =>{
        const isPassed = Object.values(checkedQuestions).reduce( (acc,curr) => curr.isCorrect ? acc : acc+=1,0) <= questions.length - 2
        const resId = nanoid()
        const newResult : IResult = {
            id : resId,
            isPassed,
            timeFinished : getTimerTime( ( minutesToDo * 60 ) - timer ),
            ticketType : "ticket",
            topic : `Экзамен `,
            checkedQuestions,
            currentTicket : questions
        }
        localStorageAdd('results',newResult)
        // const localStorageData = JSON.parse(localStorage.getItem("results") || "{}");
        // const data = { ...localStorageData, [resId] : newResult}
        // localStorage.setItem("results",JSON.stringify(data))
        dispatch(checkedDelete())
        navigate(`result/${resId}`)
    }
    if(!questions.length){
        return <div>..Loading..</div>
    }
    return (
        <QuestionsPage questionsData={questions} time={minutesToDo} title={"Экзамен на категорию B"} finish={finish} />
    );
}

export default ExamPage;