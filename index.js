const apiUrl = 'https://polisen.se/api/events'
/* tom array som används för att lagra data från api */
let allEvents = [];

async function fetchApi() {
    try {
        /* Förfrågan till apiUrl och inväntar svar */
        const response = await fetch(apiUrl)
        /* Om responsen inte är okej så visas ett felmeddelande */
        if (!response.ok) {
            throw new Error(`HTTP-fel! Status: ${response.status}`)
        }
        /* Om fetchen lyckas, konverteras svaret till json-format och sparas i variabeln data. */
        const data = await response.json();
        /*datat som hämtas från fetchen sparas i den globala variabeln allEvents */
        allEvents = data;
        return data;
    } catch (error) {
        /* Om problem uppstår skrivs ett felmeddelande ut. */
        console.error('Fetchen misslyckades.')
        displayError('Kunde inte hämta data, försök igen senare.')
    }
}

/* Funktion för att visa händelser på webbsidan */
function displayEvents(events) {
    /* Hämtar referens och sparar i eventList */
    const eventList = document.querySelector('#event-list')
    /* Ser till att tömma innehållet */
    eventList.innerHTML = '';

    /* sorterar händelserna efter datum av publicering */
    const sortedEvents = events.sort((a, b) => new Date(b.datetime) - new Date(a.datetime));
    /* hämtar de 21 senaste händelserna med hjälp av slice */
    const latestEvents = sortedEvents.slice(0, 21)

    /*itererar genom händelserna och skapar listor i html. Backticks används för att kunna använda nycklarna i datat/fetchen. Man kan se dessa namn  i insomnia. Dessa listor läggs till i eventList med hjälp av appendChild() */
    latestEvents.forEach(event => {
        const listItem = document.createElement('li')
        listItem.textContent = `${event.name}, ${event.summary}`;
        eventList.appendChild(listItem)
    });
}

/* Funktion som visar felmeddelande */
function displayError(message) {
    const eventList = document.querySelector('#event-list')
    eventList.innerHTML = `<li class="error">${message}</li>`
}

/* Funktion för att ladda in och visa data */
async function showData() {
    await fetchApi()
    displayEvents(allEvents)
}

showData();

/* Funktion för att filtrera datat / toLowerCase göra att inmatningen inte är case sensative. */
function filterEvents(userInput) {
    const filteredEvents = allEvents.filter(event => event.location.name.toLowerCase().includes(userInput.toLowerCase()))
    displayEvents(filteredEvents)
}

/* Lyssnare på #filter-container efter dess input*/
const inputField = document.querySelector('#filter-container')
input.addEventListener('input', (user) => {
    /* Hämtar inmatningen från inputfältet */
    const userInput = user.target.value;
    /* Anropar filterEvents och matar in användarens inmatning */
    filterEvents(userInput)
})


/* Upplever att sidan blinkar till om man klickar mellan länkarna/sidorna. Testade att lägga de innan för denna lyssnaren för att se om den blev bättre av att vänta till Document är färdigladdat. Men tycker det är samma problem. */
document.addEventListener('DOMContentLoaded', () => {
    /* kollar med en if-sats om localStorage är aktivt och sparat darkmode */
    if (localStorage.getItem('darkmode') === 'active') {
        document.body.classList.add('darkmode')
    }

    // Hämtar in knappen
    const themeSwitch = document.querySelector('#theme-switch')

    // function som adderar en class som heter darkmode. Egenskaperna finns i CSS-filen
    // localStorage sparar darkmode och är aktiv nästa gång sidan laddas in
    const enableDarkmode = () => {
        document.body.classList.add('darkmode')
        localStorage.setItem('darkmode', 'active')
    }

    //"Tar bort" darkmode-classen och aktiverar default-utseendet.
    const disableDarkmode = () => {
        document.body.classList.remove('darkmode')
        localStorage.removeItem('darkmode')
    }

    //Lyssnar-function som är kopplad till knappen "#theme-switch" i HTML-filen
    //Lyssnar efter click, if-sats som går genom alternativen för funktionen.
    themeSwitch.addEventListener('click', () => {
        darkmode = localStorage.getItem('darkmode')
        if (darkmode !== "active") {
            enableDarkmode()
        }
        else {
            disableDarkmode()
        }
    })
})

//toggle för style på class nav-links -
function toggleHamburgerMenu() {
    const navLinks = document.querySelector('.nav-links')
    navLinks.classList.toggle('active')
}

/* Validated 13/11-24 with jsvalidator.com */
