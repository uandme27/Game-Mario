const arr1 =
    { "động vật": [], }

let quizs = [];
let mon = "";
class Question {
    constructor(question, correctAnswer) {
        this.question = question;
        this.correctAnswer = correctAnswer;
        if (correctAnswer !== undefined) {
            this.generateContainer();
            this.totalAnswers();
        }
    }

    generateContainer() {
        if (this.correctAnswer !== undefined) {
            this.container = "_".repeat(this.correctAnswer.length);
        }
    }

    totalAnswers() {
        if (this.correctAnswer !== undefined) {
            this.answers = this.correctAnswer.split('');
            this.answers.sort(() => Math.random() - 0.5);
        }
    }
}

function tienganh() {



    const arr = [
        new Question("sách", "book"),
        new Question("táo", "apple"),
        new Question("nhà", "house"),
        new Question("bàn", "table"),
        new Question("ghế", "chair"),
        new Question("trường học", "school"),
        new Question("thỏ", "rabbit"),
        new Question("hoa", "flower"),
        new Question("rắn", "snake"),
        new Question("mây", "cloud"),

    ];
    quizs = arr;
    mon = "quizE"
    console.log(arr)
}



function createQaA() {
    let num1, num2;
    const operators = ['+', '-', '*', '/'];
    const operator = operators[Math.floor(Math.random() * operators.length)];

    if (operator === '+' || operator === '-') {
        num1 = Math.floor(Math.random() * 90) + 10;
        num2 = Math.floor(Math.random() * 90) + 10;
        if (operator === '-' && num1 < num2) {
            [num1, num2] = [num2, num1]
        }
    } else if (operator === '*' || operator === '/') {
        num1 = Math.floor(Math.random() * 10) + 2;
        num2 = Math.floor(Math.random() * 10) + 2;
    }

    let question, correctAnswer, totalAnswers;



    switch (operator) {
        case '+':
            question = `${num1} + ${num2}`;
            correctAnswer = num1 + num2;
            break;
        case '-':
            question = `${num1} - ${num2}`;
            correctAnswer = num1 - num2;
            break;
        case '*':
            question = `${num1} x ${num2}`;
            correctAnswer = num1 * num2;
            break;
        case '/':
            num1 = num2 * (Math.floor(Math.random() * 10) + 1)
            question = `${num1} : ${num2}`;
            correctAnswer = num1 / num2;
            break;
    }

    const allAnswers = [];
    while (allAnswers.length < 3) {
        const randomAnswer = Math.floor(Math.random() * 100) + 1;
        if (!allAnswers.includes(randomAnswer) && randomAnswer !== correctAnswer) {
            allAnswers.push(randomAnswer);
        }
    }
    allAnswers.push(correctAnswer);

    allAnswers.sort(() => Math.random() - 0.5);


    totalAnswers = allAnswers;

    return { question, correctAnswer, totalAnswers };
}

function toan() {
    let arr = []
    for (let i = 0; i < 100; i++) {
        const { question, correctAnswer, totalAnswers } = createQaA();
        arr.push({ question, correctAnswer, totalAnswers });
        mon = "quizM"
        quizs = arr
    }
}




document.getElementById("toan").addEventListener('click', () => {
    toan()
    console.log(quizs)

})
document.getElementById("tienganh").addEventListener('click', () => {
    tienganh()
    console.log(quizs)


})

