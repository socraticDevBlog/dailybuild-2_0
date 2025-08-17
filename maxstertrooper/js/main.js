var canvas = document.getElementById("mainCanvas");
var context = canvas.getContext("2d");

var gameRunner = new Runner(canvas, context, /*width=*/ 300, /*height=*/ 150);

// scale canvas
//
scaleScreen(canvas, context, gameRunner.width, gameRunner.height, /*smooth=*/ true);

// display main menu
//
gameRunner.menu(gameRunner);

document.onkeydown = checkKey;

function checkKey(e) {
  var event = window.event ? window.event : e;

  switch (event.code) {
    case "ArrowRight":
      gameRunner.moveCannonRight(gameRunner, gameRunner.width);
      break;

    case "ArrowLeft":
      gameRunner.moveCannonLeft(gameRunner, gameRunner.width);
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
