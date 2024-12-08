// Data Informasi Pendidikan
const educationInfo = {
    en: `
        <h2>Education Information</h2>
        <p>Education is the process of acquiring knowledge, skills, and values for life.</p>
        <p>It is essential for personal and professional development.</p>
        <p>Read the material and then test your understanding with the quiz!</p>
    `,
    id: `
        <h2>Informasi Pendidikan</h2>
        <p>Pendidikan adalah proses memperoleh pengetahuan, keterampilan, dan nilai-nilai untuk kehidupan.</p>
        <p>Penting untuk pengembangan pribadi dan profesional.</p>
        <p>Baca materinya, lalu uji pemahaman Anda dengan kuis!</p>
    `
};

// Data Kuis
const quizData = {
    1: [
        { question: { en: "What is 2 + 2?", id: "Berapa 2 + 2?" }, answers: ["3", "4", "5"], correct: "4" },
        { question: { en: "What is 5 - 3?", id: "Berapa 5 - 3?" }, answers: ["2", "3", "4"], correct: "2" },
        { question: { en: "What is 3 x 3?", id: "Berapa 3 x 3?" }, answers: ["6", "9", "12"], correct: "9" },
        { question: { en: "What is 10 / 2?", id: "Berapa 10 / 2?" }, answers: ["4", "5", "6"], correct: "5" },
        { question: { en: "What is 1 + 7?", id: "Berapa 1 + 7?" }, answers: ["6", "7", "8"], correct: "8" }
    ],
    2: [
        { question: { en: "What is 12 x 12?", id: "Berapa 12 x 12?" }, answers: ["121", "144", "156"], correct: "144" },
        { question: { en: "What is √49?", id: "Berapa √49?" }, answers: ["6", "7", "8"], correct: "7" },
        { question: { en: "What is 30 / 5?", id: "Berapa 30 / 5?" }, answers: ["5", "6", "7"], correct: "6" },
        { question: { en: "What is 15 + 20?", id: "Berapa 15 + 20?" }, answers: ["35", "25", "30"], correct: "35" },
        { question: { en: "What is 2^3?", id: "Berapakah 2^3?" }, answers: ["6", "8", "9"], correct: "8" }
    ],
    3: [
        { question: { en: "What is 3^3?", id: "Berapakah 3^3?" }, answers: ["27", "9", "18"], correct: "27" },
        { question: { en: "What is 5! (factorial)?", id: "Berapakah 5! (faktorial)?" }, answers: ["120", "24", "60"], correct: "120" },
        { question: { en: "What is √81?", id: "Berapakah √81?" }, answers: ["8", "9", "7"], correct: "9" },
        { question: { en: "What is 4 x (2 + 3)?", id: "Berapakah 4 x (2 + 3)?" }, answers: ["20", "16", "24"], correct: "20" },
        { question: { en: "Solve: 2 + 2 x 2", id: "Hitung: 2 + 2 x 2" }, answers: ["6", "8", "4"], correct: "6" }
    ]
};

// Variabel global
let currentLanguage = "id";
let currentLevel = 1;
let currentQuestionIndex = 0;

// Fungsi menampilkan informasi
function showInfo() {
    document.getElementById("content").innerHTML = educationInfo[currentLanguage];
}

// Fungsi memulai kuis
function startQuiz() {
    loadQuestion();
}

// Fungsi memuat pertanyaan
function loadQuestion() {
    const quizContainer = document.getElementById("content");
    const currentQuiz = quizData[currentLevel][currentQuestionIndex];

    quizContainer.innerHTML = `
        <h2>${currentLanguage === "en" ? "Level" : "Tingkat"} ${currentLevel}</h2>
        <p>${currentQuiz.question[currentLanguage]}</p>
        <form id="quizForm">
            ${currentQuiz.answers.map(answer => `
                <label>
                    <input type="radio" name="answer" value="${answer}"> ${answer}
                </label><br>
            `).join('')}
            <button type="submit">${currentLanguage === "en" ? "Submit" : "Kirim"}</button>
        </form>
        <p id="result"></p>
    `;

    document.getElementById("quizForm").addEventListener("submit", handleAnswer);
}

// Fungsi menangani jawaban
function handleAnswer(e) {
    e.preventDefault();
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');
    const resultDisplay = document.getElementById("result");

    if (selectedAnswer) {
        const currentQuiz = quizData[currentLevel][currentQuestionIndex];
        if (selectedAnswer.value === currentQuiz.correct) {
            resultDisplay.textContent = currentLanguage === "en" ? "Correct!" : "Benar!";
            currentQuestionIndex++;

            if (currentQuestionIndex >= quizData[currentLevel].length) {
                currentLevel++;
                currentQuestionIndex = 0;

                if (!quizData[currentLevel]) {
                    document.getElementById("content").innerHTML = `<h2>${currentLanguage === "en" ? "Congratulations! You've completed all levels!" : "Selamat! Anda telah menyelesaikan semua tingkat!"}</h2>`;
                    return;
                }
            }

            loadQuestion();
        } else {
            resultDisplay.textContent = currentLanguage === "en" ? "Wrong answer. Try again!" : "Jawaban salah. Coba lagi!";
        }
    } else {
        resultDisplay.textContent = currentLanguage === "en" ? "Please select an answer." : "Silakan pilih jawaban.";
    }
}

// Fungsi mengganti bahasa
function changeLanguage() {
    const select = document.getElementById("language-select");
    currentLanguage = select.value;
    showInfo();
}

// Event listener
document.getElementById("info-button").addEventListener("click", showInfo);
document.getElementById("quiz-button").addEventListener("click", startQuiz);
document.getElementById("language-select").addEventListener("change", changeLanguage);

// Tampilkan informasi awal
showInfo();