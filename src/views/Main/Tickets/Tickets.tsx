import React, {FC} from 'react';
import styles from './Tickets.module.scss';
import cn from 'classnames'
import {Link} from "react-router-dom";
import {IQuestion } from "../../../types/questions";


interface ITicketsProps{
    tickets : Array<IQuestion[]>
}
const Tickets : FC<ITicketsProps> = ({ tickets }) => {
    return (
        <div className={styles.tickets}>
            <div className={styles.tickets__title}>
                <h3>Билеты ПДД (категория A и B)</h3>
                <span>Сменить категорию на CD</span>
            </div>
            <div className={styles.tickets__mainContent}>
                <div className={styles.examBlock}>
                    <div className={styles.examBlock__category}>AB</div>
                    <div className={styles.examBlock__link}>Сдать экзамен</div>
                </div>
                <div className={styles.tickets__items}>
                    {
                        tickets.map( (el,index) => (
                            <Link key={index} to={`/ticket/${index+1}`}>
                                <div
                                     className={cn(styles.tickets__item)}>{index + 1}
                                </div>
                            </Link>

                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default Tickets;