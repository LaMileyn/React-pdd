import React, {FC, useEffect, useState} from 'react';
import styles from './TicketQuestionArea.module.scss';
import star from './../../assets/icons/star.png';
import upArrow from './../../assets/icons/corner-right-up.png'
import downArrow from './../../assets/icons/corner-right-down.png'
import cn from 'classnames'
import {ICheckedQuestions, IQuestion } from "../../types/questions";
import {useAppDispatch} from "../../utils/helpers/hooks";
import {checkedAdd} from "../../store/questions/questions.slice";
import {checkNextAnswerStep, getCorrectAnswer, parseQuestionImageUrl} from "../../utils/helpers/functions";
import {useNavigate} from "react-router-dom";


interface IProps {
    question: IQuestion,
    checkedQuestions: ICheckedQuestions,
    currentTicket: IQuestion[],
    currentQuestionNumber: number,
    setCurrentQuestionNumber?: (page: number) => void,
    finishTicketHandler? : () => void
}

const TicketQuestionArea: FC<IProps> = ({
                                            question,
                                            currentQuestionNumber,
                                            setCurrentQuestionNumber,
                                            checkedQuestions,
                                            currentTicket,
                                            finishTicketHandler
                                        }) => {


    const [showHelper, setShowHelper] = useState<boolean>(false)
    useEffect(() => {
        if (!setCurrentQuestionNumber){
            setShowHelper(true)
        }else setShowHelper(false)

    }, [checkedQuestions])
    const dispatch = useAppDispatch()
    const answerClickHandler = (questionIndex: string, id: number, answer: number, isCorrect: boolean, isDone: boolean) => {
        if (!isDone) {
            dispatch(checkedAdd({
                id,
                questionIndex,
                answer,
                isCorrect
            }))
            changeQuestionsHandler()
        }
    }
    const changeQuestionsHandler = () => {
        if ( finishTicketHandler ){
            let resCheckNext = checkNextAnswerStep(checkedQuestions, currentQuestionNumber, currentTicket.length)
            if (resCheckNext) {
                setCurrentQuestionNumber!(resCheckNext - 1)
            }
        }
    }
    useEffect( () =>{
        if ( finishTicketHandler){
            if (Object.values(checkedQuestions).length === currentTicket.length){
                finishTicketHandler()
            }
        }
    },[checkedQuestions])


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
                        const isDone = typeof checkedQuestions[question.id] == "object";
                        // нахождение того ответа по которому мы кликнули для  ( ваш ответ )
                        const isClickedCurrentAnswer = (index + 1) === checkedQuestions[question.id]?.answer
                        return (
                            <div className={styles.question__item} key={index} onClick={
                                () => answerClickHandler(question.title.split(" ")[1], question.id, index + 1, (index + 1) === correctAnswer, isDone)}>
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
                    {
                        Object.keys(checkedQuestions).length !== currentTicket.length - 1 && (
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