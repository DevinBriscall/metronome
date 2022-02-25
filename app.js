import Timer from "./timer.js";


const tempoDisplay = document.querySelector('.tempo');
const tempoText = document.querySelector('.tempo-text');
const decreaseTempoBtn = document.querySelector('.decrease-tempo');
const increaseTempoBtn = document.querySelector('.increase-tempo');
const tempoSlider = document.querySelector('.slider');
const startStopBtn = document.querySelector('.start-stop');
const subtractBeats = document.querySelector('.subtract-beats');
const addBeats = document.querySelector('.add-beats');
const measureCount = document.querySelector('.measure-count');

const click1 = new Audio('Metronome1.wav');
const click2 = new Audio('Metronome.wav');



let bpm = 140;
let beatsPerMeasure = 4;
let tempoTextString = 'Speed Demon'
let count = 0;
let isRunning = false;

decreaseTempoBtn.addEventListener('click', () => {
    if (bpm <= 20) { return }
    bpm--;
    updateMetronome();
})
increaseTempoBtn.addEventListener('click', () => {
    if (bpm >= 280) { return }
    bpm++;
    updateMetronome();
})
tempoSlider.addEventListener('input', () => {
    bpm = tempoSlider.value;
    updateMetronome();
})

subtractBeats.addEventListener('click', () => {
    if (beatsPerMeasure <= 2) { return }
    beatsPerMeasure--;
    measureCount.textContent = beatsPerMeasure;
    count = 0;
})
addBeats.addEventListener('click', () => {
    if (beatsPerMeasure >= 12) { return }
    beatsPerMeasure++;
    measureCount.textContent = beatsPerMeasure;
    count = 0;
})

startStopBtn.addEventListener('click', () => {
    count = 0;
    if (isRunning == false) {
        isRunning = true;
        startStopBtn.textContent = "Pause"
        metronome.start();
    }
    else {
        isRunning = false;
        startStopBtn.textContent = "Start"
        metronome.stop();
    }
})

function updateMetronome() {
    tempoDisplay.textContent = bpm;
    tempoSlider.value = bpm;
    metronome.timeInterval = 60000 / bpm;
    if (bpm <= 90) { tempoTextString = 'Easy does it!'}
    if (bpm > 90 && bpm <= 140) { tempoTextString = 'Someone had their coffee today...'}
    if (bpm > 140 && bpm <= 240) { tempoTextString = 'Speed Demon' }
    if (bpm > 240) { tempoTextString = 'Okay now you are just showing off'}
    tempoText.textContent = tempoTextString;
}


function playClick() {
    if (count == beatsPerMeasure) {
        count = 0;
    }
    if (count == 0) {
        click1.play();
        click1.currentTime = 0;
    }
    else {
        click2.play();
        click2.currentTime = 0;
    }
    count++;
}

const metronome = new Timer(playClick, 60000 / bpm, { immediate: true });

