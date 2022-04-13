let startBox = document.querySelector('.start-box')
let inputCounter = startBox.querySelector('#input-counter');
let startCounter = startBox.querySelector('#start-counter');
let timerCircle = document.querySelector('.c100');
let timerNum = document.querySelector('.c100 > span');
let lastPercent = 'p100'
let originalSeconds , seconds , timerId;

startCounter.addEventListener('click' , function(e) {
    seconds = parseInt(inputCounter.value)

    if(isNaN(seconds)) return toggletErrorMessage({ show : true , message : 'زمان را به درستی وارد کنید' });


    toggletErrorMessage({ show : false });
    toggleStartBox({ show : false })
    toggleLoadingMessage({ show : true })
    toggleTimer({ show : true , seconds })


    originalSeconds = seconds;
    timerId = setInterval(startTimer, 1000);
})

let startTimer  = () => {
    if(lastPercent) timerCircle.classList.remove(lastPercent)

    if(seconds <= 0) {
        clearInterval(timerId);
        toggleStartBox({ show : true })
        toggleTimer({ show : false })
        toggleLoadingMessage({ show : false })
        return;
    }

    seconds -= 1;
    timerNum.textContent = seconds;

    let percent = lastPercent = `p${Math.abs(Math.floor((( (originalSeconds - seconds) / originalSeconds) * 100) - 100))}`
    timerCircle.classList.add(percent)
}

let toggletErrorMessage = ({ show , message }) => {
    let errorElement = document.querySelector('#error-message');
    if(show) {
        errorElement.textContent = message;
        errorElement.classList.add('active')
    } else {
        errorElement.classList.remove('active');
    }
}

let toggleStartBox = ({ show }) => {
    if(show) {
        startBox.classList.add('active');
        inputCounter.value = ''
    } else {
        startBox.classList.remove('active')
    }
}

let toggleTimer = ({ show , seconds }) => {
    if(show) {
        timerCircle.style.display = 'block';
        timerNum.textContent = seconds;
    } else {
        timerCircle.style.display = 'none';
    }
}

let toggleLoadingMessage = ({ show }) => {
    let loadingMessage = document.querySelector('.message .loading')
    let successMessage = document.querySelector('.message .success')    
    if(show) {
        loadingMessage.style.display = 'block';
        successMessage.style.display = 'none';    
    } else {
        loadingMessage.style.display = 'none';
        successMessage.style.display = 'block';       
    }
}