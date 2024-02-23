const questions = 
[
    {
        questions: "Which is not a keyword in java",
        answers : 
        [
            {text: "super", correct: false},
            {text: "assert", correct: false},
            {text: "goto", correct: false},
            {text: "null", correct: true},

        ]
    },
    {
        questions: "Which three keywords are required to declare a constant",
        answers : 
        [
            {text: "public static final", correct: true},
            {text: "protected static final", correct: false},
            {text: "private static final", correct: false},
            {text: "static final", correct: false},
        ]
    },
    {
        questions: "Which of the following is known as annonymous function in java",
        answers : 
        [
            {text: "annunymous", correct: false},
            {text: "Lambda Expression", correct: true},
            {text: "Method Reference", correct: false},
            {text: "null", correct: false},
        ]
    },
    {
        questions: "Through which of the following multiple inheritance is possible in java ?",
        answers : 
        [
            {text: "ArrayList", correct: false},
            {text: "abstract", correct: false},
            {text: "interface", correct: true},
            {text: "method overriding", correct: false},

        ]
    },
    {
        questions: "Which keyword is used to release the resources ?",
        answers : 
        [
            {text: "try", correct: false},
            {text: "catch", correct: false},
            {text: "throw", correct: false},
            {text: "finally", correct: true}

        ]
    }
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let score = 0;
let index = 0;
function startQuiz()
{
    index = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}
function showQuestion()
{
    resetState();
    let currentQuestion = questions[index];
    let questionNo = index + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.questions;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        // console.log(button);
        button.classList.add("btn");
        answerButton.appendChild(button);
        // console.log(answer.correct);
        if(answer.correct)
        {
            button.dataset.correct = answer.correct;
            // console.log(button.dataset.correct);
        }
        button.addEventListener("click",(e) =>{
            const click = e.target;
            const isCorrect = click.dataset.correct === "true";
            if(isCorrect)
            {
                click.classList.add("correct");
                score++;
            }
            else
            {
                click.classList.add("incorrect");
            }
            Array.from(answerButton.children).forEach(button => {
                if(button.dataset.correct === "true")
                {
                    button.classList.add("correct");
                }
                button.disabled = true;
            });
            nextButton.style.display = "block";
        });
    });
}
function resetState()
{
    nextButton.style.display = "none";
    while(answerButton.firstChild)
    {
        answerButton.removeChild(answerButton.firstChild);
    }
}
function handledQuestion()
{
    index++;
    if(index < questions.length)
    {
        showQuestion();
    }
    else
    {
        resetState();
        questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
        nextButton.innerHTML = "Play again";
        nextButton.style.display = "block";
    }
}
nextButton.addEventListener("click",()=>{
    if(index < questions.length)
    {
        handledQuestion();
    }
    else
    {
        startQuiz();
    }
});
startQuiz();