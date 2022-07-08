import React, {FC} from 'react';
import styles from './Tickets.module.scss';
import cn from 'classnames'

const Tickets : FC = (props) => {
    return (
        <div className={styles.tickets}>
            <div className={styles.tickets__title}>
                <h3>Билеты ПДД (категория A и B)</h3>
                <span>Сменить категорию на CD</span>
            </div>
            <div className={styles.tickets__mainContent}>
                <div className={styles.examBlock}>
                    <div className={styles.examBlock__category}>AB</div>
                    <div className={styles.examBlock__link}>Сдать экзамен</div>
                </div>
                <div className={styles.tickets__items}>
                    {
                        Array(24).fill(null).map( (el,index) => (
                            <div key={el}
                                 className={cn(styles.tickets__item)}>{index + 1}</div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default Tickets;