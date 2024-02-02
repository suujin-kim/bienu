document.addEventListener("DOMContentLoaded", function () {
    var coverContainer = document.getElementById("cover-container");
    var questionContainer = document.getElementById("question-container");
    var resultContainer = document.getElementById("result-container");
    var loadingContainer = document.getElementById("loading-container");


    if (coverContainer) {
        coverContainer.style.display = "block";
    }

    if (questionContainer) {
        questionContainer.style.display = "none";
    }

    if (resultContainer) {
        resultContainer.style.display = "none";
    }

    if (loadingContainer) {
        loadingContainer.style.display = "none"; // 처음에는 분석 중 화면을 감춥니다.
    }

});

var resultImages = {
    "Dry skin" : "image_normal_dry_skin.png",
    "Oil skin": "image_oily_acne_prone_skin.png",
    "Acne-prone skin": "image_sensitive_redness_skin.png",
    "Aging skin": "image_aging_dry_skin.png",
    "Blemish-prone skin": "image_uneven_pigmented_skin.png"
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
            "4. redness"
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
        question: "Does your skin show sensitivity reactions to products?",
        choices: [
            "1. Rarely",
            "2. Occasionally",
            "3. Frequently",
            "4. Almost constantly"
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
    },
    
    {
        question: "How often do you exfoliate your skin?",
        choices: [
            "1. Never",
            "2. Once a week",
            "3. 2-3 times a week",
            "4. More than 3 times a week"
        ]
    },
    {
        question: "What is your main skin concern?",
        choices: [
            "1. Dryness",
            "2. Acne",
            "3. Wrinkles",
            "4. Uneven skin tone"
        ]
    },
    {
        question: "Do you use sunscreen regularly?",
        choices: [
            "1. Always",
            "2. Often",
            "3. Occasionally",
            "4. Rarely"
        ]
    },
    {
        question: "How would you describe the pores on your face?",
        choices: [
            "1. Small and hardly visible",
            "2. Small but visible",
            "3. Enlarged on the nose and cheeks",
            "4. Large and noticeable"
        ]
    },
    {
        question: "What type of weather is harsh on your skin?",
        choices: [
            "1. Cold and windy",
            "2. Hot and humid",
            "3. Both",
            "4. Neither"
        ]
    },

    {
        question: "How often do you wear makeup?",
        choices: [
            "1. Rarely or never",
            "2. Occasionally",
            "3. Most days",
            "4. Every day"
        ]
    },

    {
        question: "How would you describe your stress level?",
        choices: [
            "1. Low",
            "2. Moderate",
            "3. High",
            "4. Very high"
        ]
    },

    {
        question: "How often do you exercise?",
        choices: [
            "1. Rarely or never",
            "2. Occasionally",
            "3. Regularly (1-3 times a week)",
            "4. Frequently (4 or more times a week)"
        ]
    },
    
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
            // 분석 중 화면 표시
            showLoadingScreen();

            // 2초 후에 분석 완료 화면 표시 및 결과 페이지로 이동
            setTimeout(function () {
                hideLoadingScreen();
                showResult();
            }, 2500);
    }
}}

function showLoadingScreen() {
    var loadingContainer = document.getElementById("loading-container");
    if (loadingContainer) {
        loadingContainer.style.display = "flex";
        // 로딩이 완료된 후에 로딩 화면을 감춤
        setTimeout(function () {
            hideLoadingScreen();
        }, 2000); // 2초 동안 분석 중 화면을 표시하고, 그 후에 감춥니다.
    }
}

function hideLoadingScreen() {
    var loadingContainer = document.getElementById("loading-container");
    if (loadingContainer) {
        loadingContainer.style.display = "none";
        loadingContainer.style.backgroundColor = "transparent"; /* 로딩 완료 후 투명하게 설정 */
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

        // 결과 페이지로 이동할 때 hideLoadingScreen 함수 호출
        hideLoadingScreen();

        // 결과 페이지에 따른 링크 설정
        var infoButton = document.getElementById("infoButton");
        if (infoButton) {
            infoButton.href = getResultLink(result);
        }
    }
}



