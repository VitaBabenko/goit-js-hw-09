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
    console.log('selectedDates[0]', selectedDates[0]);
  },
};

flatpickr("#datetime-picker", options);

const button = document.querySelector('button[data-start]');
const timer = document.querySelector('.timer');

const field = document.querySelectorAll('.field');
const days = document.querySelector('span[data-days]');
const hours = document.querySelector('span[data-hours]');
const minutes = document.querySelector('span[data-minutes]');
const seconds = document.querySelector('span[data-seconds]');
const label = document.querySelectorAll('.label');



timer.style.display = 'flex';
timer.style.marginTop = '15px';
field[0].style.fontSize = '35px';
field[1].style.fontSize = '35px';
field[2].style.fontSize = '35px';
field[3].style.fontSize = '35px';

field[0].style.marginRight = '15px';
field[1].style.marginRight = '15px';
field[2].style.marginRight = '15px';

days.style.display = 'flex';
hours.style.display = 'flex';
minutes.style.display = 'flex';
seconds.style.display = 'flex';

label[0].style.fontSize = '13px';
label[1].style.fontSize = '13px';
label[2].style.fontSize = '13px';
label[3].style.fontSize = '13px';

label[0].style.textTransform = 'uppercase';
label[1].style.textTransform = 'uppercase';
label[2].style.textTransform = 'uppercase';
label[3].style.textTransform = 'uppercase';

label[0].style.fontWeight = '600';
label[1].style.fontWeight = '600';
label[2].style.fontWeight = '600';
label[3].style.fontWeight = '600';


button.setAttribute('disabled', 'true');

button.addEventListener('click', onClickStartBtn);

function onClickStartBtn(evt) {
  
  const intervalId = setInterval(() => {
    const startTime = Date.now();
    // console.log('startTime', startTime);
    const deltaTime = selectedDate - startTime;
    // console.log(deltaTime);
    const { days, hours, minutes, seconds } = convertMs(deltaTime);

    updateTimer({ days, hours, minutes, seconds });

    console.log(`${days}:${hours}:${minutes}:${seconds}`);
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
};

function updateTimer({ days, hours, minutes, seconds }) {
  timer.textContent = `${days}:${hours}:${minutes}:${seconds}`;
}

