import React, {FC} from 'react';
import styles from './MainPage.module.scss';
import Container from "../../../components/Container/Container";
import MainBanner from "../MainBanner/MainBanner";

const MainPage: FC = (props) => {
    return (
        <section className={styles.mainPage}>
            <Container>
                <h1>ПДД 2022: Правила дорожного движения онлайн экзамен и билеты как в ГИБДД, ГАИ РФ</h1>
                <MainBanner/>
            </Container>
        </section>
    );
}

export default MainPage;