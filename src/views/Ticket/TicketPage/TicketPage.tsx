import React, {FC, useMemo, useState} from 'react';
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
    const { ticketsData } = useAppSelector( state => state.pdd )
    const currentTicket  = ticketsData[id-1]
    const [currentQuestion,setCurrentQuestion] = useState<IQuestion>(currentTicket[0])
    const changeCurrentPage = (page : number) =>{
            setCurrentQuestion(currentTicket[page - 1])
    }
    if ( !ticketsData ) return <div>Loading....</div>
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
                    <Paginator itemsCount={currentTicket.length} changePage={changeCurrentPage}/>
                </div>
                <div className={styles.ticket__questions}>
                    <TicketQuestionArea answered={false} correct={false} question={currentQuestion}/>
                </div>
            </Container>
        </section>
    );
}

export default TicketPage;