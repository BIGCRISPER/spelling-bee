const words = ['boisterously', 'hallucinogen', 'narcissistic', 'indispensable', 'correlation', 'registration', 'transcontinental', 'metaphorical', 'flabbergasted', 'entrepreneurs', 'functionality', 'amoeba', 'matriculate', 'mississippi', 'mercantilism', 'vegetarianism', 'unpleasantness', 'antipollution', 'decentralization', 'intimidated', 'acquaintance', 'concessionaire', 'confidentiality', 'spontaneous', 'proposition', 'chrysanthemum'];
let score = 0;
let strikes = 0;
let maxStrikes = 3;

const wordElement = document.getElementById('word');
const userInput = document.getElementById('user-input');
const scoreDisplay = document.getElementById('score');
const strikesDisplay = document.getElementById('strikes');
const messageDisplay = document.getElementById('result');
const submitButton = document.getElementById('submit');
const replayButton = document.getElementById('replay');

let currentWord = '';

function getRandomWord() {
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
}

function speakWord(word) {
    const utterance = new SpeechSynthesisUtterance(word);
    window.speechSynthesis.speak(utterance);
}

function startNewRound() {
    currentWord = getRandomWord();
    // wordElement.textContent = currentWord; // Show word
    speakWord(currentWord);
    userInput.value = '';
}

function checkAnswer() {
    const answer = userInput.value.trim().toLowerCase();
    if (answer === currentWord) {
        score += 1;
        scoreDisplay.textContent = `Score: ${score}`;
        messageDisplay.textContent = 'Correct! Next word...';
        startNewRound();
    } else {
        strikes += 1;
        strikesDisplay.textContent = `Strikes: ${strikes}`;
        messageDisplay.textContent = `Wrong! The correct answer was "${currentWord}".`;
        if (strikes >= maxStrikes) {
            messageDisplay.textContent += ' Game over! Your final score is ' + score + '.';
            submitButton.disabled = true;// Disable submit button
            replayButton.disabled = true;
            // Optionally, reset the game after a delay
            setTimeout(() => {
                score = 0;
                strikes = 0;
                scoreDisplay.textContent = `Score: ${score}`;
                strikesDisplay.textContent = `Strikes: ${strikes}`;
                submitButton.disabled = false; // Enable button for a new game
                replayButton.disabled = false;
                messageDisplay.textContent = '';
                startNewRound();
            }, 3000); // Restart after 3 seconds
        } else {
            startNewRound();
        }
    }
}

function replayWord() {
    if (currentWord) {
        speakWord(currentWord);
    }
}

// Ensure elements exist before adding event listeners
if (submitButton) {
    submitButton.addEventListener('click', checkAnswer);
}

if (replayButton) {
    replayButton.addEventListener('click', replayWord)
}

// Start the first round on window load
window.addEventListener('load', () => {
    scoreDisplay.textContent = `Score: ${score}`;
    strikesDisplay.textContent = `Strikes: ${strikes}`;
    startNewRound();
});
