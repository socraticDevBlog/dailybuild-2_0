function printTime(dateObj) {
  let hours = dateObj.getHours();
  let minutes = dateObj.getMinutes();

  if (minutes > 10) {
    return hours + "h" + minutes + "min";
  } else {
    return hours + "h0" + minutes + "min";
  }
}

function printDate(dateObj) {
  const y = new Intl.DateTimeFormat("en", { year: "numeric" }).format(dateObj);
  const m = new Intl.DateTimeFormat("en", { month: "short" }).format(dateObj);
  const d = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(dateObj);
  return `${d}-${m}-${y}`;
}

function getDate(dateObj, offset) {
  let diff = offset * 60 + dateObj.getTimezoneOffset();
  return new Date(dateObj.getTime() + diff * 60 * 1000);
}

function getBeats(dateObj) {
  // ((UTC+1minutes * 60) + (UTC+1hours * 3600)) / 86.4
  let d = new Date();
  let h = d.getHours();
  let m = d.getMinutes();
  let s = d.getSeconds();
  let tzoff = 60 + d.getTimezoneOffset();
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
const sfOffset = -8.0;

const nytimeCell = document.getElementById("nytime");
const nydateCell = document.getElementById("nydate");
const utctimeCell = document.getElementById("utctime");
const utcdateCell = document.getElementById("utcdate");
const paristimeCell = document.getElementById("paristime");
const parisdateCell = document.getElementById("parisdate");
const tktimeCell = document.getElementById("tktime");
const tkdateCell = document.getElementById("tkdate");

const sftimeCell = document.getElementById("sftime");
const sfdateCell = document.getElementById("sfdate");
const chitimeCell = document.getElementById("chitime");
const chidateCell = document.getElementById("chidate");
const beatimeCell = document.getElementById("beattime");
const beatdateCell = document.getElementById("beatdate");

function load() {
  let today = new Date();
  let ny = getDate(today, nyOffset);
  let paris = getDate(today, parisOffset);
  let sf = getDate(today, sfOffset);
  let tk = getDate(today, turkOffset);
  let chi = getDate(today, chiOffset);

  beatimeCell.innerText = getBeats();
  beatdateCell.innerText = printDate(paris);
  sftimeCell.innerText = printTime(sf);
  sfdateCell.innerText = printDate(sf);
  chitimeCell.innerText = printTime(chi);
  chidateCell.innerText = printDate(chi);
  nytimeCell.innerText = printTime(ny);
  nydateCell.innerText = printDate(ny);
  paristimeCell.innerText = printTime(paris);
  parisdateCell.innerText = printDate(paris);
  tktimeCell.innerText = printTime(tk);
  tkdateCell.innerText = printDate(tk);
  utctimeCell.innerText = printTime(today, 0);
  utcdateCell.innerText = printDate(today, 0);
}

load();

window.setInterval(function(){
  load();
}, 30000);
