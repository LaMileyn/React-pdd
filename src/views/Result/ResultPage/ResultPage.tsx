import React, {FC} from 'react';
import styles from './ResultPage.module.scss';
import Paginator from "../../../components/Paginator/Paginator";
import Container from "../../../components/Container/Container";
import ResultBanner from "../ResultBanner/ResultBanner";
import ResultMistakes from "../ResultsMistakes/ResultMistakes";

const ResultPage: FC = (props) => {
    const withErrors = true
    return (
        <section className={styles.resultPage}>
            <Container>
                <h1>Билет 21. Результаты тренировки</h1>
                <Paginator itemsCount={12}/>
                <ResultBanner/>
                <ResultMistakes/>
            </Container>
        </section>
    );
}

export default ResultPage;