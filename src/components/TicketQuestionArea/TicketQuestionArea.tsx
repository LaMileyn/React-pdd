import React, {FC, useState} from 'react';
import styles from './TicketQuestionArea.module.scss';
import star from './../../assets/icons/star.png';
import photoQuest from './../../assets/photos/10_9.jpg'
import upArrow from './../../assets/icons/corner-right-up.png'
import downArrow from './../../assets/icons/corner-right-down.png'
import cn from 'classnames'

const TicketQuestionArea: FC = (props) => {
    const isFav = false
    const isPhoto = false
    const [showHelper,setShopHelper] = useState<boolean>(true)
    return (
        <div className={styles.question}>
            <div className={styles.question__head}>
                <h2>Вопрос 1</h2>
                <div className={styles.question__fav}>
                    <img src={star} alt=""/>
                </div>
            </div>
            <div className={styles.question__image}>
                {
                    isPhoto
                        ? <img src={photoQuest} alt=""/>
                        : (
                            <div className={styles.noImage}>
                                Вопрос без изображения
                            </div>
                        )
                }

            </div>
            <div className={styles.question__title}>
                <h3>
                    В каком случае водитель должен выполнить экстренную остановку ?
                </h3>
            </div>
            <div className={styles.question__questions}>
                <div className={styles.question__item}>
                    <span className={styles.item__num}>1.</span>
                    <span className={cn(styles.item__text,styles.answered,styles.correctAnswer)}>При условии недостаточной видимости</span>
                    <span className={cn(styles.yourAnswerInCorrect)}>( Ваш ответ )</span>
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
            <div className={styles.question__bottom}>
                {
                    showHelper && (
                        <div className={styles.extraBlock}>
                            <div className={styles.extraBlock__answerTitle}>
                                Правильный ответ: 3
                            </div>
                            <div className={styles.extraBlock__answerText}>
                                «Недостаточная видимость» – видимость дороги менее 300м в условиях тумана, дождя, снегопада и тому
                                подобного, а также в сумерки. Пункт 1.2 термин «Недостаточная видимость».
                            </div>
                        </div>
                    )
                }

                <div className={styles.helperAndSkip}>
                    <div className={styles.helper}>
                        {
                            showHelper
                                ? (
                                    <>
                                        <span onClick={ () => setShopHelper(false)}>Скрыть подсказку</span>
                                        <img src={upArrow} alt=""/>
                                    </>
                                )
                                : (
                                    <>
                                        <span onClick={ () => setShopHelper(true)}>Показать подсказку</span>
                                        <img src={downArrow} alt=""/>
                                    </>
                                )
                        }

                    </div>
                    <span className={styles.skip}>
                        Пропустить
                    </span>
                </div>
            </div>

        </div>
    );
}

export default TicketQuestionArea;