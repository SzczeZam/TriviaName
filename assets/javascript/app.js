var wrongCount = 0
var rightCount = 0
var timer = 60


var usedPool = []

var triviaPool = [
    q1 = {
        question: 'Is this a question?',

        answerChoices: ['yes','yes','no','yes technically but...'],

        correctAnswer: 'yes technically but...'
    },

    q2 = {
        question: 'Is this the second question?',

        answerChoices: ['yes','yes','no','I sure hope so'],

        correctAnswer: 'I sure hope so',
    },
]






function randomNum(fromNum,toNum) {
    var number = Math.floor((Math.random() * (toNum - fromNum) + fromNum))
    return number
}


function newQuestion () {
    var base = triviaPool[randomNum(0,2)]

    if (usedPool.includes(base)) {
        newQuestion()
    }

    $('#question').text(base.question)

    for (i=0; i < base.answerChoices.length; i++){
        $('#a' + i).text(base.answerChoices[i])
        $('#a' + i).attr('data-answer',base.answerChoices[i])
    }

    usedPool.push(base)
}



newQuestion()