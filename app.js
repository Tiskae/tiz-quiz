"use strict";
const inputChat = document.querySelector(".chat");
const sendMessageBtn = document.querySelector(".send-message");
const menuBtn = document.querySelector(".menu-bar");
const wholeContainer = document.querySelector("#main-container");
const chatSection = document.querySelector("#main");
const menu = document.querySelector(".menu");
const changeThemeBtn = document.querySelector(".change-theme");
const toggleSilentBtn = document.querySelector(".toggle-silent");
let changeNameBtn;
const nextAudioBtn = document.querySelector(".next-audio");
const certificate = document.querySelector(".certificate");
let wrongSound = new Audio("wrong.mp3");
let correctSound = new Audio("correct.wav");
let warningSound = new Audio("siren.mp3");
let congratulationsSound = new Audio("congratulations.mp3");

// 🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶
// 🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶
//  ALL QuUESTIONS AND ANSWERS ARE IN A SEPARATE FILE LOCATED IN "questions.js"  RELATIVE TO THIS FILE🔶
// 🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶
// 🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶

// creating the print certificate btn that will appera and be effective at the end of the quiz
const printBtn = document.createElement("button");
printBtn.id = "print-certificate";
printBtn.textContent = "Print certificate";

let prevMessage;
let username;
let questionNumber;
let chatReply, chatReply1, chatReply2;
let chatReplies = [chatReply, chatReply1, chatReply2];
let multipleReply = 0;
let score = 0;
let newName;

function changeTheme() {
  wholeContainer.classList.toggle("main-container-dark-theme");
  document.body.classList.toggle("body-dark-theme");
  chatSection.classList.toggle("main-dark-theme");
  menu.classList.toggle("menu-dark-theme");
  if (wholeContainer.classList.contains("main-container-dark-theme")) {
    changeThemeBtn.textContent = "Light theme";
  } else {
    changeThemeBtn.textContent = "Dark theme";
  }
}

// Wrong answer feedback
function answerIsWrong() {
  chatReplies[0] = readyReply("❌");
  wrongSound.play();
  questionNumber++;
}

// Correct answer feedback
function answerIsCorrect() {
  chatReplies[0] = readyReply("✔");
  correctSound.play();
  score++;
  questionNumber++;
}

// Multiple answer feedback
function multipleAnswerWarn() {
  chatReplies[0] = readyReply(
    "❌❌❌, I told you multiple answers is not allowed! Be warned⚠"
  );
  multipleReply++;
  warningSound.play();
}

// Handling sending and displaying user's message
function readyReply(text) {
  return `<h2 class="message__sender">
      Tiz-Quiz
      </h2>
      <p class="message__content">
      ${text}
      </p>`;
}

// Handling creating and displaying bot's reply
function createAndSendMessage() {
  if (inputChat.value.trim()) {
    let message = document.createElement("div");
    message.classList.add("message");
    message.classList.add("message--right");
    message.innerHTML = `<h2 class="message__sender">
                            Admin
                            </h2>
                            <p class="message__content">
                            ${inputChat.value}
                            </p>`;
    chatSection.appendChild(message);
    prevMessage = inputChat.value;
    inputChat.value = "";

    createAndSendReplyMessage();
  } else {
    inputChat.value = "";
  }
}

