import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
import styles from './TicketPage.module.scss';
import Container from "../../../components/Container/Container";
import clock from '../../../assets/icons/clockBlack.svg'
import TicketQuestionArea from "../../../components/TicketQuestionArea/TicketQuestionArea";
import Paginator from "../../../components/Paginator/Paginator";
import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../utils/helpers/hooks";
import {IQuestion, IResult} from "../../../types/questions";
import {getTimerTime} from "../../../utils/helpers/functions";
import {checkedDelete} from "../../../store/questions/questions.slice";


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
    // time in seconds
    const [timer,setTimer] = useState<number>(time * 60)
    const [currentQuestionNumber, setCurrentQuestionNumber] = useState<number>(0)

    useEffect( () =>{
        const interval = setInterval( () =>{
            if ( timer === 1 ) {
                return navigate(`result`)
            } else setTimer( prev => prev - 1)

        },1000)
        return () => clearInterval(interval)
    },[time,timer])

    const finishTicketHandler = () =>{
        // console.log(checkedQuestions)
        const isPassed = Object.values(checkedQuestions).reduce( (acc,curr) => curr.isCorrect ? acc : acc+=1,0) <= currentTicket.length - 2
        const resId = Math.ceil( new Date().getSeconds() * Math.random() )
        const newResult : IResult = {
            id : resId,
            isPassed,
            timeFinished : getTimerTime( ( time * 60 ) - timer ),
            ticketType : type,
            topic : type == "ticket" ? `Билет ${id}` : ( type == "exam" ? `Экзамен` : `Тема пользование внешними приборами` ),
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
        <section className={styles.ticket}>
            <Container>
                <div className={styles.ticket__headline}>
                    { type === "ticket" && <h1>Билет {id} ПДД 2022 решать онлайн</h1>}
                    { type === "exam" && <h1>Экзамен ПДД онлайн категория «B».</h1>}
                    { type === "theme" && <h1>Тестирование по теме «Пользование внешними световыми приборами и звуковыми сигналами».</h1>}

                </div>
                <div className={styles.ticket__time}>
                    <div className={styles.ticket__timer}>
                        <div className={styles.timer__icon}>
                            <img src={clock} alt=""/>
                        </div>
                        <div className={styles.timer__time}>
                            {getTimerTime(timer)}
                        </div>
                    </div>
                    <div className={styles.ticket__finishTicket} onClick={ () => navigate("/")}>
                        Завершить досрочно
                    </div>
                </div>
                <div className={styles.paginator}>
                    <Paginator
                               currentTicket={currentTicket}
                               currentQuestionNumber={currentQuestionNumber}
                               checkedQuestions={checkedQuestions}
                               setCurrentQuestionNumber={setCurrentQuestionNumber}/>
                </div>
                <div className={styles.ticket__questions}>
                    <TicketQuestionArea
                        finishTicketHandler={finishTicketHandler}
                        checkedQuestions={checkedQuestions}
                        setCurrentQuestionNumber={setCurrentQuestionNumber}
                        currentQuestionNumber={currentQuestionNumber}
                        currentTicket={currentTicket}
                        question={currentTicket[currentQuestionNumber]}/>
                </div>
            </Container>
        </section>
    );
}

export default TicketPage;