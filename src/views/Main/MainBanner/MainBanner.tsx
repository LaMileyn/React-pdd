import React, {FC} from 'react';
import styles from './MainBanner.module.scss';
import image from '../../../assets/photos/pdd_sofa.svg'
import {ButtonStandart} from "../../../components/buttons";
import {Link} from "react-router-dom";

const MainBanner: FC = (props) => {
    return (
        <div className={styles.banner}>
            <div className={styles.banner__text}>
                <div className={styles.banner__title}>Думаешь, что уже готов?</div>
                <div className={styles.banner__subtitle}>
                    Покажи, что ты можешь и реши экзамен без единой ошибки
                </div>
                <div className={styles.banner__button}>
                    <Link to={`exam`}>
                        <ButtonStandart variant={"primary"}>
                            Пройти экзамен
                        </ButtonStandart>
                    </Link>
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