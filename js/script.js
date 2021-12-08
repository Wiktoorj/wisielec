const divHaslo = document.querySelector('.haslo');
const przyciski = document.querySelector('.przyciski');

const hasla = ['Techno ist mehr als musik', 'Transformator to zło', 'Sylwester w Zakopanem', 'Rozliczenie z podatku PIT']
const indexHasla = Math.floor(Math.random() * hasla.length)
let haslo = hasla[indexHasla].toUpperCase()

let hasloKreski = "";

let alfabet = 'aąbcćdeęfghijklłmnńoóqprstuwxyzżź'.toUpperCase();
let obrazek = 0;

function wypiszHaslo() {
    divHaslo.textContent = hasloKreski;
}

function ukrycieHasla() {
    for (let i = 0; i < haslo.length; i++) {
        if (haslo.charAt(i) == ' ' || haslo.charAt(i) == '?' || haslo.charAt(i) == ',') {
            hasloKreski += haslo.charAt(i)
        } else {
            hasloKreski += '-'
        }
        wypiszHaslo()
    }
}

function stworzPrzyciski() {
    const input = document.createElement('input');
    input.placeholder = 'A może już potrafisz odgadnąć hasło?'
    przyciski.appendChild(input)
    for (let i = 0; i < alfabet.length; i++) {
        
        const newDiv = document.createElement('div')
        newDiv.textContent = alfabet.charAt(i);
        newDiv.className = 'litery'
        przyciski.appendChild(newDiv)
        
        
    }
}

String.prototype.ustawZnak = function (miejsce, znak) {
    if (miejsce > this.length - 1) return this.toString()
    else return this.substr(0, miejsce) + znak + this.substr(miejsce + 1)
}

function sprawdzWygrana() {
    if (hasloKreski == haslo) {
        przyciski.classList.add('lose')
        przyciski.innerHTML = '<p style="font-size: 60px;">WYGRAŁEŚ!</p><div class="again">Zagraj jeszcze raz</div>'
        const again = document.querySelector('.again')
        again.addEventListener('click', newGame)
    }
    if (obrazek == 10) {
        przyciski.classList.add('lose')
        przyciski.innerHTML = '<p style="font-size: 60px;">KONIEC GRY</p><div class="again">Zagraj jeszcze raz</div>'
        const again = document.querySelector('.again')
        again.addEventListener('click', newGame)
    }
}

function klikniecie() {
    let flag = false;
    for (let i = 0; i < haslo.length; i++) {
        if (this.textContent == haslo.charAt(i)) {
            hasloKreski = hasloKreski.ustawZnak(i, this.textContent)
            flag = true
        }
    }

    if (flag == true) {
        this.classList.add('trafiony');
        wypiszHaslo()
    } else {
        this.classList.add('pudlo');
        obrazek++
        if (obrazek <= 10) document.querySelector('img').src = `img/w${obrazek}.png`
    }
    sprawdzWygrana()
}

function init() {
    ukrycieHasla()
    stworzPrzyciski()

    const litery = document.querySelectorAll('.litery');
    for (litera of litery) {
        litera.addEventListener('click', klikniecie)
    }

}

function newGame() {
    przyciski.classList.remove('lose')
    przyciski.innerHTML = ''
    const nowyIndex = Math.floor(Math.random() * hasla.length);
    if (indexHasla == nowyIndex && indexHasla == 0) haslo[nowyIndex + 1]
    else if (indexHasla == nowyIndex && indexHasla == (hasla.length - 1)) haslo[nowyIndex - 1]
    else if (indexHasla == nowyIndex) haslo[nowyIndex + 1]
    else haslo = hasla[nowyIndex].toUpperCase()
    hasloKreski = "";
    obrazek = 0;
    document.querySelector('img').src = `img/w0.png`
    init()
    console.log(haslo)
}

window.onload = init()