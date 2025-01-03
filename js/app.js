const setTable = document.getElementById('table_num');
const extractedNum = document.getElementById('num_extr');
const btnExtr = document.querySelector('.btn_extr');
const btnQuit = document.getElementById('endGame');
const overlay = document.getElementById('overlay');
const btnResume = document.getElementById('resume')

// creo la tabella con i numeri del tabellone
const table = []
for (let i = 0; i < 90; i++) {
    const element = i + 1;

    table.push(element + ' ')
}
table.forEach((e) => setTable.innerHTML += `<li id=${e} style="text-align: center;">${e}</li>`)

// creo una funzione che genera un numero random come numero estratto
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

// creo un array che contenga tutti i numeri di cui ho bisogno
function createArrayOfNumbers(start, end) {

    const myArray = []
    for (i = start; i <= end; i++) {
        myArray.push(i)
    }

    return myArray
}

const numbersArray = createArrayOfNumbers(1, 90)

// al click extraggo un numero random facendo in modo che non si ripeta mai lo stesso numero e che lo schema si ad "esaurimento"
btnExtr.addEventListener('click', () => {

    const randomIndex = getRandomNumber(0, numbersArray.length - 1)
    const randomNumber = numbersArray[randomIndex]
    numbersArray.splice(randomIndex, 1)
    if (numbersArray.length === 0) {
        // extractedNum.innerHTML = '<div>FINISH</div>'
        overlay.classList.remove('d-none')
        btnResume.addEventListener('click', () => {
            location.reload()
        })
        clearInterval(tInterval)
    } else extractedNum.innerHTML = `<div>${randomNumber}</div>`

    // "accendo" il numero estratto sul tabellone
    if (table.map(e => parseInt(e)).includes(randomNumber)) {
        document.getElementById(`${randomNumber}`).classList.add('color')
    }
})

btnQuit.addEventListener('click', () => {
    location.reload()
})

//-------------------------------------------------------------------------
const toggleBtn = document.querySelector('.btn-toggle')
const btnStop = document.querySelector('.stopBtn')
const btnStart = document.querySelector('.startBtn')

//Game Time
let startTime, updatedTime, difference;
var tInterval;
let running = false;

function start() {
    if (!running) {
        startTime = new Date().getTime();
        tInterval = setInterval(getShowTime, 1);
        running = true;
    }
    toggleBtn.classList.remove('d-none')
    btnStop.classList.remove('d-none')
    btnStop.innerHTML = `<i class="fa-solid fa-stop"></i>`
    btnStart.innerHTML = `<i class="fa-solid fa-play"></i>`
    btnStart.classList.remove('startBtn')
}

function reset() {
    clearInterval(tInterval);
    running = false;
    document.getElementById('display').innerHTML = "00:00:00";
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    document.getElementById('display').innerHTML = hours + ":" + minutes + ":" + seconds;
}
