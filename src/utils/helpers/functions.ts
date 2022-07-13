import {ICheckedQuestions, IQuestion} from "../../types/questions";

export const getCorrectAnswer = ( quest : IQuestion) => Number(quest['correct_answer'].split(": ")[1]);

export const checkNextAnswerStep = (checkedQuestions : ICheckedQuestions, currentIndex : number, questionsCount : number) => {
    const arr = Array(questionsCount).fill(null).map( (el,index) => index + 1)
    const badNumbers = Object.keys(checkedQuestions).map( el => Number(el.split(" ")[1]))
    const closestRight = arr.find( numb => ( numb > currentIndex + 1 ) && ( badNumbers.indexOf(numb) === -1 ) )
    let furthestLeft;
    for ( let numb of arr){
        if ( ( numb < currentIndex + 1)&& ( badNumbers.indexOf(numb) === -1 ) ){
            furthestLeft = numb
            break
        }
    }
    // без учета ( -1 ) от числа для индекса страницы
    return closestRight ? closestRight : ( furthestLeft ? furthestLeft : null )
}
export const parseQuestionImageUrl = ( url : string) => {
    console.log(url.split("images/")[1])
    return url.split("images/")[1]
}

export const getTimerTime = (sec : number ) => {
    let min : string | number = Math.floor( sec / 60);
    let seconds : string | number = Math.floor( sec % 60 );
    if ( min < 10 ) min = "0" + min
    if ( seconds < 10 ) seconds = "0" + seconds
    return `${min}:${seconds}`

}