function createAndSendReplyMessage() {
  // Make the input field always focus
  inputChat.focus();

  // when user has inputted multiple answers twice or more, quiz terminatted!
  if (multipleReply > 1) {
    if (multipleReply === 2) {
      chatReplies[0] = readyReply(
        "How I wish I could forgive you again, but <span>RULES ARE RULES!</span>.\
      You hereby have been disqualified from the quiz, due to your intransigent,\
       incorrigible, obstinate and lackadaisical\
      attitude(I had to check the dic to put this up🤣 but anyways BYE!!!😡)."
      );
      multipleReply++;
    }
  }

  // expected first user input
  else if (prevMessage.toLowerCase() === "hello") {
    chatReplies[0] = readyReply(
      "Glad you choose to play the game. Tiz-Quiz is an automatic\
    quiz app that gives you question and marks 100% on its own.\
    Send a <em>&ldquo;<span>Start</span>&rdquo;</em> to start playing"
    );
  }

  // More info bout the quiz
  else if (
    prevMessage.toLowerCase() === "start" ||
    prevMessage.toLowerCase() === "help"
  ) {
    // when the quiz is about to start or user asks for help
    chatReplies[0] = readyReply(
      "<b><u>Instructions📌</u></b>: You have 20 questions to answer,\
    and fortunately there's no timer😉, so take your time. This is not human controlled,\
     so <b>inputting the correct <span>keyword</span> is very important!</b>"
    );

    chatReplies[1] = readyReply(
      '<b><u>How to play</u></b>: To answer a question,\
    type the question number plus the option you choose, exempli gracia "35A" if\
    you feel the answer to question 35 is A. <span>Note that there\'s no space between the number and the \
    letter</span>. "✔", means a correct answer and "❌"\
    means otherwise. In case you get stucked at any point in time, type &ldquo;<span>Help</span>&rdquo;\
    to get these sets of infos again. <b><span>MULTIPLE ANSWERS IS NOT ALLOWED!</span></b>.\
     By the way, questions are dropped\
    automatically.<br><span><b>Good luck!👍</b></span>'
    );

    // only when the quiz is about to start
    if (prevMessage.toLowerCase() === "start") {
      chatReplies[2] = readyReply(
        "A lot of info to take in? Yeah I know😅, if you've gotten all of them,\
      type &ldquo;<span>Quiz</span>&rdquo;\
     to immediately get started, else go through them again."
      );
    }
  }

  // quiz starts here but requests user's name first
  else if (prevMessage.toLowerCase() === "quiz") {
    chatReplies[0] = readyReply(
      "One more thing, what is you name? Sorry I forgot to ask at first🌚 after all I'm just a bot🤖\
       (Just type in only your name!). You can change your name later in the menu"
    );
    questionNumber = 0;
  }
  // user's name is collected and stored and questions starts dropping
  else if (prevMessage.trim().toLowerCase() && questionNumber === 0) {
    changeNameBtn = document.querySelector(".change-name");
    changeNameBtn.classList.remove("faded");
    changeNameBtn?.addEventListener("click", () => {
      newName = prompt("Enter your new name🙂", newName || username);
    });
    username = `${prevMessage.slice(0, 1).toUpperCase()}${prevMessage
      .slice(1, prevMessage.length)
      .toLowerCase()}`;
    chatReplies[0] = readyReply(`Roger that, ${username}!`);
    // Quiz questions starts dropping from here
    chatReplies[1] = readyReply(question1);
    questionNumber = 1;
  }
  // when user inputs multiple answer (that is, when they try to answer the previous question)
  else if (prevMessage.startsWith(questionNumber - 1)) {
    multipleAnswerWarn();
  } else if (questionNumber > 0 || questionNumber === "end") {
    // All logics for marking, validating single answer and checking for wrong inputs!
    // Question 2
    if (questionNumber === 1 && prevMessage.startsWith(1)) {
      if (prevMessage.toLowerCase() === answers[1]) {
        answerIsCorrect();
      } else {
        answerIsWrong();
      }

      chatReplies[1] = readyReply(question2);
    } else if (questionNumber === 2 && prevMessage.startsWith(2)) {
      if (prevMessage.toLowerCase() === answers[2]) {
        answerIsCorrect();
      } else {
        answerIsWrong();
      }

      chatReplies[1] = readyReply(question3);
    } else if (questionNumber === 3 && prevMessage.startsWith(3)) {
      if (prevMessage.toLowerCase() === answers[3]) {
        answerIsCorrect();
      } else {
        answerIsWrong();
      }

      chatReplies[1] = readyReply(question4);
    } else if (questionNumber === 4 && prevMessage.startsWith(4)) {
      if (prevMessage.toLowerCase() === answers[4]) {
        answerIsCorrect();
      } else {
        answerIsWrong();
      }

      chatReplies[1] = readyReply(question5);
    } else if (questionNumber === 5 && prevMessage.startsWith(5)) {
      if (prevMessage.toLowerCase() === answers[5]) {
        answerIsCorrect();
      } else {
        answerIsWrong();
      }

      chatReplies[1] = readyReply(question6);
    } else if (questionNumber === 6 && prevMessage.startsWith(6)) {
      if (prevMessage === answers[6]) {
        answerIsCorrect();
      } else {
        answerIsWrong();
      }

      chatReplies[1] = readyReply(question7);
    } else if (questionNumber === 7 && prevMessage.startsWith(7)) {
      if (prevMessage.toLowerCase() === answers[7]) {
        answerIsCorrect();
      } else {
        answerIsWrong();
      }

      chatReplies[1] = readyReply(question8);
    } else if (questionNumber === 8 && prevMessage.startsWith(8)) {
      if (prevMessage.toLowerCase() === answers[8]) {
        answerIsCorrect();
      } else {
        answerIsWrong();
      }

      chatReplies[1] = readyReply(question9);
    } else if (questionNumber === 9 && prevMessage.startsWith(9)) {
      if (prevMessage.toLowerCase() === answers[9]) {
        answerIsCorrect();
      } else {
        answerIsWrong();
      }

      chatReplies[1] = readyReply(question10);
      chatReplies[2] = readyReply(
        "Are you having fun? If yes, send a &rdquo;👍&ldquo;\
         to show some love (you can send it anytime from now),\
         else just ignore this message🙂"
      );
    } else if (questionNumber === 10 && prevMessage.startsWith(10)) {
      if (prevMessage.toLowerCase() === answers[10]) {
        answerIsCorrect();
      } else {
        answerIsWrong();
      }

      chatReplies[1] = readyReply(question11);
    } else if (questionNumber === 11 && prevMessage.startsWith(11)) {
      if (prevMessage.toLowerCase() === answers[11]) {
        answerIsCorrect();
      } else {
        answerIsWrong();
      }

      chatReplies[1] = readyReply(question12);
    } else if (questionNumber === 12 && prevMessage.startsWith(12)) {
      if (prevMessage.toLowerCase() === answers[12]) {
        answerIsCorrect();
      } else {
        answerIsWrong();
      }

      chatReplies[1] = readyReply(question13);
    } else if (questionNumber === 13 && prevMessage.startsWith(13)) {
      if (prevMessage.toLowerCase() === answers[13]) {
        answerIsCorrect();
      } else {
        answerIsWrong();
      }

      chatReplies[1] = readyReply(question14);
    } else if (questionNumber === 14 && prevMessage.startsWith(14)) {
      if (prevMessage.toLowerCase() === answers[14]) {
        answerIsCorrect();
      } else {
        answerIsWrong();
      }

      chatReplies[1] = readyReply(question15);
    } else if (questionNumber === 15 && prevMessage.startsWith(15)) {
      if (prevMessage.toLowerCase() === answers[15]) {
        answerIsCorrect();
      } else {
        answerIsWrong();
      }

      chatReplies[1] = readyReply(question16);
    } else if (questionNumber === 16 && prevMessage.startsWith(16)) {
      if (prevMessage.toLowerCase() === answers[16]) {
        answerIsCorrect();
      } else {
        answerIsWrong();
      }

      chatReplies[1] = readyReply(question17);
    } else if (questionNumber === 17 && prevMessage.startsWith(17)) {
      if (prevMessage.toLowerCase() === answers[17]) {
        answerIsCorrect();
      } else {
        answerIsWrong();
      }

      chatReplies[1] = readyReply(question18);
    } else if (questionNumber === 18 && prevMessage.startsWith(18)) {
      if (prevMessage.toLowerCase() === answers[18]) {
        answerIsCorrect();
      } else {
        answerIsWrong();
      }

      chatReplies[1] = readyReply(question19);
    } else if (questionNumber === 19 && prevMessage.startsWith(19)) {
      if (prevMessage.toLowerCase() === answers[19]) {
        answerIsCorrect();
      } else {
        answerIsWrong();
      }

      chatReplies[1] = readyReply(question20);

      questionNumber = "end";
    }
    // Quiz successfully ends here
    else if (questionNumber === "end" && prevMessage.startsWith(20)) {
      if (prevMessage.toLowerCase() === answers[20]) {
        chatReplies[0] = readyReply("✔");
        score++;
        changeNameBtn.classList.add("faded");
        changeNameBtn = undefined;
      } else {
        answerIsWrong();
      }

      chatReplies[1] = readyReply(
        `You have come to the end of the quiz, hope you had fun, your score is <span><b>${score} / 20</b></span><br>\
        <button id="print-certificate">Print certificate</button>`
      );

      // generate a certificate of completion based on the username and score

      document.querySelector("#footer").classList.add("game-ended");
      document.querySelector(".certificate .name").textContent = `${
        newName || username
      }`;
      document.querySelector(
        ".certificate .score"
      ).textContent = `${score} / 20`;
      congratulationsSound.play();
    } else if (prevMessage.trim() === "👍") {
      chatReplies[0] = readyReply(
        "Thanks for showing some love, we love you too♥. Now get back to answering the last question."
      );
    } else {
      chatReplies[0] = readyReply(
        '<span style="color:red;background-color:white;">Invalid input!</span>'
      );
      chatReplies[1] = readyReply(
        "Remember, type &ldquo;<span>Help</span>&rdquo; in case you get stuck.\
         Checking the previous bot's message might also help!"
      );
    }
  } else {
    chatReplies[0] = readyReply(
      '<span style="color:red;background-color:white;">Invalid input!</span>'
    );
    chatReplies[1] = readyReply(
      "Remember, type &ldquo;<span>Help</span>&rdquo; in case you get stuck.\
       Checking the previous bot's message might also help!"
    );
  }

  if (multipleReply === 2) {
    chatReplies[0] = readyReply(
      "How I wish I could forgive you again, but <span>RULES ARE RULES!</span>\
    You hereby have been disqualified from the quiz, due to your intransigent,\
     incorrigible, obstinate and lackadaisical\
    attitude(I had to check the dic to put this up🤣 but anyways BYE!!!😡)."
    );
    multipleReply++;
  }

  for (let i = 0; i < chatReplies.length; i++) {
    if (chatReplies[i]) {
      let message = document.createElement("div");
      message.classList.add("message");
      message.innerHTML = chatReplies[i];
      setTimeout(() => {
        chatSection.appendChild(message);
      }, 500);
      chatReplies[i] = "";
    }
  }

  const userMessageNameTag = document.querySelectorAll(
    ".message--right .message__sender"
  );
  for (let i = 0; i < userMessageNameTag.length; i++) {
    if (username && username.trim() !== "") {
      userMessageNameTag[i].textContent = newName || username;
    }
  }

  setTimeout(() => {
    if (questionNumber === "end" && prevMessage.startsWith(20)) {
      // making the print certificate btn effective
      document
        .querySelector("#print-certificate")
        .addEventListener("click", () => {
          certificate.classList.add("visible");
        });
      // closing the certificate
      document.querySelector(".close-cert").addEventListener("click", () => {
        certificate.classList.remove("visible");
      });
    }
  }, 1000);

  if (prevMessage.toLowerCase() !== "start" && prevMessage.trim() !== "") {
    setTimeout(() => {
      chatSection.scrollBy(0, 10000);
    }, 500);
  } else {
    setTimeout(() => {
      chatSection.scrollBy(0, 50);
    }, 500);
  }
}

