document.addEventListener("DOMContentLoaded", function () {
    var coverContainer = document.getElementById("cover-container");
    var questionContainer = document.getElementById("question-container");
    var resultContainer = document.getElementById("result-container");

    if (coverContainer) {
        coverContainer.style.display = "block";
    }

    if (questionContainer) {
        questionContainer.style.display = "none";
    }

    if (resultContainer) {
        resultContainer.style.display = "none";
    }
});

var resultImages = {
    "일반건성피부": "image_normal_dry_skin.jpg",
    "지성여드름피부": "image_oily_acne_prone_skin.jpg",
    "알러지홍조피부": "image_sensitive_redness_skin.jpg",
    "노화악건성피부": "image_aging_dry_skin.jpg",
    "잡티기미피부": "image_uneven_pigmented_skin.jpg"
};

var currentQuestionIndex = 0;
var userAnswers = [];

var questions = [
    {
        question: "얼굴을 세척한 후 몇 시간이 지난 후에 피부가 유분지게 느껴지나요?",
        choices: ["1. 몇 시간 후에 유분이 덜 느껴짐", "2. 중간 정도로 유분지게 느껴짐", "3. 빠르게 유분지게 느껴짐"]
    },
    {
        question: "피부 톤은 어떤가요?",
        choices: ["1. 매우 밝은 피부 톤", "2. 중간 정도의 피부 톤", "3. 짙은 피부 톤"]
    },
    {
        question: "여드름이 나타나는 빈도는 어떤가요?",
        choices: ["1. 거의 나타나지 않음", "2. 가끔 나타남", "3. 자주 나타남"]
    },
    {
        question: "피부에 홍조가 나타나나요?",
        choices: ["1. 거의 나타나지 않음", "2. 가끔 나타남", "3. 자주 나타남"]
    },
    {
        question: "해에 노출되었을 때 피부 반응은 어떤가요?",
        choices: ["1. 거의 자극을 받지 않음", "2. 가끔 화상이 나거나 붉어짐", "3. 쉽게 화상이 나거나 붉어짐"]
    },
    {
        question: "당신은 피부에 제품을 사용할 때 어떤 특징이 있나요?",
        choices: ["1. 건성에 가깝다", "2. 중성에 가깝다", "3. 지성에 가깝다"]
    },
    {
        question: "피부에 민감한 반응이 나타나나요?",
        choices: ["1. 거의 나타나지 않음", "2. 가끔 나타남", "3. 자주 나타남"]
    }
];

function startTest() {
    var coverContainer = document.getElementById("cover-container");
    var questionContainer = document.getElementById("question-container");

    if (coverContainer) {
        coverContainer.style.display = "none";
    }

    if (questionContainer) {
        questionContainer.style.display = "block";
        showNextQuestion();
    }
}

function showNextQuestion() {
    var questionContainer = document.getElementById("question-container");
    if (questionContainer) {
        if (currentQuestionIndex < questions.length) {
            var currentQuestion = questions[currentQuestionIndex];
            displayQuestion(currentQuestion);
        } else {
            showResult();
        }
    }
}

function displayQuestion(question) {
    var questionNumberElement = document.getElementById("questionNumber");
    var questionTextElement = document.getElementById("questionText");
    var choicesElement = document.getElementById("choices");

    if (questionNumberElement) {
        questionNumberElement.textContent = "Q " + (currentQuestionIndex + 1);
    }

    if (questionTextElement) {
        questionTextElement.textContent = question.question;
    }

    if (choicesElement) {
        choicesElement.innerHTML = ""; // 이전 선택지 초기화

        question.choices.forEach(function (choice, index) {
            var button = document.createElement("button");
            button.classList.add("choice-button");
            button.value = choice;
            button.innerHTML = choice;
            button.type = "button"; // 기본 동작 방지
            button.onclick = function () {
                selectChoice(this.value);
            };

            choicesElement.appendChild(button);
        });
    }
}

function selectChoice(choice) {
    userAnswers[currentQuestionIndex] = choice;
    currentQuestionIndex++;
    showNextQuestion();
}

function showResult() {
    var questionContainer = document.getElementById("question-container");
    var resultContainer = document.getElementById("result-container");

    if (questionContainer) {
        questionContainer.style.display = "none";
    }

    if (resultContainer) {
        resultContainer.style.display = "block";
        var resultTextElement = document.getElementById("resultText");
        var resultImageElement = document.getElementById("resultImage");

        if (resultTextElement) {
            var resultMessage = calculateResult();
            resultTextElement.textContent = resultMessage;
        }

        if (resultImageElement) {
            var result = calculateResult();
            var imagePath = resultImages[result];
            resultImageElement.src = imagePath;
        }
    }
}

function calculateResult() {
    var totalA = userAnswers.filter(answer => answer.includes('1')).length;
    var totalB = userAnswers.filter(answer => answer.includes('2')).length;
    var totalC = userAnswers.filter(answer => answer.includes('3')).length;

    if (totalA > totalB && totalA > totalC) {
        return "일반건성피부";
    } else if (totalB > totalA && totalB > totalC) {
        return "지성여드름피부";
    } else if (totalC > totalA && totalC > totalB) {
        return "알러지홍조피부";
    } else if (totalA === totalB && totalA === totalC) {
        return "판단 불가능";
    } else {
        if (totalA === 2 && totalB === 2 && totalC === 2) {
            return "노화악건성피부";
        } else {
            return "잡티기미피부";
        }
    }
}