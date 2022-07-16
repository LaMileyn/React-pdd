import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {IQuestion} from "../../types/questions";


export const fetchPdd = createAsyncThunk(
    "pdd/fetchData",
    async () => {
        const {data} = await axios.get<Array<IQuestion>>("https://raw.githubusercontent.com/etspring/pdd_russia/master/questions.json");
        return data
    }
)