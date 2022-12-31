import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= options.defaultDate) {
      Notiflix.Notify.failure("Please choose a date in the future");
    } else {
      button.removeAttribute('disabled');
    }
    let selectedDate = selectedDates[0].getTime();
    console.log('selectedDate', selectedDate);
  },
};

flatpickr("#datetime-picker", options);

const button = document.querySelector('button[data-start]');
button.setAttribute('disabled', 'true');
// let timerId = null;

button.addEventListener('click', onClickStartBtn);

function onClickStartBtn(evt) {
  const startTime = Date.now();
  console.log('startTime', startTime)
  
  setInterval(() => {
    const deltaTime = options.selectedDate - startTime;
    console.log(deltaTime)
    const { days, hours, minutes, seconds } = convertMs(deltaTime);
    console.log(`${days}:${hours}:${minutes}:${seconds}`);
  }, 1000);
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}