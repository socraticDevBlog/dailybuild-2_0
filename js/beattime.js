function printTime(datetime) {
  return datetime.toFormat('HH:mm');
}

function getBeats(dateObj) {
  // ((UTC+1minutes * 60) + (UTC+1hours * 3600)) / 86.4
  let h = dateObj.getHours();
  let m = dateObj.getMinutes();
  let s = dateObj.getSeconds();
  let tzoff = 60 + dateObj.getTimezoneOffset();
  return (
    "@" +
    (
      "000" +
      (Math.floor((h * 3600 + (m + tzoff) * 60 + s) / 86.4) % 1000)
    ).slice(-3)
  );
}


const nytimeCell = document.getElementById("ny-time");
const paristimeCell = document.getElementById("paris-time");
const chiTimeCell = document.getElementById("chicago-time");
const winnipegTimeCell = document.getElementById("winnipeg-time");
const denverTimeCell = document.getElementById("denver-time");
const sftimeCell = document.getElementById("pacific-time");
const beatimeCell = document.getElementById("beat-time");
const bulgariaTimeCell = document.getElementById("bulgaria-time");
const turkeyTimeCell = document.getElementById("turkey-time");

function load() {
  let ny = luxon.DateTime.now().setZone("America/New_York");
  let paris = luxon.DateTime.now().setZone("Europe/Paris");
  let sf = luxon.DateTime.now().setZone("America/Los_Angeles");
  let chicago = luxon.DateTime.now().setZone("America/Chicago");
  let winnipeg = luxon.DateTime.now().setZone("America/Winnipeg");
  let denver = luxon.DateTime.now().setZone("America/Denver");
  let bulgaria = luxon.DateTime.now().setZone("Europe/Athens");
  let turkey = luxon.DateTime.now().setZone("Europe/Istanbul");

  beatimeCell.innerText = getBeats(new Date());
  sftimeCell.innerText = printTime(sf);
  nytimeCell.innerText = printTime(ny);
  paristimeCell.innerText = printTime(paris);
  chiTimeCell.innerText = printTime(chicago);
  winnipegTimeCell.innerText = printTime(winnipeg);
  denverTimeCell.innerText = printTime(denver);
  bulgariaTimeCell.innerText = printTime(bulgaria);
  turkeyTimeCell.innerText = printTime(turkey);
}

load();

window.setInterval(function () {
  load();
}, 5000);
