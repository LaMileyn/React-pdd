import React, {FC, useEffect, useState} from 'react';
import styles from './TicketQuestionArea.module.scss';
import star from './../../assets/icons/star.png';
import photoQuest from './../../assets/photos/10_9.jpg'
import upArrow from './../../assets/icons/corner-right-up.png'
import downArrow from './../../assets/icons/corner-right-down.png'
import cn from 'classnames'
import {IQuestion} from "../../types/questions";
import {useAppDispatch} from "../../utils/helpers/hooks";
import {checkedAdd} from "../../store/questions/questions.slice";

interface IProps{
    question : IQuestion,
    answered : boolean,
    correct : boolean,
    currentQuestionNumber : number
}

const TicketQuestionArea: FC<IProps> = ( { question, correct, answered,currentQuestionNumber}) => {
    const isFav = false
    const isPhoto = false
    const [showHelper,setShowHelper] = useState<boolean>(false)
    useEffect( () => {
        setShowHelper(false)
    },[currentQuestionNumber])
    const dispatch = useAppDispatch()
    const answerClickHandler = ( question : string, answer : number ) =>{
        dispatch(checkedAdd({
            question,
            answer
        }))
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
                {
                    question.image
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
                    {question.question}
                </h3>
            </div>
            <div className={styles.question__questions}>
                {
                    question.answers.map( (answer,index) => (
                        <div className={styles.question__item} key={index} onClick={
                            () => answerClickHandler(question.title,index + 1 )}>
                            <span className={styles.item__num}>{index+1}.</span>
                            <span className={cn(styles.item__text,
                                {
                                    [styles.correctAnswer] : answered,
                                    [styles.answered] : answer.answer_text === question.correct_answer
                                }
                                )}>
                                { answer.answer_text }
                            </span>
                            {
                                answered && !correct && <span className={cn(styles.yourAnswerInCorrect)}>( Ваш ответ )</span>
                            }
                            {
                                answered && correct && <span className={cn(styles.yourAnswerCorrect)}>( Ваш ответ )</span>
                            }

                        </div>
                    ))
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
                                        <span onClick={ () => setShowHelper(false)}>Скрыть подсказку</span>
                                        <img src={upArrow} alt=""/>
                                    </>
                                )
                                : (
                                    <>
                                        <span onClick={ () => setShowHelper(true)}>Показать подсказку</span>
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