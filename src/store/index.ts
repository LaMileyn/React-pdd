import { configureStore } from "@reduxjs/toolkit";
import questionsReducer from './questions/questions.slice'



export const store = configureStore({
    reducer : {
        pdd :  questionsReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch