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
// export interface ITicket {
//     questions : Array<IQuestion>
// }
export type ITicket = Array<IQuestion>
export type ITopic = Array<IQuestion>

