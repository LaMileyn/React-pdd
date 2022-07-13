import React, {FC, useCallback, useMemo, useState} from 'react';
import styles from './TicketPage.module.scss';
import Container from "../../../components/Container/Container";
import clock from '../../../assets/icons/clockBlack.svg'
import TicketQuestionArea from "../../../components/TicketQuestionArea/TicketQuestionArea";
import Paginator from "../../../components/Paginator/Paginator";
import {useNavigate, useParams} from "react-router-dom";
import {useAppSelector} from "../../../utils/helpers/hooks";
import {IQuestion} from "../../../types/questions";


interface TicketPageProps {
    type : "exam" | "bilet" | "quest"
}
const TicketPage: FC<TicketPageProps> = ( { type }) => {

    const id = Number(useParams().id)
    const navigate = useNavigate()
    const { ticketsData, checkedQuestions } = useAppSelector(state => state.pdd)
    const currentTicket = useMemo( () => {
        return ticketsData[id - 1]
    },[ticketsData])
    const [currentQuestionNumber, setCurrentQuestionNumber] = useState<number>(0)

    if (!currentTicket) return <div>Loading....</div>
    return (
        <section className={styles.ticket}>
            <Container>
                <div className={styles.ticket__headline}>
                    { type === "bilet" && <h1>Билет {id} ПДД 2022 решать онлайн</h1>}
                    { type === "exam" && <h1>Экзамен ПДД онлайн категория «B».</h1>}
                    { type === "exam" && <h1>Тестирование по теме «Пользование внешними световыми приборами и звуковыми сигналами».</h1>}

                </div>
                <div className={styles.ticket__time}>
                    <div className={styles.ticket__timer}>
                        <div className={styles.timer__icon}>
                            <img src={clock} alt=""/>
                        </div>
                        <div className={styles.timer__time}>
                            11:26
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