let sideNavClosedByUser = false;

let map = document.getElementById("mappa");
let mapButton = document.getElementById("showMap");

//Toggle visualizzazione della mappa
function reverseMapDisplay() {

    if (map.classList.contains("hidden") || !map.classList.contains("visible")) {
        
        map.classList.add("visible");
        map.classList.remove("hidden");
        console.log(map.classList);

        mapButton.innerHTML = "-";

        setTimeout(() => map.scrollIntoView({ behavior: "smooth" }), 400); // Animazione conclusa a 500ms

    } else {
        map.classList.remove("visible");
        map.classList.add("hidden");
        mapButton.innerHTML = "+";
    }
}

//Toggle del side nav in base allo scroll nella pagina

function toggleSideNav() {
    
    let scrollPercent = (window.scrollY / document.documentElement.scrollHeight) * 100;

    let sideNav = document.querySelector(".side-nav");
    
    if (scrollPercent >= 3 && !sideNavClosedByUser) {
        if (sideNav.classList.contains("hidden")) {
            sideNav.classList.add("visible");
            sideNav.classList.remove("hidden");
        }
    } else {
        if (sideNav.classList.contains("visible")) {
            sideNav.classList.add("hidden");
            sideNav.classList.remove("visible");
        }
    }

    if(scrollPercent < 3) {
        sideNavClosedByUser = false;
    }   
    
}

//Rimuove la barra laterale, con pulsante di chiusura o gli altri presenti
function removeSideNav() {
    let sideNav = document.querySelector(".side-nav");

    sideNav.classList.add("hidden");
    sideNav.classList.remove("visible");
    
    sideNavClosedByUser = true;
}

//Check salita o discesa nella pagina 
let actualScroll = 0;
let lastScroll = 0; 
let allImages = document.querySelectorAll("img, video");
let allSelected = document.querySelectorAll("p, main, section");

setInterval(() => {
    actualScroll = window.scrollY;

    if(actualScroll > lastScroll) {
        console.log("Andiamo giù");
        allSelected.forEach(element => {
            element.style.backgroundColor = "beige";
            element.style.color = "chocolate";
        });

    }else if(actualScroll < lastScroll) {
        console.log("Andiamo su");
        allSelected.forEach(element => {
            element.style.backgroundColor = "chocolate";
            element.style.color = "beige";
        });

    }else{
        console.log("Fermi");

        setTimeout(() => {
            allSelected.forEach(element => {
                element.style.removeProperty("background-color");
                element.style.removeProperty("color");
                //element.style.backgroundColor = "inherit";
                //element.style.color = "inherit";
            }, 500);
        });
        
    }
}, 500);
setInterval(() => lastScroll = window.scrollY, 750);


mapButton.addEventListener("click", reverseMapDisplay);

window.addEventListener("scroll", toggleSideNav);