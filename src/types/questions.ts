export interface IQuestion {
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
export interface ITicket {
    ticket_number : number,
    questions : Array<IQuestion>
}
export interface ITopic{
    topic : string,
    questions : Array<IQuestion>
}
