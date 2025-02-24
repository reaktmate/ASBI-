const words = [
    {word: "cat", meaning: "ねこ"},
    {word: "dog", meaning: "いぬ"},
    {word: "red", meaning: "あか"},
    {word: "blue", meaning: "あお"},
    {word: "one", meaning: "いち"},
    {word: "two", meaning: "に"},
    {word: "sun", meaning: "たいよう"},
    {word: "star", meaning: "ほし"},
    {word: "tree", meaning: "き"},
    {word: "fish", meaning: "さかな"},
    {word: "bird", meaning: "とり"},
    {word: "moon", meaning: "つき"},
    {word: "book", meaning: "ほん"},
    {word: "rain", meaning: "あめ"},
    {word: "snow", meaning: "ゆき"},
    {word: "food", meaning: "たべもの"},
    {word: "water", meaning: "みず"},
    {word: "fire", meaning: "ひ"},
    {word: "wind", meaning: "かぜ"},
    {word: "earth", meaning: "ちきゅう"},
    {word: "three", meaning: "さん"},
    {word: "four", meaning: "よん"},
    {word: "five", meaning: "ご"},
    {word: "sky", meaning: "そら"},
    {word: "cloud", meaning: "くも"}
];
let currentWord = "";
let previousWord = ""; // 前回の単語を保存
let score = 0;
let startTime = null;
let gameStarted = false;

// ゲームの要素を取得
const wordDisplay = document.getElementById("word-display");    // 単語を表示する要素
const inputField = document.getElementById("input-field");      // 入力フィールド
const timerDisplay = document.getElementById("timer");          // タイマーの表示要素
const scoreDisplay = document.getElementById("score");          // スコアの表示要素
const startButton = document.createElement("button");           // スタートボタンを作成
startButton.textContent = "スタート";
startButton.id = "start-button"; // Add ID for CSS styling
document.getElementById("game-container").prepend(startButton);

function getRandomWord() {
    let newWord;
    do {
        newWord = words[Math.floor(Math.random() * words.length)];
    } while (newWord.word === previousWord); // 前回と同じ単語が出るまで繰り返す
    return newWord;
}

function updateTimer() {
    if (startTime && gameStarted) {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        timerDisplay.textContent = `時間: ${elapsed}秒`;
        requestAnimationFrame(updateTimer);
    }
}

function startGame() {
    if (!gameStarted) return;
    
    const wordObj = getRandomWord();
    previousWord = currentWord; // 現在の単語を前回の単語として保存
    currentWord = wordObj.word;
    wordDisplay.innerHTML = `${currentWord}<br><span style="font-size: 24px; color: #666;">${wordObj.meaning}</span>`;
    inputField.value = "";
    inputField.focus();
    
    if (!startTime) {
        startTime = Date.now();
        updateTimer();
    }
}

function resetGame() {
    score = 0;
    startTime = null;
    gameStarted = false;
    currentWord = "";
    previousWord = ""; // 前回の単語もリセット
    wordDisplay.textContent = "";
    inputField.value = "";
    scoreDisplay.textContent = `スコア: ${score}`;
    timerDisplay.textContent = "時間: 0秒";
    startButton.disabled = false;
}

inputField.addEventListener("input", () => {
    if (!gameStarted) return;
    
    if (inputField.value === currentWord) {
        score++;
        scoreDisplay.textContent = `スコア: ${score}`;
        startGame();
    }
});

startButton.addEventListener("click", () => {
    gameStarted = true;
    startButton.disabled = true;
    startGame();
});

resetGame();
