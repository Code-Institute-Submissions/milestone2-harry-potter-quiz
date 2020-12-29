// Sets color scheme and question set depending on which House is chosen on index.html

let houseChosen;
let answers = document.getElementById("answer-overlay");
const homepage = document.getElementById("js-choose-house-page");
const quizpage = document.getElementById("js-quiz-page");
const goodScorePage = document.getElementById("js-good-page");
const badScorePage = document.getElementById("js-bad-page");
const howToPlay = document.getElementById("js-how-to-play-page");
const settings = document.getElementById("js-settings-page");

// ---------------------------------------------------------------- Navigations

function toHomePage() {
    homepage.classList.remove("hide");
    quizpage.classList.add("hide");
    goodScorePage.classList.add("hide");
    badScorePage.classList.add("hide");
    howToPlay.classList.add("hide");
    settings.classList.add("hide");
}

function toQuizPage() {
    homepage.classList.add("hide");
    quizpage.classList.remove("hide");
    goodScorePage.classList.add("hide");
    badScorePage.classList.add("hide");
    howToPlay.classList.add("hide");
    settings.classList.add("hide");
}

function toGoodScorePage() {
    homepage.classList.add("hide");
    quizpage.classList.add("hide");
    goodScorePage.classList.remove("hide");
    badScorePage.classList.add("hide");
    howToPlay.classList.add("hide");
    settings.classList.add("hide");
}

function toBadScorePage() {
    homepage.classList.add("hide");
    quizpage.classList.add("hide");
    goodScorePage.classList.add("hide");
    badScorePage.classList.remove("hide");
    howToPlay.classList.add("hide");
    settings.classList.add("hide");
}

function toInstructionsPage() {
    homepage.classList.add("hide");
    quizpage.classList.add("hide");
    goodScorePage.classList.add("hide");
    badScorePage.classList.add("hide");
    howToPlay.classList.remove("hide");
    settings.classList.add("hide");
}

function toSettingsPage() {
    homepage.classList.add("hide");
    quizpage.classList.add("hide");
    goodScorePage.classList.add("hide");
    badScorePage.classList.add("hide");
    howToPlay.classList.add("hide");
    settings.classList.remove("hide");
}

// ---------------------------------------------------------------- Choose your house
function setHouse(house) {

    resetHouse(houseChosen);

    houseChosen = house;
    answers.classList.add(`${house}`);

    toQuizPage();

    chooseQuestionSet();
    randomiseQuestionOrder();
    populateQuestion();
    startTimer();
}

function resetHouse(house) { // Reset the house at the start, so if the user is playing a second time, they're not stuck with the same house
    answers.classList.remove(house);
}

//
//
// Quiz questions
// And functions
//
//

// ---------------------------------------------------------------- Questions sets

let gryffindor = [
    ["Which animal represents your house?", "Lion", "Snake", "Badger", "Eagle", "Lion"],
    ["What are your house colours?", "Scarlet and Gold", "Silver and Green", "Yellow and Black", "Blue and Silver", "Scarlet and Gold"],
    ["Who was Hermione's date at the Yule Ball?", "A", "B", "Viktor Krum", "D", "Viktor Krum"],
    ["Which character served as Quiddich commentator?", "A", "B", "C", "Lee Jordan", "Lee Jordan"],
    ["Which insect is Rom most scared of?", "A", "Spiders", "C", "D", "Spiders"],
    ["What is the name of Hermione's cat?", "A", "B", "Crookshanks", "D", "Crookshanks"],
    ["How did Neville help to defeat Voldemort?", "A", "Killed Nagini", "C", "D", "Killed Nagini"],
    ["How does Harry catch his first snitch?", "In his mouth", "B", "C", "D", "In his mouth"],
    ["How does Hermione take extra classes in third year?", "Weekend classes", "Made a clone", "Penseive", "Time Turner", "Time Turner"],
    ["Other than Harry, who else could have been the object of the prophecy regarding Voldemort's downfall?", 
            "Hermione Granger", "Luna Lovegood", "Neville Longbottom", "Dean Thomas", "Neville Longbottom"]
];

