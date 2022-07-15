import React, {FC, useMemo} from 'react';
import styles from './ResultBanner.module.scss';
import heartImage from './../../../assets/photos/pdd_heart.svg'
import {ICheckedQuestions} from "../../../types/questions";
import {Link} from "react-router-dom";

interface ResultBannerProps {
    checkedQuestions: ICheckedQuestions,
    timeFinished: string,
    ticketId: string
}

const ResultBanner: FC<ResultBannerProps> = ({
                                                 checkedQuestions,
                                                 timeFinished, ticketId
                                             }) => {

    const [passed, correctQuestions, questions] = useMemo(() => {
        // console.log(checkedQuestions)
        const questions = Object.values(checkedQuestions)
        const correctQuestions = questions
            .reduce((acc, curr) => curr.isCorrect ? acc + 1 : acc, 0);
        const passed = correctQuestions >= questions.length
        return [passed, correctQuestions, questions]
    }, [checkedQuestions])
    console.log(passed)
    return (
        <div className={styles.banner}>
            <div className={styles.banner__top}>
                {
                    !passed
                        ? <h2 className={styles.fail}>К сожалению, вы не прошли тестирование :(</h2>
                        : <h2 className={styles.success}>Поздравляем, вы успешно прошли тестирование :)</h2>
                }
            </div>
            <div className={styles.banner__middle}>
                <div className={styles.text}>
                    {
                        correctQuestions !== questions.length && (
                            <div className={styles.wrongAnswersCount}>
                                Правильных ответов {correctQuestions} из {questions.length}
                            </div>
                        )
                    }
                    {
                        correctQuestions === questions.length && (
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
                <div className={styles.bottom__right}>
                    <Link to={`/ticket/${ticketId}`}>
                        <span>
                            Следующий билет {Number(ticketId)+1}
                        {/*     ИСПРАВИТЬ : СЕЙЧАС НЕТ ПРОВЕРКИ ЕСТЬ ЛИ СЛЕДУЮЩИЙ БИЛЕТ */}
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default ResultBanner;