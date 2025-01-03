const setTable = document.getElementById('table_num');
const extractedNum = document.getElementById('num_extr');
const btnExtr = document.querySelector('.btn_extr');
const btnQuit = document.getElementById('endGame');

// creo la tabella con i numeri del tabellone
const table = []
for (let i = 0; i < 90; i++) {
    const element = i + 1;

    table.push(element + ' ')
}
table.forEach((e) => setTable.innerHTML += `<li id=${e}>${e}</li>`)

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
        extractedNum.innerHTML = '<div>FINISH</div>'
    } else extractedNum.innerHTML = `<div>${randomNumber}</div>`

    // "accendo" il numero estratto sul tabellone
    if (table.map(e => parseInt(e)).includes(randomNumber)) {
        document.getElementById(`${randomNumber}`).classList.add('color')
    }
})

btnQuit.addEventListener('click', () => {
    location.reload()
})

