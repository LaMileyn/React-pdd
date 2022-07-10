import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IQuestion } from "../../types/questions";
import {fetchPdd} from "./questions.actions";


interface QuestionsData {
    topicsData: Array<IQuestion[]>,
    ticketsData: Array<IQuestion[]>,
    status: "loading" | "loaded"
}

const initialState: QuestionsData = {
    topicsData: [],
    ticketsData: [],
    status: "loaded"
}

export const questionsSlice = createSlice({
        name: "questions",
        initialState,
        reducers: {},
        extraReducers: builder => {
            builder.addCase(fetchPdd.pending, (state, action) => {
                state.status = "loading"
            })
            builder.addCase(fetchPdd.fulfilled, (state, {payload}) => {
                state.status = "loaded"
                const tickets: any = {};
                const topics : any = {};
                payload!.forEach(question => {
                    if (tickets[question.ticket_number]) {
                        tickets[question.ticket_number].push(question)
                    } else {
                        tickets[question.ticket_number] = []
                        tickets[question.ticket_number].push(question)
                    }
                })
                payload!.forEach(question => {
                    if (topics[question.topic]){
                        topics[question.topic].push(question)
                    }else{
                        topics[question.topic] = []
                        topics[question.topic].push(question)
                    }
                })
                console.log(tickets)
                state.ticketsData = Object.values(tickets)
                state.topicsData = Object.values(topics)

            })
            builder.addCase(fetchPdd.rejected, (state, {payload}) => {
                state.status = "loaded"
                console.log('rejected')
            })
        }
    }
)

export default questionsSlice.reducer