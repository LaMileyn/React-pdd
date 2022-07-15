import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ICheckedQuestions, IQuestion} from "../../types/questions";
import {fetchPdd} from "./questions.actions";


interface QuestionsData {
    topicsData: Array<IQuestion[]>,
    ticketsData: Array<IQuestion[]>,
    checkedQuestions : ICheckedQuestions
    status: "loading" | "loaded"
}

const initialState: QuestionsData = {
    topicsData: [],
    ticketsData: [],
    checkedQuestions : {},
    status: "loaded"
}
interface CheckedAddAction {
    question : string,
    answer : number
}

export const questionsSlice = createSlice({
        name: "questions",
        initialState,
        reducers: {
            checkedAdd : (state,{ payload : { answer, question}} : PayloadAction<CheckedAddAction>) =>{
                // @ts-ignore
                state.checkedQuestions[question] = answer
            }
        },
        extraReducers: builder => {
            builder.addCase(fetchPdd.pending, (state, action) => {
                state.status = "loading"
            })
            builder.addCase(fetchPdd.fulfilled, (state, {payload}) => {
                state.status = "loaded"
                const tickets: any = {};
                const topics : any = {};
                const data = payload!.map( el => ( {...el, id : ( Math.random() * new Date().getSeconds() )} ))
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
                state.ticketsData = Object.values(tickets)
                state.topicsData = Object.values(topics)

            })
            builder.addCase(fetchPdd.rejected, (state, {payload}) => {
                state.status = "loaded"
            })
        }
    }
)

export const { checkedAdd } = questionsSlice.actions
export default questionsSlice.reducer