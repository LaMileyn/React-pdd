import React, {FC, useEffect, useState} from 'react';
import styles from './QuestionPage.module.scss';
import {IQuestion} from "../../types/questions";
import {useAppDispatch, useAppSelector} from "../../utils/helpers/hooks";
import {useNavigate} from "react-router-dom";
import Container from "../../components/Container/Container";
import clock from "../../assets/icons/clockBlack.svg";
import {getTimerTime} from "../../utils/helpers/functions";
import Paginator from "../../components/Paginator/Paginator";
import TicketQuestionArea from "../../components/TicketQuestionArea/TicketQuestionArea";


interface IProps {
    questionsData : IQuestion[],
    time : number,
    title : string,
    finish : (timer : number) => void
}
const QuestionsPage : FC<IProps> = ({time,questionsData,title,finish}) => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    const { checkedQuestions } = useAppSelector(state => state.pdd);
    const [timer,setTimer] = useState<number>(time * 60)
    const [currentQuestionNumber, setCurrentQuestionNumber] = useState<number>(0)
    const finishTicketHandler = () => finish(timer)

    useEffect( () =>{
        const interval = setInterval( () =>{
            if ( timer === 1 ) {
                return navigate(`result`)
            } else setTimer( prev => prev - 1)

        },1000)
        return () => clearInterval(interval)
    },[time,timer])

    return (
        <section className={styles.ticket}>
            <Container>
                <div className={styles.ticket__headline}>
                    <h1>{title}</h1>
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
                        currentTicket={questionsData}
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
                        currentTicket={questionsData}
                        question={questionsData[currentQuestionNumber]}/>
                </div>
            </Container>

        </section>
    );
}

export default QuestionsPage;