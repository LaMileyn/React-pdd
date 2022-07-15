import React, {FC, useEffect, useMemo, useState} from 'react';
import styles from './ResultPage.module.scss';
import Paginator from "../../../components/Paginator/Paginator";
import Container from "../../../components/Container/Container";
import ResultBanner from "../ResultBanner/ResultBanner";
import ResultMistakes from "../ResultsMistakes/ResultMistakes";
import {useParams} from "react-router-dom";
import {useAppSelector} from "../../../utils/helpers/hooks";
import {IResult} from "../../../types/questions";

const ResultPage: FC = (props) => {

    const { resultId } = useParams()
    const { ticketsData } = useAppSelector(state => state.pdd)
    const [data,setData] = useState<IResult>()

    useEffect( () => {
        const localData = JSON.parse(localStorage.getItem("results")!)
        setData(localData[Number(resultId)])
        console.log(localData[Number(resultId)])
    },[resultId])

    const [passed, correctQuestions, questions] = useMemo(() => {
        if ( !data ) return [];
        const questions = Object.values(data.checkedQuestions)
        const correctQuestions = questions
            .reduce((acc, curr) => curr.isCorrect ? acc + 1 : acc, 0);
        const passed = correctQuestions >= questions.length
        return [passed, correctQuestions, questions]
    }, [resultId,data])

    if ( !data ) return <div>Loading.....</div>
    return (
        <section className={styles.resultPage}>
            <Container>
                <h1>{data.topic}. Результаты тренировки</h1>
                <Paginator currentTicket={data.currentTicket}
                           checkedQuestions={data.checkedQuestions}
                />
                <ResultBanner passed={passed!}
                              correctQuestions={correctQuestions!}
                              questionsCount={questions!.length}
                              timeFinished={data.timeFinished}
                              ticketId={data.currentTicket[0].ticket_number.split(" ")[1]}
                />
                <ResultMistakes passed={passed!}
                                checkedQuestions={data.checkedQuestions}
                                currentTicket={data.currentTicket}
                                correctQuestions={correctQuestions!}
                                questionsCount={questions!.length}/>
            </Container>
        </section>
    );
}

export default ResultPage;