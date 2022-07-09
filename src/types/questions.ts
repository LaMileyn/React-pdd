interface question {
    title : string,
    ticket_number : string,
    image : string,
    question : string,
    answers : Array<answer>,
    correct_answer : string,
    answer_tip : string,
    topic : string
}
interface answer {
    answer_text : string,
    is_correct : boolean
}