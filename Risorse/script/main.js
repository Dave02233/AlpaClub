let sideNavClosedByUser = false;

let map = document.getElementById("mappa");
let mapButton = document.getElementById("showMap");

//Toggle visualizzazione della mappa
function reverseMapDisplay() {

    if (map.classList.contains("hidden") || !map.classList.contains("visible")) {
        
        map.classList.add("visible");
        map.classList.remove("hidden");
        //console.log(map.classList);

        mapButton.innerHTML = "-";

        setTimeout(() => map.scrollIntoView({ behavior: "smooth" }), 400); // Animazione conclusa a 500ms

    } else {
        map.classList.remove("visible");
        map.classList.add("hidden");
        mapButton.innerHTML = "+";
    }
}

mapButton.addEventListener("click", reverseMapDisplay);

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
        //console.log("Andiamo giù");
        allSelected.forEach(element => {
            element.style.backgroundColor = "beige";
            element.style.color = "chocolate";
        });

    }else if(actualScroll < lastScroll) {
        //console.log("Andiamo su");
        allSelected.forEach(element => {
            element.style.backgroundColor = "chocolate";
            element.style.color = "beige";
        });

    }else{
        //console.log("Fermi");

        setTimeout(() => {
            allSelected.forEach(element => {
                element.style.removeProperty("background-color");
                element.style.removeProperty("color");
            }, 500);
        });
        
    }
}, 500);
setInterval(() => lastScroll = window.scrollY, 750);

window.addEventListener("scroll", toggleSideNav);


//Secret word access
const secretHash = "024c01119a5bf8be6b755b2a2c0648ad73a06482c182ca51ce84549bb17d9773";

let actWord = [];

//Conversione input in SHA-256 
async function hashInput(input) {
    const encoder = new TextEncoder(); //Creazione istanza, serve per convertire una stringa in un array di byte
    const data = encoder.encode(input); //Conversione string => array di bye
    const hashBuffer = await crypto.subtle.digest("SHA-256", data); //API per calcolo hash SHA-256 (rappresentazione binaria dell'hash?), asincrona con promise
    //console.log(hashBuffer);
    return Array.from(new Uint8Array(hashBuffer)) //Conversione del buffer in un array di byte
        .map(b => b.toString(16).padStart(2, "0")) //Converte ogni byte in una stringa hex, padstart per mettere uno 0 davanti nel caso lunghezza < 2
        .join("");
}

let FrameUbungu = document.createElement("iframe");
FrameUbungu.src ="https://embed.polymarket.com/market.html?market=will-fridolin-ambongo-besungu-be-the-next-pope&features=volume&theme=dark";
FrameUbungu.width="45%";
FrameUbungu.height="250px";
FrameUbungu.style.zIndex = "10"
FrameUbungu.border="none";
FrameUbungu.style.display = "inline";
FrameUbungu.style.margin = 0;
FrameUbungu.style.padding = 0;
FrameUbungu.style.alignContent = "center";
 
let FrameParolin = document.createElement("iframe");
FrameParolin.src = "https://embed.polymarket.com/market.html?market=will-pietro-parolin-be-the-next-pope&features=volume&theme=dark"
FrameParolin.width="45%";
FrameParolin.height="250px";
FrameParolin.style.zIndex = "10"
FrameParolin.border="none";
FrameParolin.style.display = "inline";
FrameParolin.style.margin = 0;
FrameParolin.style.padding = 0;
FrameParolin.style.alignContent = "center";


document.addEventListener("keydown", async (event) => {
    if (event.key === ' ' || event.key === 'Delete') {
        actWord = [];
    } else if (event.key === 'Backspace') {
        actWord.pop();
    } else if (event.key === 'Enter') {
        const userInput = actWord.join('');
        const userHash = await hashInput(userInput);
        console.log(userHash);
        if (userHash === secretHash) {
            alert("Benvenuto nel mondo dei miracoli evangelici!");
            actWord = [];
            document.querySelector("#navBar").appendChild(FrameUbungu);
            document.querySelector("#navBar").appendChild(FrameParolin);
        } else {
            window.alert("Codice errato!");
        }
    } else {
        if (event.key !== 'Shift') {
            actWord.push(event.key);
        }
    }
    //console.log(actWord.join(''));
});

/*
let submitErrorMessage = document.createElement("p");
submitErrorMessage.innerHTML = 'Non so ancora inviare mail di feedback, per il momento tieniti la tua opinione per te!';
submitErrorMessage.style.height = "1.5rem";
submitErrorMessage.style.fontSize = "0.8rem";
submitErrorMessage.style.color = "beige";

document.getElementById("submitFeedback").addEventListener("click", () => document.querySelector("form").appendChild(submitErrorMessage));
*/


//Invio mail con mail js
document.getElementById('form').addEventListener('submit', function(event) {

    event.preventDefault(); //Impedisce il comportamento predefinito di un evento, in questo caso evita ricariacamento della pagina

    //console.log(this);
    
    emailjs.sendForm("service_dave_mailing", "template_avoe4p6", this, 'gg3F8WtBNKqr9Bobg')
    
        .then(() => { 
            alert('Inviato!'); //Promise di sendForm risolta con successo
        }, (err) => {
            alert(JSON.stringify(err)); //Errore nell'invio del form, conversione in stringa JSON per essere mostrato nell'alert
        });
    
    
    document.getElementById('formContainer').style.display = 'none';
});