import {ICheckedQuestions, IQuestion} from "../../types/questions";

export const getCorrectAnswer = ( quest : IQuestion) => Number(quest['correct_answer'].split(": ")[1]);

export const checkNextAnswerStep = (checkedQuestions : ICheckedQuestions, currentIndex : number, questionsCount : number) => {

    const arr = Array(questionsCount).fill(null).map( (el,index) => index + 1)
    const badNumbers = Object.values(checkedQuestions).map( el => Number(el.questionIndex))
    const closestRight = arr.find( numb => ( numb > currentIndex + 1 ) && ( badNumbers.indexOf(numb) === -1 ) )
    let furthestLeft;
    for ( let numb of arr){
        if ( ( numb < currentIndex + 1) && ( badNumbers.indexOf(numb) === -1 ) ){
            furthestLeft = numb
            break
        }
    }
    // без учета ( -1 ) от числа для индекса страницы
    return closestRight ? closestRight : furthestLeft
}
export const parseQuestionImageUrl = ( url : string) => {
    return url.split("images/")[1]
}

export const getTimerTime = (sec : number ) => {
    let min : string | number = Math.floor( sec / 60);
    let seconds : string | number = Math.floor( sec % 60 );
    if ( min < 10 ) min = "0" + min
    if ( seconds < 10 ) seconds = "0" + seconds
    return `${min}:${seconds}`

}

const getRandomNumbersInRange = (min: number, max:number, count:number) => {
    let randomNumbers = [];
    while (randomNumbers.length < count) {
        randomNumbers.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    let uniqueNumbers = new Set();
    randomNumbers.forEach(
        n => {
            if (!uniqueNumbers.has(n)) {
                uniqueNumbers.add(n);
                return;
            }
            let i = 1;
            while (true) {
                const more = n + i;
                if (more <= max && !uniqueNumbers.has(more)) {
                    uniqueNumbers.add(more);
                    return;
                }
                const less = n - i;
                if (less >= min && !uniqueNumbers.has(less)) {
                    uniqueNumbers.add(less);
                    return;
                }
                i++;
            }
        }
    );

    return Array.from(uniqueNumbers);
}
export const generateArrayOfQuestions = ( questions : IQuestion[], count : number) => {
    return getRandomNumbersInRange(0,questions.length,count).map( element => questions[Number(element)]);
}

export const localStorageAdd = (key : string, newObj : any) =>{
    const localStorageData = JSON.parse(localStorage.getItem(key) || "{}");
    if (localStorageData[newObj.id]) return;
    const data = { ...localStorageData, [newObj.id] : newObj}
    localStorage.setItem(key,JSON.stringify(data))
}