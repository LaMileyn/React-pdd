export interface IQuestion {
    [key: number] : any,
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
// export interface ITopic {
//     [key: number] : any,
//     questions : Array<IQuestion>
// }
// export interface ITicket {
//     [key: number] : any,
//     questions : Array<IQuestion>
// }
