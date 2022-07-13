import {IQuestion} from "../../types/questions";

export const getCorrectAnswer = ( quest : IQuestion) => Number(quest['correct_answer'].split(": ")[1]);

