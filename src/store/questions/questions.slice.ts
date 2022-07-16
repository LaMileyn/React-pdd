import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ICheckedQuestions, IQuestion} from "../../types/questions";
import {fetchPdd} from "./questions.actions";
import {nanoid} from "nanoid";


interface QuestionsData {
    allQuestions : Array<IQuestion>,
    topicsData: Array<IQuestion[]>,
    ticketsData: Array<IQuestion[]>,
    checkedQuestions : ICheckedQuestions
    status: "loading" | "loaded"
}

const initialState: QuestionsData = {
    allQuestions : [],
    topicsData: [],
    ticketsData: [],
    checkedQuestions : {},
    status: "loaded"
}
interface CheckedAddAction {
    id : string,
    questionIndex : string
    answer : number,
    isCorrect : boolean
}

export const questionsSlice = createSlice({
        name: "questions",
        initialState,
        reducers: {
            checkedAdd : (state,{ payload : { answer, id, isCorrect, questionIndex}} : PayloadAction<CheckedAddAction>) =>{
                state.checkedQuestions[id] = {
                    answer,
                    isCorrect,
                    questionIndex
                }
            },
            checkedDelete : (state) => {
                state.checkedQuestions = {}
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
                const data = payload.map( el => ( {...el, id : nanoid()} ))
                state.allQuestions = data
                data!.forEach(question => {
                    if (tickets[question.ticket_number]) {
                        tickets[question.ticket_number].push(question)
                    } else {
                        tickets[question.ticket_number] = []
                        tickets[question.ticket_number].push(question)
                    }
                })
                data!.forEach(question => {
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

export const { checkedAdd, checkedDelete } = questionsSlice.actions
export default questionsSlice.reducer