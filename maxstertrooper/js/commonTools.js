// return number of items in a dictionary
//
function dictCount(dict) {
  return Object.keys(dict).length;
}

// https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript (2019-08-19)
//
function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function drawCircle(context, x, y, radius, color) {
  context.beginPath();
  context.arc(x, y, radius, 0, Math.PI * 2, true);
  context.fillStyle = color;
  context.fill();
}

function drawRectangle(context, x, y, width, height, color) {
  context.beginPath();
  context.lineWidth = "3";
  context.strokeStyle = color;
  context.rect(x, y, width, height);
  context.stroke();
}

// printing text for this game
//
function textToCanvas(context, text, x, y, color, font) {
  context.font = font;
  context.fillStyle = color;
  context.fillText(text, x, y);
}

function clearScreen(canvas) {
  var context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height);
}

function scaleScreen(canvas, context, width, height, smooth=true) {
  var scale = window.devicePixelRatio || 1;
  var container = canvas.parentNode.getBoundingClientRect();
  var zoom = Math.min(
    (container.height / height),
    (container.width / width),
  );
  var zoomScale = zoom * scale;
  canvas.style.height = `${height * zoom}px`;
  canvas.style.width = `${width * zoom}px`;
  if(smooth){
    canvas.height = height * zoomScale;
    canvas.width = width * zoomScale;
    context.scale(zoomScale, zoomScale);
  }
}
