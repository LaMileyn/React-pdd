import React, {FC, memo, useMemo} from 'react';
import styles from './Paginator.module.scss';
import cn from 'classnames';
import {ICheckedQuestions, IQuestion} from "../../types/questions";
import {getCorrectAnswer} from "../../utils/helpers/functions";

interface PaginatorProps {
    setCurrentQuestionNumber?: (page: number) => void,
    currentQuestionNumber?: number,
    currentTicket: Array<IQuestion>,
    checkedQuestions: ICheckedQuestions
}

const Paginator: FC<PaginatorProps> = memo(({
                                           setCurrentQuestionNumber, currentQuestionNumber,
                                           checkedQuestions, currentTicket
                                       }) => {
    // const pages = useMemo(() => {
    //     return Array(currentTicket.length).fill(null).map((el, index) => index + 1)
    // }, [currentTicket])

    return (
        <div className={styles.paginator}>
            {
                currentTicket.map((question, index) => {
                    const isCorrect = checkedQuestions[question.id]?.answer === getCorrectAnswer(currentTicket[index])
                    console.log(question.id)
                    return (
                        <div
                            onClick={setCurrentQuestionNumber && (() => setCurrentQuestionNumber(index))}
                            className={cn(styles.page, {
                                [styles.wrong]: typeof checkedQuestions[question.id] == "object" && !isCorrect,
                                [styles.correct]: typeof checkedQuestions[question.id] == "object" && isCorrect,
                                [styles.active]: currentQuestionNumber === index,
                            })}>
                            {index+1}
                        </div>
                    )
                })
            }
        </div>
    );
})

export default Paginator;