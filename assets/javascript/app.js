

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
        question: 'What... Is your name?',

        // the answer choices to update the DOM with
        answerChoices: ['Max','Jeff','Sir Lancelot of Camelot','JQuery'],

        // the correct answer stored seperately to check input against
        correctAnswer: 'Sir Lancelot of Camelot'
    },

    q2 = {
        question: 'What... is your quest?',

        answerChoices: ['to learn all that is learned','To seek the Holy Grail.','no','to cross the bridge of Death'],

        correctAnswer: 'To seek the Holy Grail.',
    },

    q3 = {
        question:'What... is your favorite colour?' ,

        answerChoices: ['Periwinkle','Razzmatazz','falu red','Blue'],

        correctAnswer: 'Blue',
    },
// caput mortuum ( worthless remains)
    q4 = {
        question: 'What... is the capital of Assyria?',

        answerChoices: ["I don't know that","Auuuuuuuuuuuuugh","Aššur","somewhere Mesopotamian"],

        correctAnswer: "Aššur",
    },

    q5 = {
        question: 'What is your favorite colour?' ,

        answerChoices: ['Blue','No, Yel-','caput mortuum','Auuuuuuuuugh'],

        correctAnswer: 'Auuuuuuuuugh',
    },

    q6 = {
        question: 'What… is the air-speed velocity of an unladen swallow?',

        answerChoices: ['10', '10 kph','at least 12 stones past a river','An African or European swallow?'],

        correctAnswer: 'An African or European swallow?',
    },

    q7 = {
        question: 'How do know so much about swallows?',

        answerChoices: ["I don't know","I was a hobbyist when I was young","swallows are the premier avian of choice","Well, you have to know these things when you’re a king, you know."],

        correctAnswer: "Well, you have to know these things when you’re a king, you know.",
    },

    
]

function reset() {
    wrongCount = 0
    rightCount = 0
    usedPool = []
    questionCount = 0
    clear()
    newQuestion()
}

function clear() {
    $(".answerChoice").empty()
    $(".answerChoice").attr('style','display: none')
    $('#timer').empty()
    $(".appendage").attr('style','display: none')
    clearInterval(timer)
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
    $('#reset').attr('style','display: block')
    
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

$('#reset').on('click', function(){
    console.log("test")
    $('#reset').attr('style','display: none')
    reset()
})


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

// newQuestion()
newQuestion()