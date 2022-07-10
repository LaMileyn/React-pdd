import React, {FC, useMemo} from 'react';
import styles from './Paginator.module.scss';
import cn from 'classnames';
import {ICheckedQuestions, IQuestion} from "../../types/questions";
import {getCorrectAnswer} from "../../utils/helpers/functions";

interface PaginatorProps{
    setCurrentQuestionNumber? : (page : number) => void,
    currentQuestionNumber? : number,
    currentTicket : Array<IQuestion>,
    checkedQuestions : ICheckedQuestions
}
const Paginator : FC<PaginatorProps> = ({  setCurrentQuestionNumber,currentQuestionNumber,
                                        checkedQuestions, currentTicket}) => {
    const pages = useMemo( () => {
        return Array(currentTicket.length).fill(null).map( (el,index) => index + 1)
    },[currentTicket])

    return (
        <div className={styles.paginator}>
            {
                pages.map( (page,index) => {
                    // @ts-ignore
                    const isCorrect = checkedQuestions["Вопрос "+(index+1)] == getCorrectAnswer(currentTicket[index])
                    return(
                    <div
                        onClick={ setCurrentQuestionNumber && ( () => setCurrentQuestionNumber(page - 1) )}
                        className={cn(styles.page, {
                            [styles.wrong] : typeof checkedQuestions["Вопрос "+(index+1)] == "number" && !isCorrect,
                            [styles.correct] : typeof checkedQuestions["Вопрос "+(index+1)] == "number" && isCorrect,
                            [styles.active] : currentQuestionNumber === index ,
                        })}>
                        { page }
                    </div>
                )
            })
            }
        </div>
    );
}

export default Paginator;