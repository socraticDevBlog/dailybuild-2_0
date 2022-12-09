function printTime(dateObj) {
  let hours = dateObj.getHours();
  let minutes = dateObj.getMinutes();

  let printedHours = hours >= 10 ? hours : "0" + hours;
  let printedMinutes = minutes >= 10 ? minutes : "0" + minutes;

  return printedHours + ":" + printedMinutes;
}

function printDate(dateObj) {
  const y = new Intl.DateTimeFormat("en", { year: "numeric" }).format(dateObj);
  const m = new Intl.DateTimeFormat("en", { month: "short" }).format(dateObj);
  const d = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(dateObj);
  return `${d}-${m}-${y}`;
}

function getDate(luxonDateObj, offset) {
  let dateObj = luxonDateObj.toJSDate();

  offset = luxonDateObj.isInDST ? (offset + 1) : offset;

  let diff = offset * 60 + dateObj.getTimezoneOffset();
  return new Date(dateObj.getTime() + diff * 60 * 1000);
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

const nyOffset = -5.0;
const parisOffset = 1.0;
const bulgOffset = 2.0;
const turkOffset = 3.0;
const chiOffset = -6.0;
const denverOffset = -7.0;
const sfOffset = -8.0;

const nytimeCell = document.getElementById("ny-time");
const paristimeCell = document.getElementById("paris-time");
const chiTimeCell = document.getElementById("chicago-time");
const denverTimeCell = document.getElementById("denver-time");
const sftimeCell = document.getElementById("pacific-time");
const beatimeCell = document.getElementById("beat-time");
const bulgariaTimeCell = document.getElementById("bulgaria-time");
const turkeyTimeCell = document.getElementById("turkey-time");

function load() {
  let ny = getDate(luxon.DateTime.now().setZone('America/New_York'), nyOffset);
  let paris = getDate(luxon.DateTime.now().setZone('Europe/Paris'), parisOffset);
  let sf = getDate(luxon.DateTime.now().setZone('America/Los_Angeles'), sfOffset);
  let chicago = getDate(luxon.DateTime.now().setZone('America/Chicago'), chiOffset);
  let denver = getDate(luxon.DateTime.now().setZone('America/Denver'), denverOffset);
  let bulgaria = getDate(luxon.DateTime.now().setZone('Europe/Athens'), bulgOffset);
  let turkey = getDate(luxon.DateTime.now().setZone('Europe/Istanbul'), turkOffset);

  beatimeCell.innerText = getBeats(new Date());
  sftimeCell.innerText = printTime(sf);
  nytimeCell.innerText = printTime(ny);
  paristimeCell.innerText = printTime(paris);
  chiTimeCell.innerText = printTime(chicago);
  denverTimeCell.innerText = printTime(denver);
  bulgariaTimeCell.innerText = printTime(bulgaria);
  turkeyTimeCell.innerText = printTime(turkey);
}

load();

window.setInterval(function () {
  load();
}, 5000);
