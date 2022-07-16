import React, {FC} from 'react';
import styles from './ResultsMistakes.module.scss';
import cn from 'classnames';
import TicketQuestionArea from "../../../components/TicketQuestionArea/TicketQuestionArea";
import {ICheckedQuestions, IQuestion} from "../../../types/questions";



interface ResultBannerProps {
    passed : boolean,
    questionsCount : number,
    correctQuestions : number,
    currentTicket : IQuestion[],
    checkedQuestions : ICheckedQuestions
}
const ResultMistakes: FC<ResultBannerProps> = ({ passed, correctQuestions, questionsCount,checkedQuestions,currentTicket}) => {
    return (
        <div className={styles.mistakes}>
            {
                passed
                    ? (
                        <div className={cn(styles.headline, styles.headlineSuccess)}>
                            <h2>Вы не допустили не одной ошибки</h2>
                        </div>
                    )
                    : (
                        <>
                            <div className={cn(styles.headline, styles.headlineFail)}>
                                <h2>Вы допустили { questionsCount - correctQuestions } ошибок</h2>
                                <span>Прорешать ошибки</span>
                            </div>
                            <div className={styles.mistake__items}>
                                {
                                    Object.keys(checkedQuestions).filter( el => !checkedQuestions[el].isCorrect)
                                        .sort( (a,b) => Number(checkedQuestions[a].questionIndex) - Number(checkedQuestions[b].questionIndex))
                                        .map( curr => {
                                            const question : IQuestion = currentTicket.find( quest => quest.id === curr)!
                                            return (
                                                <div key={question.id} className={styles.mistake__item}>
                                                    <TicketQuestionArea question={question}
                                                                        currentTicket={currentTicket}
                                                                        checkedQuestions={checkedQuestions}
                                                        // currentQuestionNumber={Number(question.title.split(" ")[1]) - 1}
                                                                        currentQuestionNumber={Number(checkedQuestions[curr].questionIndex) - 1}

                                                    />
                                                </div>
                                            )
                                        })
                                }
                            </div>
                        </>
                    )
            }
        </div>
    );
}

export default ResultMistakes;