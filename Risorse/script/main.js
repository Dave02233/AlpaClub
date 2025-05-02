let map = document.getElementById("mappa");
let button = document.getElementById("showMap");

function reverseMapDisplay() {
    if (map.classList.contains("hidden") || !map.classList.contains("visible")) {
        
        map.classList.add("visible");
        map.classList.remove("hidden");
        console.log(map.classList);

        button.innerHTML = "-";

        setTimeout(() => map.scrollIntoView({ behavior: "smooth" }), 400); // Animazione conclusa a 500ms

    } else {
        map.classList.remove("visible");
        map.classList.add("hidden");
        button.innerHTML = "+";
    }
}



button.addEventListener("click", reverseMapDisplay);
