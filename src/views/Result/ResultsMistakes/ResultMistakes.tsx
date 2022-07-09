import React, {FC} from 'react';
import styles from './ResultsMistakes.module.scss';
import cn from 'classnames';
import TicketQuestionArea from "../../../components/TicketQuestionArea/TicketQuestionArea";

const ResultMistakes: FC = (props) => {
    const hasMistakes = true
    return (
        <div className={styles.mistakes}>
            {
                !hasMistakes
                    ? (
                        <div className={cn(styles.headline, styles.headlineSuccess)}>
                            <h2>Вы не допустили не одной ошибки</h2>
                        </div>
                    )
                    : (
                        <>
                            <div className={cn(styles.headline, styles.headlineFail)}>
                                <h2>Вы допустили 25 ошибок</h2>
                                <span>Прорешать ошибки</span>
                            </div>
                            <div className={styles.mistake__items}>
                                {
                                    Array(5).fill(null)
                                        .map((el, index) => (
                                            <div key={index} className={styles.mistake__item}>
                                                <TicketQuestionArea/>
                                            </div>
                                        ))
                                }
                            </div>
                        </>
                    )
            }
        </div>
    );
}

export default ResultMistakes;