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
    "Dry skin" : "image_normal_dry_skin.jpg",
    "Oil skin": "image_oily_acne_prone_skin.jpg",
    "Acne-prone skin": "image_sensitive_redness_skin.jpg",
    "Aging skin": "image_aging_dry_skin.jpg",
    "Blemish-prone skin": "image_uneven_pigmented_skin.jpg"
};

var currentQuestionIndex = 0;
var userAnswers = [];

var questions = [
    {
        question: "How does your skin feel a few hours after washing your face?",
        choices: [
            "1. Less oily than before",
            "2. Moderately oily",
            "3. Oily and shiny",
            "4. Extremely oily"
        ]
    },
    {
        question: "What is your skin tone?",
        choices: [
            "1. Very light",
            "2. Medium",
            "3. Tan",
            "4. Dark"
        ]
    },
    {
        question: "How often do you experience breakouts or acne?",
        choices: [
            "1. Rarely",
            "2. Occasionally",
            "3. Frequently",
            "4. Almost constantly"
        ]
    },
    {
        question: "Does your skin show signs of redness or inflammation?",
        choices: [
            "1. Rarely",
            "2. Occasionally",
            "3. Frequently",
            "4. Almost constantly"
        ]
    },
    {
        question: "How does your skin react to sun exposure?",
        choices: [
            "1. Rarely gets sunburned",
            "2. Occasionally gets sunburned",
            "3. Easily gets sunburned",
            "4. Very sensitive to sun exposure"
        ]
    },
    {
        question: "How would you describe your skin when using skincare products?",
        choices: [
            "1. Tends to be dry",
            "2. Balanced/Normal",
            "3. Tends to be oily",
            "4. Very oily"
        ]
    },
    {
        question: "Does your skin show sensitivity reactions to products?",
        choices: [
            "1. Rarely",
            "2. Occasionally",
            "3. Frequently",
            "4. Almost constantly"
        ]
    },
    {
        question: "How does your skin feel a few hours after washing your face?",
        choices: [
            "1. Less oily than before",
            "2. Moderately oily",
            "3. Oily and shiny",
            "4. Extremely oily"
        ]
    },
    {
        question: "What is your age group?",
        choices: [
            "1. Under 25",
            "2. 25 - 35",
            "3. 36 - 45",
            "4. 46 and above"
        ]
    },
    {
        question: "How would you describe your daily water intake?",
        choices: [
            "1. Insufficient",
            "2. Moderate",
            "3. Above average",
            "4. Excellent"
        ]
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
            updateProgressBar(); // 진행률 업데이트
            var currentQuestion = questions[currentQuestionIndex];
            displayQuestion(currentQuestion);
        } else {
            // 질문이 끝나면 로딩 화면을 나타내고 3초 후에 결과 페이지 표시
            showLoadingScreen();
            setTimeout(function () {
                showResult();
            }, 3000);
        }
    }
}

function updateProgressBar() {
    var progressBar = document.getElementById("progressBar");
    if (progressBar) {
        var progress = (currentQuestionIndex / questions.length) * 100;
        progressBar.style.width = progress + "%";
    }
}

function displayQuestion(question) {
    var questionNumberElement = document.getElementById("questionNumber");
    var questionTextElement = document.getElementById("questionText");
    var choicesElement = document.getElementById("choices");

    if (questionNumberElement) {
        questionNumberElement.textContent = "Q. " + (currentQuestionIndex + 1);
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
    var loadingContainer = document.getElementById("loading-container");

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

    showLoadingScreen(loadingContainer);
}

function showLoadingScreen() {
    var loadingContainer = document.getElementById("loading-container");
    if (loadingContainer) {
        loadingContainer.style.display = "flex";
        // 로딩이 완료된 후에 로딩 화면을 감춤
        setTimeout(function () {
            hideLoadingScreen();
        }, 3000);
    }
}

function hideLoadingScreen() {
    var loadingContainer = document.getElementById("loading-container");
    if (loadingContainer) {
        loadingContainer.style.display = "none";
        loadingContainer.style.backgroundColor = "transparent"; /* 로딩 완료 후 투명하게 설정 */
    }
}

function calculateResult() {
    var totalScores = [0, 0, 0, 0, 0];

    for (var i = 0; i < userAnswers.length; i++) {
        switch (userAnswers[i]) {
            case "1":
                totalScores[0]++;
                break;
            case "2":
                totalScores[1]++;
                break;
            case "3":
                totalScores[2]++;
                break;
            case "4":
                totalScores[3]++;
                break;
            default:
                break;
        }
    }

    var maxScoreIndex = totalScores.indexOf(Math.max(...totalScores));
    var skinTypes = ["Dry skin", "Aging skin", "Oil skin", "Acne-prone skin", "Blemish-prone skin"];

    return skinTypes[maxScoreIndex];
}

document.addEventListener("DOMContentLoaded", function () {
    // 페이지 로딩 후 맨 위로 스크롤
    window.scrollTo(0, 0);
});

function goToPreviousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        updateProgressBar();
        showNextQuestion();
    } else {
        // 처음 질문이면 뒤로 갈 수 없음
        alert("이전 페이지가 없습니다.");
    }
}