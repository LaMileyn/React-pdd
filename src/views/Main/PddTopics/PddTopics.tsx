import React, {FC} from 'react';
import styles from './PddTopics.module.scss';

const PddTopics: FC = (props) => {
    return (
        <div className={styles.topics}>
            <div className={styles.topics__headline}>
                <h3>Вопросы ПДД по темам</h3>
                <p>Тренировка по темам - еще один удобный способ выучить ПДД. Ваша цель - все темы должны стать
                    <span> зелеными!</span></p>
            </div>
            <div className={styles.topics__items}>
                {
                    Array(20).fill(null).map( el => (
                        <div className={styles.topics__item}>
                            <img src="https://www.freeiconspng.com/uploads/handshake-icon-29.png" alt=""/>
                            <span>Общие положения ( 25 вопросов )</span>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default PddTopics;