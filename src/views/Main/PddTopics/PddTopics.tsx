import React, {FC} from 'react';
import styles from './PddTopics.module.scss';
import {IQuestion} from "../../../types/questions";
import {Link} from "react-router-dom";

interface ITopicsProps {
    topics: Array<IQuestion[]>
}

const PddTopics: FC<ITopicsProps> = ({topics}) => {
    return (
        <div className={styles.topics}>
            <div className={styles.topics__headline}>
                <h3>Вопросы ПДД по темам</h3>
                <p>Тренировка по темам - еще один удобный способ выучить ПДД. Ваша цель - все темы должны стать
                    <span> зелеными!</span></p>
            </div>
            <div className={styles.topics__items}>
                {
                    topics.map((topic, index) => {
                        return (
                            <div key={index} className={styles.topics__item}>
                                <img src="https://www.freeiconspng.com/uploads/handshake-icon-29.png" alt=""/>
                                <span>
                                    <Link to={`/themes`}>
                                        {topic[0].topic} ( {topics.length} вопросов )
                                    </Link>
                                </span>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default PddTopics;