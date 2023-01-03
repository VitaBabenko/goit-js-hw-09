import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

let selectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= options.defaultDate) {
      Notiflix.Notify.failure("Please choose a date in the future");
    } else {
      selectedDate = selectedDates[0];
      button.removeAttribute('disabled');
    }
    // console.log(selectedDates[0]);
  },
};

flatpickr("#datetime-picker", options);

const button = document.querySelector('button[data-start]');
const daysSpan = document.querySelector('span[data-days]');
const hoursSpan = document.querySelector('span[data-hours]');
const minutesSpan = document.querySelector('span[data-minutes]');
const secondsSpan = document.querySelector('span[data-seconds]');

button.setAttribute('disabled', 'true');
button.addEventListener('click', onClickStartBtn);

function onClickStartBtn(evt) {
  const intervalId = setInterval(() => {
    const startTime = Date.now();
    const deltaTime = selectedDate - startTime;
    const { days, hours, minutes, seconds } = convertMs(deltaTime);
    
    daysSpan.textContent = days;
    hoursSpan.textContent = hours;
    minutesSpan.textContent = minutes;
    secondsSpan.textContent = seconds;

    // console.log(`${days}:${hours}:${minutes}:${seconds}`);
    if (deltaTime < 1000) {
      clearInterval(intervalId);
      return;
    }
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
