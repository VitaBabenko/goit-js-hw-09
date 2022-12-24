const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
let timerId = null;

startBtn.addEventListener('click', onClickStartBtn);
stopBtn.addEventListener('click', onClickStoptBtn);

function onClickStartBtn(evt) {
    timerId = setInterval(() => { document.body.style.backgroundColor = getRandomHexColor() }, 1000);
    startBtn.setAttribute('disabled', 'disabled');
    stopBtn.removeAttribute('disabled');
};

function onClickStoptBtn(evt) {
    clearInterval(timerId);
    stopBtn.setAttribute('disabled', 'disabled');
    startBtn.removeAttribute('disabled');
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}