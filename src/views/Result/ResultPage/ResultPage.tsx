import React, {FC, useMemo} from 'react';
import styles from './ResultPage.module.scss';
import Paginator from "../../../components/Paginator/Paginator";
import Container from "../../../components/Container/Container";
import ResultBanner from "../ResultBanner/ResultBanner";
import ResultMistakes from "../ResultsMistakes/ResultMistakes";
import {useParams} from "react-router-dom";
import {useAppSelector} from "../../../utils/helpers/hooks";

const ResultPage: FC = (props) => {

    const id = Number(useParams().id)
    const { ticketsData, checkedQuestions } = useAppSelector(state => state.pdd)
    const currentTicket = useMemo( () => {
        return ticketsData[id - 1]
    },[ticketsData])
    const withErrors = true
    return (
        <section className={styles.resultPage}>
            <Container>
                <h1>Билет 21. Результаты тренировки</h1>
                <Paginator currentTicket={currentTicket}
                           checkedQuestions={checkedQuestions}
                />
                <ResultBanner/>
                <ResultMistakes/>
            </Container>
        </section>
    );
}

export default ResultPage;