// const questions = {
//     gryffindor: {
//         Q1: ["Which animal represents your house?", "Lion", "Snake", "Badger", "Eagle", "Lion"],
//         Q2: ["What are your house colours?", "Scarlet and Gold", "Silver and Green", "Yellow and Black", "Blue and Silver", "Scarlet and Gold"],
//         Q3: ["Who was Hermione's date at the Yule Ball?", "A", "B", "Viktor Krum", "D", "Viktor Krum"],
//         Q4: ["Which character served as Quiddich commentator?", "A", "B", "C", "Lee Jordan", "Lee Jordan"],
//         Q5: ["Which insect is Rom most scared of?", "A", "Spiders", "C", "D", "Spiders"],
//         Q6: ["What is the name of Hermione's cat?", "A", "B", "Crookshanks", "D", "Crookshanks"],
//         Q7: ["How did Neville help to defeat Voldemort?", "A", "Killed Nagini", "C", "D", "Killed Nagini"],
//         Q8: ["How does Harry catch his first snitch?", "In his mouth", "B", "C", "D", "In his mouth"],
//         Q9: ["How does Hermione take extra classes in third year?", "Weekend classes", "Made a clone", "Penseive", "Time Turner", "Time Turner"],
//         Q10: ["Other than Harry, who else could have been the object of the prophecy regarding Voldemort's downfall?", 
//             "Hermione Granger", "Luna Lovegood", "Neville Longbottom", "Dean Thomas", "Neville Longbottom"]
//     },
//     slytherin: {
//         Q1: ["Which animal represents your house?", "Lion", "Snake", "Badger", "Eagle", "Snake"],
//         Q2: ["What are your house colours?", "Scarlet and Gold", "Silver and Green", "Yellow and Black", "Blue and Silver", "Silver and Green"],
//         Q3: ["How many horcruxes did Voldemort make?", "Six", "Seven", "Eight", "Nine", "Eight"],
//         Q4: ["Finish the quote. “After all this time?”", "Always.", "Maybe.", "I guess...", "No!", "Always."],
//         Q5: ["What was the name of Voldemort's snake?", "Sid", "Basilisk", "Medusa", "Nagini", "Nagini"],
//         Q6: ["Who killed Dobby by throwing a knife at him?", "Draco Malfoy", "Severus Snape", "Voldemort", "Bellatrix Lestrange", "Bellatrix Lestrange"],
//         Q7: ["Which medieval wizard was in Slytherin?", "A", "B", "Merlin", "D", "Merlin"],
//         Q8: ["Where is the common room of your house?", "In the dungeons", "In the kitchen", "C", "D", "In the dungeons"],
//         Q9: ["Who is the resident ghost of Slytherin?", "Nearly Headless Nick", "The Bloody Baron", "The Fat Friar", "The Grey Lady", "The Bloody Baron"],
//         Q10: ["What qualities does a Slytherin possess?", "Patience and Loyalty", "Wit and Learning", "Cunning and Deceit", "Daring and Nerve", "Cunning and Deceit"]
//     },
//     hufflepuff: {
//         Q1: ["Which animal represents your house?", "Lion", "Snake", "Badger", "Eagle", "Badger"],
//         Q2: ["What are your house colours?", "Scarlet and Gold", "Silver and Green", "Yellow and Black", "Blue and Silver", "Yellow and Black"],
//         Q3: ["What colour ink are Hogwarts invitation letters written in?", "Red", "Blue", "Green", "Black", "Green"],
//         Q4: ["Which Quiddich position did Captain Cedric Diggory play?", "Keeper", "Seeker", "C", "D", "Seeker"],
//         Q5: ["Which dragon did Cedric Diggory face in the Triwizard Tournament?", "A", "B", "C", "D", "D"],
//         Q6: ["What was the password to the prefect's bathroom?", "A", "B", "C", "Sherbet lemons", "Sherbet lemons"],
//         Q7: ["Who is the head of Hufflepuff house?", "Professor McGonegal", "Professor Flitwick", "Professor Snape", "Professor Sprout", "Professor Sprout"],
//         Q8: ["Where is the common room of your house?", "In the dungeons", "In the kitchen", "C", "D", "In the kitchen"],
//         Q9: ["Who is the resident ghost of Hufflepuff?", "Nearly Headless Nick", "The Bloody Baron", "The Fat Friar", "The Grey Lady", "The Fat Friar"],
//         Q10: ["How do you get into the Hufflepuff common room?", "Hum a tune", "Tap out a rhythm", "Perform a poem", "Dance", "Tap out a rhythm"]
//     },
//     ravenclaw: {
//         Q1: ["Which animal represents your house?", "Lion", "Snake", "Badger", "Eagle", "Eagle"],
//         Q2: ["What are your house colours?", "Scarlet and Gold", "Silver and Green", "Yellow and Black", "Blue and Silver", "Blue and Silver"],
//         Q3: ["What qualities does a Slytherin possess?", "Patience and Loyalty", "Wit and Learning", "Cunning and Deceit", "Daring and Nerve", "Wit and Learning"],
//         Q4: ["Which gem is contained in the Ravenclaw house points hourglass?", "Amythests", "Emeralds", "Sapphires", "Rubies", "Sapphires"],
//         Q5: ["What does Felix Felicis do?", "Poisons you", "Gives you good luck", "Makes you fall in love", "Ressurects someone", "Gives you good luck"],
//         Q6: ["Who is the Seeker of the Ravenclaw Quiddich team?", "A", "B", "C", "Cho Chang", "Cho Chang"],
//         Q7: ["Who is the resident ghost of Hufflepuff?", "Nearly Headless Nick", "The Bloody Baron", "The Fat Friar", "The Grey Lady", "The Grey Lady"],
//         Q8: ["Q8", "A", "B", "C", "D", "A"],
//         Q9: ["Q9", "A", "B", "C", "D", "A"],
//         Q10: ["Q10", "A", "B", "C", "D", "A"]
//     }
// }

