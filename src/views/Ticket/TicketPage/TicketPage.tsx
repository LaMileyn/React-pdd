import React, {FC, useCallback, useMemo, useState} from 'react';
import styles from './TicketPage.module.scss';
import Container from "../../../components/Container/Container";
import clock from '../../../assets/icons/clockBlack.svg'
import TicketQuestionArea from "../../../components/TicketQuestionArea/TicketQuestionArea";
import Paginator from "../../../components/Paginator/Paginator";
import {useParams} from "react-router-dom";
import {useAppSelector} from "../../../utils/helpers/hooks";
import {IQuestion} from "../../../types/questions";


const TicketPage: FC = (props) => {

    const id = Number(useParams().id)
    const { ticketsData, checkedQuestions } = useAppSelector(state => state.pdd)
    const currentTicket = useMemo( () => {
        return ticketsData[id - 1]
    },[ticketsData])
    const [currentQuestionNumber, setCurrentQuestionNumber] = useState<number>(0)
    const changeQuestionChecked = useCallback( () => {
            if ( ( "Билет "+currentQuestionNumber ) in checkedQuestions ){

            }
    },[checkedQuestions])

    if (!currentTicket) return <div>Loading....</div>
    return (
        <section className={styles.ticket}>
            <Container>
                <div className={styles.ticket__headline}>
                    <span>Тренировочный билет {id}</span>
                    <h1>Билет {id} ПДД 2022 решать онлайн</h1>
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
                    <div className={styles.ticket__finishTicket}>
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
                        answered={false}
                        currentQuestionNumber={currentQuestionNumber}
                        correct={false}
                        question={currentTicket[currentQuestionNumber]}/>
                </div>
            </Container>
        </section>
    );
}

export default TicketPage;