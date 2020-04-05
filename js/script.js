const kartice = document.querySelectorAll('.kartica');
let kliknutaKartica = false;
let blokTabla = false;
let prvaKartica;
let drugaKartica;
let brojPoteza = document.querySelector('span');
let brojac = 0;
let brojacZaPar = 0;
let dugme = document.querySelector('#modalBtn');
let timerDisplay = document.querySelector('#timer');
let odbrojavanje;
let modal = document.querySelector('#modal');
let pOfModal = document.querySelector('#pOfModal');




// timer

function timer(seconds) {
    clearInterval(odbrojavanje);
    const now = Date.now();
    const then = now + seconds * 1000;
    preostaloVreme(seconds);

    odbrojavanje = setInterval(() => {
        const sekunde = Math.round((then - Date.now()) / 1000);
        if (sekunde <= 0) {
            krajIgre();
        }
        preostaloVreme(sekunde);
    }, 1000);

}

function preostaloVreme(seconds) {
    const min = Math.floor(seconds / 60);
    const preostaleSek = seconds % 60;
    const display = `0${min}:${preostaleSek < 10 ? '0' : ""}${preostaleSek}`;
    timerDisplay.textContent = "Time Remaining: " + display;
}


// okretanje kartica

function flipCard() {
    if (blokTabla) return;
    if (this === prvaKartica) return;
    this.classList.add('flip');

    // prvi klik
    if (!kliknutaKartica) {
        kliknutaKartica = true;
        prvaKartica = this;
        return;
    }
    // drugi klik
    drugaKartica = this;
    jesuliPar();

}

// matching

function jesuliPar() {
    let jesuPar = prvaKartica.dataset.framework === drugaKartica.dataset.framework;
    jesuPar ? ostaviKartice() : vratiKartice();
}

// za par

function ostaviKartice() {
    prvaKartica.removeEventListener('click', flipCard);
    drugaKartica.removeEventListener('click', flipCard);
    brojacZaPar++;
    resetuj();

    if (brojacZaPar == 8) {
        setTimeout(()=>{
            krajIgre();
        },1000);

    }
}

// za nepar

function vratiKartice() {
    blokTabla = true;

    setTimeout(() => {
        prvaKartica.classList.remove('flip');
        drugaKartica.classList.remove('flip');
        resetuj();
    }, 1500);
}

// resetuje kartice
function resetuj() {
    [kliknutaKartica, blokTabla] = [false, false];
    [prvaKartica, drugaKartica] = [null, null];
    brojac++;
    brojPoteza.textContent = brojac;
}

// mesanje kartica
function mesanje() {
    kartice.forEach(kartica => {
        let randomPos = Math.floor(Math.random() * 12);
        kartica.style.order = randomPos;
    });
};


// novaigra
function novaIgra() {
    modal.style.display = 'none';
    timer(180);
    brojac = 0;
    brojPoteza.textContent = brojac;
    brojacZaPar = 0;
    kartice.forEach(kartica => {
        kartica.classList.remove('flip');
    });
    mesanje();
}


//  kraj igre
function krajIgre() {
    clearInterval(odbrojavanje);
    modal.style.display = 'block';
    setTimeout(() => {
        location.reload();
    }, 2000);
}

kartice.forEach(kartica => kartica.addEventListener('click', flipCard));
dugme.addEventListener('click', novaIgra)