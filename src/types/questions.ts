export interface IQuestion {
    [key: number] : any,
    id : string,
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
    [key : string] : {
        isCorrect : boolean,
        answer  : number,
        questionIndex : string,
    }
}
export interface IResult {
    id : string,
    ticketType : TicketType,
    checkedQuestions : ICheckedQuestions,
    timeFinished : string,
    topic : string,
    isPassed : boolean,
    currentTicket : IQuestion[]
}
export type TicketType = "exam" | "ticket" | "theme" | "mistakes" | "favourite"
