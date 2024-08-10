const questions=[
    {
        question:"Which is the largest animal in the world",
        answers:[
            {text:"Shark", correct: false},
            {text:"Blue Whale", correct: true},
            {text:"Tiger", correct: false},
            {text:"Lion", correct: false}

        ]
    },
// there is one array and that array stores some objects so above is first object so object has first key value pair as question
// second object element is again storing an array as an value and again that array is storing 4 objects

    {
        question:"Who has won the most total Academy Awards?",
        answers:[
            {text:"Netflix", correct: false},
            {text:"Walt Disney", correct: true},
            {text:"Universal Pictures", correct: false},
            {text:"SONY", correct: false}

        ]
    },
    {
        question:`What company was originally called "Cadabra"?`,
        answers:[
            {text:"Amazon", correct: true},
            {text:"FedEx", correct: false},
            {text:"Visa", correct: false},
            {text:"MasterCard", correct: false}

        ]
    },
    {
        question:"What game studio makes the Red Dead Redemption series?",
        answers:[
            {text:"Epic Games", correct: false},
            {text:"Activision", correct: false},
            {text:"Rockstar Studios", correct: true},
            {text:"Naughty Dog", correct: false}

        ]
    }
]
const questionelement=document.getElementById("question")
const answerselement=document.getElementById("answer-buttons")
const nextbutton=document.getElementById("next-btn")

let currentquestionindex=0;
let score=0;

function startquiz(){
    currentquestionindex=0
    score=0
    nextbutton.innerHTML="Next"  
    // this is done cause at the end when next is eplaced by play again so again we have to change from play again to next we have to change the text on the button so thats why it is done here
    showQuestionandoptions()
}
function showQuestionandoptions(){
    resetstate()
    let currentquestion=questions[currentquestionindex].question
    let questionnumber=currentquestionindex+1
    questionelement.innerHTML=questionnumber +". "+currentquestion


    questions[currentquestionindex].answers.forEach(option => {
        const button=document.createElement("button")
        button.innerHTML=option.text
        button.classList.add("btn")
        answerselement.appendChild(button)
        if(option.correct){
            button.dataset.correct=option.correct
        }
        button.addEventListener("click",selectanswer)
        
    });
}
function resetstate(){
    nextbutton.style.display="none"
    while(answerselement.firstChild){
        answerselement.removeChild(answerselement.firstChild)
    }
}
function selectanswer(e){
    const selectedbtn=e.target
    // console.log(e.target)
    const iscorrect=selectedbtn.dataset.correct==="true"
    if(iscorrect){
        selectedbtn.classList.add("correct")
        score++;
    }
    else{
        selectedbtn.classList.add("incorrect")
    }
    Array.from(answerselement.children).forEach(button=>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct")  /*corrct answer would alwasy be displayed*/
        }
        button.disabled=true  //inbuilt function disabled so we wont be able to click on any button further
    })
    nextbutton.style.display="block" /* and now next button would display cause user has choosen one answer*/
}
function showScore(){
    resetstate()
    questionelement.innerHTML=`You scored ${score} points out of ${questions.length}`
    nextbutton.innerHTML="Play Again"
    nextbutton.style.display="block"
}


function handlenextbutton(){
    currentquestionindex++ 
    if(currentquestionindex<questions.length){
        showQuestionandoptions() 
    }
    else{
        showScore()  
        /*so index is 3 and all questions are done so as soon as this function starts it will update 3 to 4 and score function would run*/
    }
}


nextbutton.addEventListener("click",()=>{
    if(currentquestionindex<questions.length){
        handlenextbutton()
    }else{
        startquiz() 
        /*when at the end score appers and next button would be there renamed as play again at that time if we click on that it will start the quiz again*/
    }

})

startquiz()