// ---------------------------------------------------------------- Chooses question set depending on which house was chosen

let questionsSet;

function chooseQuestionSet() {
    if (houseChosen === "gryffindor") {
        questionsSet = gryffindor;
    } else if (houseChosen === "slytherin") {
        questionsSet = slytherin;
    } else if (houseChosen === "hufflepuff") {
        questionsSet = hufflepuff;
    } else if (houseChosen === "ravenclaw") {
        questionsSet = ravenclaw;
    } else {

    }
    // questionsSet = questions[houseChosen];
}

// ---------------------------------------------------------------- Randomises the order of the questions

let currentQuestion;
let questionPool = 10;

function randomiseQuestionOrder() {
    let randomNumber = Math.floor(Math.random() * questionPool); // Gets a random number between 1 and the total number of questions in the question pool
    currentQuestion = questionsSet[`${randomNumber}`]; // Finds a question in the question pool with that number
}

function populateQuestion() { // Fills in the text for question and answer chosen by the randomiseQuestionOrder function
    let questionText = document.getElementById("question-text");
    questionText.innerText = currentQuestion[0];

    let answerOne = document.getElementById("answer-one");
    answerOne.innerText = currentQuestion[1];

    let answerTwo = document.getElementById("answer-two");
    answerTwo.innerText = currentQuestion[2];

    let answerThree = document.getElementById("answer-three");
    answerThree.innerText = currentQuestion[3];

    let answerFour = document.getElementById("answer-four");
    answerFour.innerText = currentQuestion[4];
}

// ---------------------------------------------------------------- To end the quiz and timer

function endQuiz() {
    counter = "";
    showScorePage();
}

function endTimer() {
    alert("Oh no! You're out of time!");
    endQuiz();
}

// ---------------------------------------------------------------- Check the answer given by the user and move to the next question

let questionsAnswered = 0;
let currentScore = 0;

function pushScore() {
    let scoreArea = document.getElementById("score"); // Gets the score area
    scoreArea.innerText = `${currentScore}/10`; // Pushes the updated score to the score area for the user to see
}

function checkAnswer(num) {
    if (currentQuestion[num] == currentQuestion[5]) { // if content of index of clicked answer is equal to the question correct answer
       currentScore++; // Add to the score
       questionsAnswered++; // Increment how many questions are answered
       pushScore();
       questionsSet.splice([currentQuestion, 1]); // Remove the question from the set of questions
       console.log(questionsSet);
       // ALMOST!!! It's changing the question, but it isn't removing the current question from the pool
    } else {
        questionsAnswered++;
        delete questionsSet[`${currentQuestion}`];
    };
    if (questionsAnswered < 10) { // if the current question isn't the final question
        questionPool--; // Decrement the question pool for the RNG
        randomiseQuestionOrder();
        populateQuestion();
        console.log(questionPool);
    } else if (questionsAnswered === 10) {
       endQuiz();
    } else {
        alert("Oh no! Something went wrong! Please return to the homepage and try again.")
    }
}

// ---------------------------------------------------------------- Creates the 180 second timer for the full quiz

function startTimer() {    // Start the timer counting down from 180 seconds
    let counter = document.getElementById("counter");
    let seconds = 180;
    setInterval(function() { // Count down from 180 seconds in seconds
        seconds--;
        counter.innerText = `${seconds} seconds`; // Fill in the user-facing timer
        if (seconds === 0) {
            endTimer(); // If the timer runs out, end the timer
        };
        if (counter = "") {
            return;
        }
    }, 1000);
}

// ---------------------------------------------------------------- Decides which results page to show the user, and displays their score

function showScorePage() {
    if (currentScore > 5) {
        toGoodScorePage();
        document.getElementById("js-good-score").innerText = `${currentScore} / 10` // Populate their score
    } else {
        toBadScorePage();
        document.getElementById("js-bad-score").innerText = `${currentScore} / 10` // Populate their score
    }
}

// goodScorePage.classList.remove("hide"); // Go to good results area
// quizpage.classList.add("hide");

//
//
// Audio settings
//
//
//

// ---------------------------------------------------------------- Toggle

function backgroundMusicToggle() {
    // Toggle the background music on or off
}

function soundEffectsToggle() {
    // Toggle the sound effects on or off
}