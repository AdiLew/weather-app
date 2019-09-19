

const weatherForm = document.querySelector('form');
const searchElement = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

messageOne.textContent = '';
messageTwo.textContent = '';

weatherForm.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const address = searchElement.value;
    messageOne.textContent = '';
    messageTwo.textContent = 'Fetching your forecast';

    fetch(`http://localhost:3000/weather?address=${address}`).then((response) => {
        response.json().then(({ error, location, forecast }) => {
            if (error) {
                messageOne.textContent = 'Error!'
                messageTwo.textContent = error;
                return;
            }
            messageOne.textContent = location;
            messageTwo.textContent = forecast;
            return;
        });
    });
});