// 각 결과에 따른 링크 반환 함수
function getResultLink(result) {
    switch (result) {
        case "Dry skin":
            return "https://xn--vg1b07tv4f.com/47";
        case "Oil skin":
            return "https://xn--vg1b07tv4f.com/48";
        case "Aging skin":
            return "https://xn--vg1b07tv4f.com/Agingskin";
        case "Acne-prone skin":
            return "https://xn--vg1b07tv4f.com/49";    
        case "Blemish-prone skin":
            return "https://xn--vg1b07tv4f.com/46";
        // 다른 결과에 대한 링크도 추가할 수 있습니다.
        default:
            return "https://example.com/default-link";
    }
}



function calculateResult() {
    //var totalScores = [0, 0, 0, 0, 0];

    //for (var i = 0; i < userAnswers.length; i++) {
      //  switch (userAnswers[i]) {
          //  case "1":
               // totalScores[0] += 1; // Dry skin에 1점 추가
              //  break;
            //case "2":
               // totalScores[1] += 1; // Aging skin에 1점 추가
             //   break;
           // case "3":
              //  totalScores[2] += 1; // Oil skin에 1점 추가
             //   break;
           // case "4":
              //  totalScores[3] += 1; // Acne-prone skin에 1점 추가
            //    break;
            // 추가적인 응답에 대한 처리
          //  default:
        //        break;
      //  }
    //}

    //var maxScoreIndex = totalScores.indexOf(Math.max(...totalScores));
    //var skinTypes = ["Dry skin", "Aging skin", "Oil skin", "Acne-prone skin", "Blemish-prone skin"];

    //return skinTypes[maxScoreIndex];//

    return getRandomResult();
}

function calculateWeightedScore(questionIndex, choiceValue) {
    var weight = 1; // 기본 가중치

    // 특정 질문에 대한 가중치 동적으로 계산
    switch (questionIndex) {
        case 0: // How does your skin feel a few hours after washing your face?
            // 예시: 선택지 4에 더 높은 가중치 부여
            if (choiceValue === 4) {
                weight = 2;
            }
            break;

        case 1: // What is your skin tone?
            // 예시: 선택지 4에 더 높은 가중치 부여
            if (choiceValue === 4) {
                weight = 2;
            }
            break;

        case 2: // How often do you experience breakouts or acne?
            // 예시: 선택지 3에 더 높은 가중치 부여
            if (choiceValue === 3) {
                weight = 2;
            }
            break;

        case 4: // How does your skin react to sun exposure?
            // 예시: 선택지 4에 더 높은 가중치 부여
            if (choiceValue === 4) {
                weight = 2;
            }
            break;

        case 5: // How would you describe your skin when using skincare products?
            // 예시: 선택지 1에 더 높은 가중치 부여
            if (choiceValue === 1) {
                weight = 2;
            }
            break;

        case 7: // What is your age group?
            // 예시: 선택지 4에 더 높은 가중치 부여
            if (choiceValue === 4) {
                weight = 2;
            }
            break;

        // 추가적인 질문들에 대한 가중치 부여 로직을 여기에 추가

        default:
            break;
    }

    return weight;
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

function getRandomResult() {
    var skinTypes = ["Dry skin", "Aging skin", "Oil skin", "Acne-prone skin", "Blemish-prone skin"];
    var randomIndex = Math.floor(Math.random() * skinTypes.length);
    return skinTypes[randomIndex];
}


function calculateResult() {
    var totalScores = [0, 0, 0, 0, 0];

    for (var i = 0; i < userAnswers.length; i++) {
        var choiceValue = parseInt(userAnswers[i]);

        // 질문 및 선택에 기반한 가중 점수 적용
        var weight = calculateWeightedScore(i, choiceValue);
        totalScores[choiceValue - 1] += weight;
    }

    // 최대 점수의 인덱스 찾기
    var maxScoreIndex = totalScores.indexOf(Math.max(...totalScores));
    var skinTypes = ["Dry skin", "Aging skin", "Oil skin", "Acne-prone skin", "Blemish-prone skin"];

    return skinTypes[maxScoreIndex];
}