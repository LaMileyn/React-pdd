import React, {FC} from 'react';
import styles from './TicketQuestionArea.module.scss';
import star from './../../assets/icons/star.png';
import photoQuest from './../../assets/photos/10_9.jpg'

const TicketQuestionArea: FC = (props) => {
    const isFav = false
    const isPhoto = true
    return (
        <div className={styles.question}>
            <div className={styles.question__head}>
                <h2>Вопрос 1</h2>
                <div className={styles.question__fav}>
                    <img src={star} alt=""/>
                </div>
            </div>
            <div className={styles.question__image}>
                <img src={photoQuest} alt=""/>
            </div>
            <div className={styles.question__title}>
                <h3>
                    В каком случае водитель должен выполнить экстренную остановку ?
                </h3>
            </div>
            <div className={styles.question__questions}>
                <div className={styles.question__item}>
                    <span className={styles.item__num}>1.</span>
                    <span className={styles.item__text}>При условии недостаточной видимости</span>
                </div>
                <div className={styles.question__item}>
                    <span className={styles.item__num}>2.</span>
                    <span className={styles.item__text}>При условии недостаточной видимости</span>
                </div>
                <div className={styles.question__item}>
                    <span className={styles.item__num}>3.</span>
                    <span className={styles.item__text}>При условии недостаточной видимости</span>
                </div>
                <div className={styles.question__item}>
                    <span className={styles.item__num}>4.</span>
                    <span className={styles.item__text}>При условии недостаточной видимости</span>
                </div>

            </div>
        </div>
    );
}

export default TicketQuestionArea;