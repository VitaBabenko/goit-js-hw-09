import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const input = document.querySelector('#datetime-picker');
const button = document.querySelector('button[data-start]');
let timerId = null;

button.setAttribute('disabled', 'disabled');

input.addEventListener('click', onInput);
button.addEventListener('click', onClickStartBtn);

function onInput(evt) {
    const options = {
        enableTime: true,
        time_24hr: true,
        defaultDate: new Date(),
        minuteIncrement: 1,
        onClose(selectedDates) {
            console.log(selectedDates[0]);
        },
    };
    
    flatpickr(input, options);
    console.log(options)
}

function onClickStartBtn(evt) {
    
    
}

