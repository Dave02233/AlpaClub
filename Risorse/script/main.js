let sideNavClosedByUser = false;

let map = document.getElementById("mappa");
let mapButton = document.getElementById("showMap");

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

function removeSideNav() {
    let sideNav = document.querySelector(".side-nav");

    sideNav.classList.add("hidden");
    sideNav.classList.remove("visible");
    
    sideNavClosedByUser = true;
}


mapButton.addEventListener("click", reverseMapDisplay);

window.addEventListener("scroll", toggleSideNav);