export interface IQuestion {
    [key: number] : any,
    // id : number,
    title : string,
    ticket_number : string,
    image : string,
    question : string,
    answers : Array<IAnswer>,
    correct_answer : string,
    answer_tip : string,
    topic : string
}
export interface IAnswer {
    answer_text : string,
    is_correct : boolean
}

export interface ICheckedQuestions {
    [key : string] : string
}


