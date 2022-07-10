import React, {FC} from 'react';
import styles from './MainPage.module.scss';
import Container from "../../../components/Container/Container";
import MainBanner from "../MainBanner/MainBanner";
import Tickets from "../Tickets/Tickets";
import {ButtonIcon} from "../../../components/buttons";
import alertTriange from './../../../assets/icons/alert-triangle.svg'
import favourite from '../../../assets/icons/favourite.svg'
import clock from '../../../assets/icons/clock.svg'
import PddTopics from "../PddTopics/PddTopics";
import {useAppSelector} from "../../../utils/helpers/hooks";

const MainPage: FC = (props) => {

    const { tickesData, topicsData, status} = useAppSelector( state => state.pdd )

    if (status === "loading") return <div>Loading..</div>
    return (
        <section className={styles.mainPage}>
            <Container>
                <h1>ПДД 2022: Правила дорожного движения онлайн экзамен и билеты как в ГИБДД, ГАИ РФ</h1>
                <MainBanner/>
                <Tickets tickets={tickesData}/>
                <div className={styles.mainPage__buttonCategorysTickets}>
                    <ButtonIcon variant={"purple"}>
                        <img src={favourite} alt=""/>
                        Избранное
                    </ButtonIcon>
                    <ButtonIcon variant={"red"}>
                        <img src={alertTriange} alt=""/>
                        Мои ошибки
                    </ButtonIcon>
                </div>
                <PddTopics topics={topicsData}/>
                <ButtonIcon variant={"blue"}>
                    <img src={clock} alt=""/>
                    Пройти марафон
                </ButtonIcon>
            </Container>
        </section>
    );
}

export default MainPage;