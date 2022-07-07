import React, {FC} from 'react';
import styles from './MainPage.module.scss';
import Container from "../../../components/Container/Container";

const MainPage: FC = (props) => {
    return (
        <section className={styles.mainPage}>
            <Container>
                <h1>hello</h1>
            </Container>
        </section>
    );
}

export default MainPage;