sendMessageBtn.addEventListener("click", createAndSendMessage);
document.body.addEventListener("keydown", (e) => {
  if (e.code === "Enter") {
    createAndSendMessage();
  }
});
changeThemeBtn.addEventListener("click", changeTheme);
menuBtn.addEventListener("click", () => {
  menu.classList.toggle("visible");
});
chatSection.addEventListener("click", () => {
  menu.classList.remove("visible");
});
menu.addEventListener("click", () => {
  setTimeout(() => {
    menu.classList.add("visible");
  }, 1);
});
document.querySelector(".print-cert").addEventListener("click", () => {
  window.print();
});
toggleSilentBtn.addEventListener("click", () => {
  // "muted" is not an actual CSS class, it's only used to mark the difference in state here in JS
  if (toggleSilentBtn.classList.contains("muted")) {
    toggleSilentBtn.classList.remove("muted");
    wrongSound = new Audio("wrong.mp3");
    correctSound = new Audio("correct.wav");
    warningSound = new Audio("siren.mp3");
    congratulationsSound = new Audio("congratulations.mp3");
    toggleSilentBtn.textContent = "Silent mode(off)";
  } else {
    toggleSilentBtn.classList.add("muted");
    toggleSilentBtn.textContent = "Silent mode(on)";
    wrongSound = new Audio();
    correctSound = new Audio();
    warningSound = new Audio();
    congratulationsSound = new Audio();
  }
});
