import React, {FC} from 'react';
import styles from './TicketPage.module.scss';
import Container from "../../../components/Container/Container";
import clock from '../../../assets/icons/clockBlack.svg'
import TicketQuestionArea from "../../../components/TicketQuestionArea/TicketQuestionArea";


const TicketPage: FC = (props) => {
    return (
        <section className={styles.ticket}>
            <Container>
                <div className={styles.ticket__headline}>
                    <span>Тренировочный билет 1</span>
                    <h1>Билет 1 ПДД 2022 решать онлайн</h1>
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
                <div className={styles.ticket__questions}>
                    <TicketQuestionArea/>
                </div>
            </Container>
        </section>
    );
}

export default TicketPage;