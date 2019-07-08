

var wrongCount = 0
var rightCount = 0

// COUNTDOWN TO 0
var countdown = 30

// ARRAY OF USED QUESTIONS TO CHECK AGAINST WHEN PICKING NEW QUESTIONS
var usedPool = []

var questionCount = 0
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

    q3 = {
        question:'This is the third question, how are you?' ,

        answerChoices: ['eh','good','bad','so tired, I am so tired'],

        correctAnswer: 'so tired, I am so tired',
    },

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

function clear() {
    $(".answerChoice").empty()
    $(".answerChoice").attr('style','display: none')
    $('#timer').empty()
    $(".appendage").attr('style','display: none')
    
}


function randomNum(fromNum,toNum) {
    var number = Math.floor((Math.random() * (toNum - fromNum) + fromNum))
    return number
}

function youWon(){
    rightCount++
    $('#question').text('CORRECT!!!')
    clear()        
    setTimeout(function(){ newQuestion(); }, 3000);
}

function youFailed(){
    wrongCount++
    $('#question').text('YOU FAILED')
    clear()
    setTimeout(function(){ newQuestion(); }, 3000);
}

function endScreen(){
    clear()
    $('#question').text('GAME OVER')
    $('#answerList').append('<p class="appendage" style="display: block">Correct Answers: ' + rightCount + '</p>')
    $('#answerList').append('<p class="appendage" style="display: block">Failures: ' + wrongCount + '</p>')
}


function newQuestion () {

    countdown = 10
    
    timer = setInterval(function(){
        countdown--
        if (countdown < 1) {
            clearInterval(timer)
            youFailed()
         }else{   
            $('#timer').text(countdown)
        }
    },1000);    
    
    if (questionCount >= triviaPool.length) {
        clearInterval(timer)
        endScreen()
    } else {
        
        // PICKS RANDOM QUESTION
        var base = triviaPool[randomNum(0,triviaPool.length)]
        
        
        // TEST FOR REPEATING QUESTIONS
        if (usedPool.includes(base)) {                                  
            base = triviaPool[randomNum(0,triviaPool.length)]
        }
        
        // UPDATE DOM
        $('#question').text(base.question)
        
        for (i=0; i < base.answerChoices.length; i++){
            $('.answerChoice').attr('style','display: block')
            $('#a' + i).text(base.answerChoices[i])
            $('#a' + i).attr('data-answer',base.answerChoices[i])
        }
        

        // ADDS QUESTION TO THE USED ARRAY TO CHECK AGAINST 
        usedPool.push(base)
        
        questionCount++
        tempCorrect = base.correctAnswer

        
    }
}



$('.answerChoice').on('click', function(){
    var choice = $(this).attr('data-answer')
    clearInterval(timer)
        if (choice === tempCorrect){
            youWon()
        } else {
            youFailed()
        }
    
})



// INITIALIZATION-------------------------------------------------------------------------------------------

newQuestion()