import React, {FC, useEffect, useState} from 'react';
import styles from './TicketQuestionArea.module.scss';
import star from './../../assets/icons/star.png';
import photoQuest from './../../assets/photos/10_9.jpg'
import upArrow from './../../assets/icons/corner-right-up.png'
import downArrow from './../../assets/icons/corner-right-down.png'
import cn from 'classnames'
import {ICheckedQuestions, IQuestion} from "../../types/questions";
import {useAppDispatch} from "../../utils/helpers/hooks";
import {checkedAdd} from "../../store/questions/questions.slice";
import {checkNextAnswerStep, getCorrectAnswer, parseQuestionImageUrl} from "../../utils/helpers/functions";


interface IProps {
    question: IQuestion,
    currentQuestionNumber: number,
    setCurrentQuestionNumber?: (page: number) => void,
    checkedQuestions: ICheckedQuestions,
    currentTicket: IQuestion[]
}

const TicketQuestionArea: FC<IProps> = ({
                                            question,
                                            currentQuestionNumber,
                                            setCurrentQuestionNumber,
                                            checkedQuestions,
                                            currentTicket
                                        }) => {
    const isFav = false
    const isPhoto = false
    const [showHelper, setShowHelper] = useState<boolean>(false)
    useEffect(() => {
        setShowHelper(false)
    }, [currentQuestionNumber])
    const dispatch = useAppDispatch()
    const answerClickHandler = (question: string, answer: number, isDone: boolean) => {
        if (!isDone) {
            dispatch(checkedAdd({
                question,
                answer
            }))
            // последний ответ
            let resCheckNext = checkNextAnswerStep(checkedQuestions,currentQuestionNumber,currentTicket.length)
            if(resCheckNext){
                setCurrentQuestionNumber!(resCheckNext - 1)
            }else{
                console.log("КОНЕЦ")
            }
        }
    }



    return (
        <div className={styles.question}>
            <div className={styles.question__head}>
                <h2>{question.title}</h2>
                <div className={styles.question__fav}>
                    <img src={star} alt=""/>
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
                        const correctAnswer = getCorrectAnswer(currentTicket[currentQuestionNumber])
                        // нахождение правильного ответа в списке ответов - подсветка
                        const isCorrect = (index + 1) === correctAnswer
                        // ответили ли мы ( кликнули ли мы на ответ )
                        const isDone = typeof checkedQuestions["Вопрос " + (currentQuestionNumber + 1)] == "number";
                        // нахождение того ответа по которому мы кликнули для  ( ваш ответ )
                        const isClickedCurrentAnswer = (index + 1) === Number(checkedQuestions["Вопрос " + (currentQuestionNumber + 1)])
                        return (
                            <div className={styles.question__item} key={index} onClick={
                                () => answerClickHandler(question.title, index + 1, isDone)}>
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
                    {}

                    <span className={styles.skip}>
                        Пропустить
                    </span>
                </div>
            </div>

        </div>
    );
}

export default TicketQuestionArea;