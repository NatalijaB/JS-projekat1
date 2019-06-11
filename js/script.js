const kartice = document.querySelectorAll('.kartica');
let kliknutaKartica = false;
let blokTabla = false;
let prvaKartica;
let drugaKartica;
let brojPoteza = document.querySelector('span');
let brojac = 0;
let dugme = document.querySelector('button');
let timerDisplay = document.querySelector('#timer');
let countdown;



function timer(seconds){
    clearInterval(countdown);
    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);

    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now())/1000);
        if(secondsLeft <0){
            clearInterval(countdown);
            return;
        }
        displayTimeLeft(secondsLeft)
    }, 1000);

}

function displayTimeLeft(seconds){
    const minutes = Math.floor(seconds /60);
    const remainingSeconds = seconds%60;
    const display = `0${minutes}:${remainingSeconds < 10 ? '0' : ""}${remainingSeconds}`;
    timerDisplay.textContent = "Time Remaining: " + display;
}


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

function jesuliPar() {
    let jesuPar = prvaKartica.dataset.framework === drugaKartica.dataset.framework;
    jesuPar ? ostaviKartice() : vratiKartice();
}

function ostaviKartice() {
    prvaKartica.removeEventListener('click', flipCard);
    drugaKartica.removeEventListener('click', flipCard);

    resetuj();
}

function vratiKartice() {
    blokTabla = true;

    setTimeout(() => {
        prvaKartica.classList.remove('flip');
        drugaKartica.classList.remove('flip');
        resetuj();
    }, 1500);
}
function resetuj() {
    [kliknutaKartica, blokTabla] = [false, false];
    [prvaKartica, drugaKartica] = [null, null];
    brojac++;
    brojPoteza.textContent =brojac;
}
(function mesanje() {
    kartice.forEach(kartica => {
        let randomPos = Math.floor(Math.random() * 12);
        kartica.style.order = randomPos;
    });
})();
function novaIgra(){
    timer(300);
    brojac = 0;
    brojPoteza.textContent = brojac;
    kartice.forEach(kartica=>{
    kartica.classList.remove('flip');
    });
    mesanje;
}

kartice.forEach(kartica => kartica.addEventListener('click', flipCard));
dugme.addEventListener('click', novaIgra)