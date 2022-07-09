import React, {FC} from 'react';
import styles from './ResultBanner.module.scss';
import heartImage from './../../../assets/photos/pdd_heart.svg'

const ResultBanner: FC = (props) => {
    const passed = false
    return (
        <div className={styles.banner}>
            <div className={styles.banner__top}>
                {
                    passed
                        ? <h2 className={styles.fail}>К сожалению, вы не прошли тестирование :(</h2>
                        : <h2 className={styles.success}>Поздравляем, вы успешно прошли тестирование :)</h2>
                }
            </div>
            <div className={styles.banner__middle}>
                <div className={styles.text}>
                    <div className={styles.wrongAnswersCount}>
                        Правильных ответов 5 из 20
                    </div>
                    <div className={styles.timeFinished}>
                        Время тестирования:  08:50
                    </div>
                </div>
                <div className={styles.image}>
                    <img src={heartImage} alt=""/>
                </div>

            </div>
            <div className={styles.banner__bottom}>
                <div className={styles.bottom__left}>
                    <span>Пройти тест еще раз</span>
                    <span>Выбрать другой билет</span>
                </div>
                <div className={styles.bottom__right}>
                    <span>
                    Следующий билет 22
                    </span>
                </div>
            </div>
        </div>
    );
}

export default ResultBanner;