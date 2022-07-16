import React, {FC, useEffect, useMemo, useState} from 'react';
import styles from './ResultPage.module.scss';
import Paginator from "../../../components/Paginator/Paginator";
import Container from "../../../components/Container/Container";
import ResultBanner from "../ResultBanner/ResultBanner";
import ResultMistakes from "../ResultsMistakes/ResultMistakes";
import {useParams} from "react-router-dom";

import {IResult} from "../../../types/questions";

const ResultPage: FC = (props) => {

    const { resultId } = useParams()
    const [data,setData] = useState<IResult>()

    useEffect( () => {
        const localData = JSON.parse(localStorage.getItem("results")!)
        console.log(localData)
        setData(localData[String(resultId)])
    },[resultId])

    const [passed, correctQuestions, questions,questionsCount] = useMemo(() => {
        if ( !data ) return [];
        const questions = Object.values(data.checkedQuestions)
        const questionsCount = data.currentTicket.length
        const correctQuestions = questions
            .reduce((acc, curr) => curr.isCorrect ? acc + 1 : acc, 0);
        const passed = correctQuestions >= questions.length - 2
        return [passed, correctQuestions, questions,questionsCount]
    }, [resultId,data])

    if ( !data ) return <div>Loading.....</div>
    return (
        <section className={styles.resultPage}>
            <Container>
                <h1>{data.topic}</h1>
                <Paginator currentTicket={data.currentTicket}
                           checkedQuestions={data.checkedQuestions}
                />
                <ResultBanner passed={passed!}
                              correctQuestions={correctQuestions!}
                              questionsCount={questionsCount!}
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