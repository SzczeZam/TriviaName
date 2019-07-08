

var wrongCount = 0
var rightCount = 0

// COUNTDOWN TO 0
var timer = 60

// ARRAY OF USED QUESTIONS TO CHECK AGAINST WHEN PICKING NEW QUESTIONS
var usedPool = []

var tempCorrect = ''



// TRIVIA DATA ARRAY
var triviaPool = [

    //EACH QUESTION IS AN OBJECT CONTAINING
    q1 = {
        // the actually question
        question: 'Is this a question?',

        // the answer choices to update the DOM with
        answerChoices: ['yes','yes','no','yes technically but...'],

        // the correct answer stored seperately to check input against
        correctAnswer: 'yes technically but...'
    },

    q2 = {
        question: 'Is this the second question?',

        answerChoices: ['yes','yes','no','I sure hope so'],

        correctAnswer: 'I sure hope so',
    },

    // q3 = {
    //     question: ,

    //     answerChoices: [],

    //     correctAnswer: ,
    // },

    // q4 = {
    //     question: ,

    //     answerChoices: [],

    //     correctAnswer: ,
    // },

    // q5 = {
    //     question: ,

    //     answerChoices: [],

    //     correctAnswer: ,
    // },

    // q6 = {
    //     question: ,

    //     answerChoices: [],

    //     correctAnswer: ,
    // },

    // q7 = {
    //     question: ,

    //     answerChoices: [],

    //     correctAnswer: ,
    // },

    // q8 = {
    //     question: ,

    //     answerChoices: [],

    //     correctAnswer: ,
    // },

    // q9 = {
    //     question: ,

    //     answerChoices: [],

    //     correctAnswer: ,
    // },

    // q10 = {
    //     question: ,

    //     answerChoices: [],

    //     correctAnswer: ,
    // },
]




function randomNum(fromNum,toNum) {
    var number = Math.floor((Math.random() * (toNum - fromNum) + fromNum))
    return number
}

function youWon(){
    $('#question').text('CORRECT!!!')
    for (i=0; i < 4; i++){
        $('#a' + i).text('')
        $('#a' + i).attr('data-answer','')
    }
}

function youFailed(){
    $('#question').text('YOU FAILED')
    for (i=0; i < 4; i++){
        $('#a' + i).text('')
        $('#a' + i).attr('data-answer','')
    }
}


function newQuestion () {
    // PICKS RANDOM QUESTION
    var base = triviaPool[randomNum(0,2)]
    
    
    // TEST FOR REPEATING QUESTIONS
    if (usedPool.includes(base)) {                                  
        newQuestion()
    }
    
    // UPDATE DOM
    $('#question').text(base.question)
    
    for (i=0; i < base.answerChoices.length; i++){
        $('#a' + i).text(base.answerChoices[i])
        $('#a' + i).attr('data-answer',base.answerChoices[i])
    }
    
    // ADDS QUESTION TO THE USED ARRAY TO CHECK AGAINST 
    usedPool.push(base)
    tempCorrect = base.correctAnswer
}



$('.answerChoice').on('click', function(){
    var choice = $(this).attr('data-answer')
    
    if (choice === tempCorrect){
        youWon()
    } else {
        youFailed()
    }
})


// INITIALIZATION-------------------------------------------------------------------------------------------

newQuestion()