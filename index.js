const apiUrl = 'https://polisen.se/api/events'

async function fetchApi() {
    try {
        const response = await fetch(apiUrl)
        if (!response.ok) {
            throw new Error(`HTTP-fel! Status: ${response.status}`)
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetchen misslyckades.')
        displayError('Kunde inte hämta data, försök igen senare.')
    }
}

function filterByLocation(events, location) {
    return events.filter(event => event.location && event.location.name).toLowerCase().includes(location.toLowerCase())
}

function displayEvents(events) {
    const eventList = document.querySelector('#event-list')
    eventList.innerHTML = '';

    const sortedEvents = events.sort((a, b) => new Date(b.datetime) - new Date(a.datetime));
    const latestEvents = sortedEvents.slice(0, 21)

    latestEvents.forEach(event => {
        const listItem = document.createElement('li')
        listItem.textContent = `${event.name}, ${event.summary}`;
        eventList.appendChild(listItem)
    });
}

function displayError(message) {
    const eventList = document.querySelector('#event-list')
    eventList.innerHTML = `<li class="error">${message}</li>`
}

document.querySelector('#filter-container').addEventListener('input', function (event) {

})

async function showData() {
    const events = await fetchApi()
    displayEvents(events)
}

showData();




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
