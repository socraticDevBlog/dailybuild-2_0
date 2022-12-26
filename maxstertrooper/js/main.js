var canvas = document.getElementById("mainCanvas");
var context = canvas.getContext("2d");

var gameRunner = new Runner(canvas, context);

// display main menu
//
gameRunner.menu(gameRunner);

document.onkeydown = checkKey;

function checkKey(e) {
  var event = window.event ? window.event : e;

  switch (event.code) {
    case "ArrowRight":
      gameRunner.moveCannonRight(gameRunner, canvas.width);
      break;

    case "ArrowLeft":
      gameRunner.moveCannonLeft(gameRunner, canvas.width);
      break;

    case "ArrowUp":
      gameRunner.fire(gameRunner);
      break;

    case "KeyS":
      gameRunner.start(gameRunner);
      break;

    case "KeyP":
      gameRunner.pause(gameRunner);
      break;

    case "KeyR":
      window.location.reload();
      break;

    case "KeyM":
      gameRunner.callMenuDisplay(gameRunner);
      break;
  }
}
