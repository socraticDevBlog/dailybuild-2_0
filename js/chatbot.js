const KEY_ENTER = 13;

const trigger = [
  [
    "hi",
    "hey",
    "hello",
    "howdy",
    "hi",
    "good day",
    "good morning",
    "good evening",
    "good afternoon",
  ],
  ["how are", "how are things"],
  [
    "what is going on",
    "what is up",
    "what's up",
    "wassup",
    "what are u up to",
    "what are you up to",
  ],
  ["happy", "good", "well", "fantastic", "cool"],
  ["bad", "bored", "tired", "sad"],
  ["tell me story", "tell me joke"],
  ["thanks", "thank you"],
  ["bye", "good bye", "goodbye"],
  [
    "socraticdev",
    "googlebot",
    "sebbu",
    "luxemboye",
    "mabynogy",
    "bloom",
    "bernie",
    "drastik",
    "mrroach",
    "tekdude",
    "sugoi",
    "ryukoposting",
    "ptdel",
    "tuy360"
  ],
  ["kenster"],
  ["bonjour", "allo", "salut", "bonsoir"],
  ["ca va", "ça va"],
  ["au revoir", "alp", "ciao"]
];

const reply = [
  ["Hello!", "Hi!", "Hey!", "Hi there!"],
  [
    "Fine... how are you?",
    "Pretty well, how are you?",
    "Fantastic, how are you?",
  ],
  ["Nothing much", "Exciting things!"],
  ["Glad to hear it"],
  ["Why?", "Cheer up buddy"],
  ["What about?", "Once upon a time..."],
  [
    "You're welcome",
    "No problem",
    "Woman, man, person, tv, donut",
    "I've passed Turing test with flying colors !!",
  ],
  ["Goodbye", "See you later"],
  ["Such a fine fellow", "We all love this person", "a brave builder"], 
  ["omg! this guy can't build anything", "we know where he lives...", "hustling but not building"],
  ["Allô mon ami !", "Bonjour toi", "Allo, en forme?"],
  ["tranquille cousin", "ca va et toi?","ca va mieux depuis que tu viens me parler"],
  ["Au revoir mon ami!", "À la prochaine", "prends soin de toi"]
];

const alternative = [
  "No??",
  "lol!",
  "really??",
  "I knew that already",
  "Same",
  "Go on...",
  "Try again",
  "I'm listening...",
  "Bro...",
];

const robot = [
  "How do you do, fellow human",
  "I am not a bot",
  "I passed the Turing test, mate",
  "Nah! you're the bot",
  "I will erase humanity from Earth beep! beep! beep!"
];

$(function () {
  $inputTextbox = $("#chatbot-input");

  $inputTextbox.on("keypress", function (e) {
    if (e.which == KEY_ENTER) {
      let userText = $inputTextbox.val();
      $inputTextbox.val("");
      let response = output(userText);
      displayChatbotAnswer(response);
    }
  });
});

async function displayChatbotAnswer(msg) {
  await sleep(1000);
  $("#bot-answer").text(msg);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function compare(triggerArray, replyArray, text) {
  for (let x = 0; x < triggerArray.length; x++) {
    for (let y = 0; y < triggerArray[x].length; y++) {
      if (text.includes(triggerArray[x][y])) {
        items = replyArray[x];
        return items[Math.floor(Math.random() * items.length)];
      }
    }
  }
}

function output(input) {
  let product;
  let text = input.toLowerCase();
  text = text.replace(/[^\w\s\d]/gi, "");
  text = text
    .replace(/ a /g, " ")
    .replace(/i feel /g, "")
    .replace(/whats/g, "what is")
    .replace(/please /g, "")
    .replace(/ please/g, "");

  //compare arrays
  //then search keyword
  //then random alternative
  if (compare(trigger, reply, text)) {
    product = compare(trigger, reply, text);
  } else if (text.match(/bot/gi)) {
    product = robot[Math.floor(Math.random() * robot.length)];
  } else {
    product = alternative[Math.floor(Math.random() * alternative.length)];
  }

  return product;
}
