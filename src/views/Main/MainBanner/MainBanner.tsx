import React, {FC} from 'react';
import styles from './MainBanner.module.scss';
import image from './../../../assets/icons/pdd_sofa.svg'

const MainBanner : FC = (props) => {
    return (
        <div className={styles.banner}>
            <div className={styles.banner__text}>
                <div className={styles.banner__title}>Думаешь, что уже готов?</div>
                <div className={styles.banner__subtitle}>Покажи, что ты можешь и реши экзамен</div>
                <div className={styles.banner__button}>
                    <button>Пройти экзамен</button>
                </div>
            </div>
            <div className={styles.banner__image}>
                <div className={styles.image}>
                    <img src={image} alt=""/>
                </div>
            </div>
        </div>
    );
}

export default MainBanner;