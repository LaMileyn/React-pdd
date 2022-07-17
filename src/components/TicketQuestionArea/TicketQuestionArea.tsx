import React, {FC, useEffect, useMemo, useState} from 'react';
import styles from './TicketQuestionArea.module.scss';
import star from './../../assets/icons/star.png';
import upArrow from './../../assets/icons/corner-right-up.png'
import downArrow from './../../assets/icons/corner-right-down.png'
import cn from 'classnames'
import {ICheckedQuestions, IQuestion} from "../../types/questions";
import {useAppDispatch} from "../../utils/helpers/hooks";
import {checkedAdd} from "../../store/questions/questions.slice";
import {
    checkNextAnswerStep,
    getCorrectAnswer,
    localStorageAdd,
    parseQuestionImageUrl
} from "../../utils/helpers/functions";


interface IProps {
    question: IQuestion,
    checkedQuestions: ICheckedQuestions,
    currentTicket: IQuestion[],
    currentQuestionNumber: number,
    setCurrentQuestionNumber?: (page: number) => void,
    finishTicketHandler?: () => void,
    isExam?: boolean
}

const TicketQuestionArea: FC<IProps> = ({
                                            question,
                                            currentQuestionNumber,
                                            setCurrentQuestionNumber,
                                            checkedQuestions,
                                            currentTicket,
                                            finishTicketHandler, isExam
                                        }) => {

    const [showHelper, setShowHelper] = useState<boolean>(false)
    useEffect(() => {
        if (!setCurrentQuestionNumber) {
            setShowHelper(true)
        } else setShowHelper(false)
    }, [checkedQuestions])
    const isFavourite = JSON.parse(localStorage.getItem("favouriteQuestions") || "{}" )[question.id]
    const dispatch = useAppDispatch()
    const answerClickHandler = (questionIndex: string, id: string, answer: number, isCorrect: boolean, isDone: boolean) => {
        if (!isDone) {
            dispatch(checkedAdd({
                id,
                questionIndex,
                answer,
                isCorrect
            }))
            if (!isCorrect){
                localStorageAdd("mistakes",question)
            }
            changeQuestionsHandler()
        }
    }
    const changeQuestionsHandler = () => {
        if (finishTicketHandler) {
            let resCheckNext = checkNextAnswerStep(checkedQuestions, currentQuestionNumber, currentTicket.length)
            if (resCheckNext) {
                setCurrentQuestionNumber!(resCheckNext - 1)
            }
        }
    }
    useEffect(() => {
        if (finishTicketHandler) {
            if (Object.values(checkedQuestions).length === currentTicket.length) {
                finishTicketHandler()
            }
        }
    }, [checkedQuestions])
    const localStorageFavouriteHandler = () => localStorageAdd("favouriteQuestions", question)

    return (
        <div className={styles.question}>
            <div className={styles.question__head}>
                <h2>Вопрос {currentQuestionNumber + 1}</h2>
                <div className={styles.question__fav} onClick={localStorageFavouriteHandler}>
                    <svg width="118" height="113" viewBox="0 0 118 113" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M57.9167 0L75.8129 36.2558L115.833 42.1054L86.875 70.3108L93.7092 110.158L57.9167 91.3346L22.1242 110.158L28.9583 70.3108L0 42.1054L40.0204 36.2558L57.9167 0Z"
                              fill={`${isFavourite ? "#1C75D4" : "" }`} stroke="#1C75D4" strokeWidth={4}  strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
            </div>
            <div className={styles.question__image}>
                <img src={require(`./../../assets/ticketPhotos/${parseQuestionImageUrl(question.image)}`)} alt=""/>
            </div>
            <div className={styles.question__title}>
                <h3>
                    {question.question}
                </h3>
            </div>
            <div className={styles.question__questions}>
                {
                    question.answers.map((answer, index) => {
                        // номер правильного ответа
                        const correctAnswer = getCorrectAnswer(currentTicket.find(el => el.id === question.id)!)
                        const isCorrect = (index + 1) === correctAnswer
                        // ответили ли мы ( кликнули ли мы на ответ )
                        const isDone = typeof checkedQuestions[question.id] == "object";
                        // нахождение того ответа по которому мы кликнули для  ( ваш ответ )
                        const isClickedCurrentAnswer = (index + 1) === checkedQuestions[question.id]?.answer
                        return (
                            <div className={styles.question__item} key={index} onClick={
                                () => answerClickHandler(String(currentQuestionNumber + 1), question.id, index + 1, (index + 1) === correctAnswer, isDone)}>
                                <span className={styles.item__num}>{index + 1}.</span>
                                <span className={cn(styles.item__text,
                                    {
                                        // correct answer - желтый фон настоящего правильного ответа
                                        [styles.correctAnswer]: isCorrect && isDone,
                                        // answered - выбрали ли уже ответ - нажать нельзя потом
                                        [styles.answered]: isDone
                                    }
                                )}>
                                {answer.answer_text}
                            </span>
                                {
                                    isClickedCurrentAnswer && isDone && !isCorrect &&
                                    <span className={cn(styles.yourAnswerInCorrect)}>( Ваш ответ )</span>
                                }
                                {
                                    isClickedCurrentAnswer && isDone && isCorrect &&
                                    <span className={cn(styles.yourAnswerCorrect)}>( Ваш ответ )</span>
                                }

                            </div>
                        )
                    })
                }

            </div>

            <div className={styles.question__bottom}>
                {
                    showHelper && (
                        <div className={styles.extraBlock}>
                            <div className={styles.extraBlock__answerTitle}>
                                {question.correct_answer}
                            </div>
                            <div className={styles.extraBlock__answerText}>
                                {question.answer_tip}
                            </div>
                        </div>
                    )
                }

                <div className={styles.helperAndSkip}>
                    { !isExam && (
                        <div className={styles.helper}>
                            {
                                showHelper
                                    ? (
                                        <>
                                            <span onClick={() => setShowHelper(false)}>Скрыть подсказку</span>
                                            <img src={upArrow} alt=""/>
                                        </>
                                    )
                                    : (
                                        <>
                                            <span onClick={() => setShowHelper(true)}>Показать подсказку</span>
                                            <img src={downArrow} alt=""/>
                                        </>
                                    )
                            }

                        </div>
                    )}

                    {
                        Object.keys(checkedQuestions).length !== currentTicket.length - 1 && finishTicketHandler && (
                            (
                                <span className={styles.skip} onClick={changeQuestionsHandler}>
                                Пропустить
                            </span>
                            )
                        )
                    }


                </div>
            </div>


        </div>
    );
}

export default TicketQuestionArea;