// display radio only if screen is wide enough (i.e. not on mobile device)
const doDisplayRadioPlayer = $("#radio").css("display") != "none";

if (doDisplayRadioPlayer) {
  const webAmp = window.Webamp;
  new webAmp({
    zIndex: 999,
    initialTracks: [
      { url: "https://radio.neet.space/stream.mp3", duration: 0.0 },
    ],
  }).renderWhenReady(document.getElementById("radio"));
}
