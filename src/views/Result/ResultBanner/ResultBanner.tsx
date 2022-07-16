import React, {FC, useMemo} from 'react';
import styles from './ResultBanner.module.scss';
import heartImage from './../../../assets/photos/pdd_heart.svg'
import {ICheckedQuestions, TicketType} from "../../../types/questions";
import {Link} from "react-router-dom";
import cn from 'classnames'

interface ResultBannerProps {
    passed : boolean,
    questionsCount : number,
    correctQuestions : number,
    timeFinished: string,
    ticketId: string,
    type : TicketType
}

const ResultBanner: FC<ResultBannerProps> = ({
                                                 correctQuestions,passed,
                                                 timeFinished, ticketId,questionsCount, type
                                             }) => {
    return (
        <div className={styles.banner}>
            <div className={styles.banner__top}>
                {
                    !passed
                        ? <h2 className={ cn({
                            [styles.fail] : type === "exam" || type == "ticket"
                        })}>К сожалению, вы не прошли тестирование :(</h2>
                        : <h2 className={ cn({
                            [styles.success] : type === "exam" || type == "ticket"
                        })}>Поздравляем, вы успешно прошли тестирование :)</h2>
                }

            </div>
            <div className={styles.banner__middle}>
                <div className={styles.text}>
                    {
                        correctQuestions !== questionsCount && (
                            <div className={styles.wrongAnswersCount}>
                                Правильных ответов {correctQuestions} из {questionsCount}
                            </div>
                        )
                    }
                    {
                        correctQuestions === questionsCount && (
                            <div className={styles.wrongAnswersCount}>
                                Вы правильно ответили на все вопросы
                            </div>
                        )
                    }
                    <div className={styles.timeFinished}>
                        Время тестирования: {timeFinished}
                    </div>
                </div>
                <div className={styles.image}>
                    <img src={heartImage} alt=""/>
                </div>

            </div>
            <div className={styles.banner__bottom}>
                <div className={styles.bottom__left}>
                    <Link to={`/`}><span>Выбрать другой билет</span></Link>
                    <Link to={`/ticket/${ticketId}`}><span>Пройти тест еще раз</span></Link>
                </div>
                { type === "ticket"  && <div className={styles.bottom__right}>
                    <Link to={`/ticket/${ticketId}`}>
                        <span>
                            Следующий билет {Number(ticketId)+1}
                            {/*     ИСПРАВИТЬ : СЕЙЧАС НЕТ ПРОВЕРКИ ЕСТЬ ЛИ СЛЕДУЮЩИЙ БИЛЕТ */}
                        </span>
                    </Link>
                </div> }

            </div>
        </div>
    );
}

export default ResultBanner;