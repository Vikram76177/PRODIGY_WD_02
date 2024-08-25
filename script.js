let startTime, updatedTime, difference, tInterval;
let running = false;
let time = [0, 0, 0, 0]; 
let lapCounter = 1;

const display = document.getElementById('display');
const lapList = document.getElementById('lapList');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');

function startTimer() {
    if (!running) {
        running = true;
        startTime = new Date().getTime();
        tInterval = setInterval(getShowTime, 1);
    }
}

function pauseTimer() {
    if (running) {
        running = false;
        clearInterval(tInterval);
    }
}

function resetTimer() {
    running = false;
    clearInterval(tInterval);
    time = [0, 0, 0, 0];
    display.innerHTML = '00:00:00:00';
    lapList.innerHTML = '';
    lapCounter = 1;
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    
    time[0] = Math.floor((difference / (1000 * 60 * 60)) % 24);
    time[1] = Math.floor((difference / (1000 * 60)) % 60);
    time[2] = Math.floor((difference / 1000) % 60);
    time[3] = Math.floor((difference % 1000) / 10);

    let hours = (time[0] < 10) ? "0" + time[0] : time[0];
    let minutes = (time[1] < 10) ? "0" + time[1] : time[1];
    let seconds = (time[2] < 10) ? "0" + time[2] : time[2];
    let milliseconds = (time[3] < 10) ? "0" + time[3] : time[3];
    
    display.innerHTML = hours + ":" + minutes + ":" + seconds + ":" + milliseconds;
}

function addLap() {
    if (running) {
        const lapTime = display.innerHTML;
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapCounter++}: ${lapTime}`;
        lapList.appendChild(lapItem);
    }
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', addLap);

