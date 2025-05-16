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

try {
    mapButton.addEventListener("click", reverseMapDisplay);
} catch (error) {
    ;
}

//Riduzione di height dell header e aggiunta del pulsante sidebar
let headerSmallStatus = false;

function showSideInHead() { 
    
    let header = document.querySelector('header');
    let nextItemTopCoord = document.querySelector("#navBar").getBoundingClientRect().bottom;
    let sideBarButton = document.querySelector("#sideBarButton");

    if(nextItemTopCoord <= 0 && !headerSmallStatus) {
        headerSmallStatus = true;
    }

    if(nextItemTopCoord > 0) {
        headerSmallStatus = false;
    }

    if(headerSmallStatus) {
        header.classList.add("small");
        sideBarButton.style.display = ''; 
        initHeaders();
    }else{
        header.classList.remove("small");
        sideBarButton.style.display = 'none';
        removeSideNav();
        initHeaders();
    }
    
}

//Toggle del side nav in base allo scroll nella pagina
function toggleSideNav() {

    let articleHeaders = document.querySelectorAll('h2');
    //console.log(articleHeaders);
    let mainTitle = document.querySelector('#mainTitle');
    let sideNav = document.querySelector(".side-nav");
    
    if (sideNav.classList.contains("hidden")) {
        sideNav.classList.add("visible");
        sideNav.classList.remove("hidden");
        mainTitle.classList.add("aside");
        //articleHeaders.forEach(element => element.classList.remove("aside"));
        articleHeaders.forEach(element => element.style.textAlign = 'right');
    }else if (sideNav.classList.contains("visible")) {
        console.log('qui')
        sideNav.classList.add("hidden");
        sideNav.classList.remove("visible");
        mainTitle.classList.remove("aside");
        articleHeaders.forEach(element => element.style.textAlign = '');
    }
    
}

//Rimuove la barra laterale, con pulsante di chiusura o gli altri presenti
function removeSideNav() {
    let sideNav = document.querySelector(".side-nav");
    let mainTitle = document.querySelector('#mainTitle');
    let articleHeaders = document.querySelectorAll('h2');

    sideNav.classList.add("hidden");
    sideNav.classList.remove("visible");
    mainTitle.classList.remove("aside");
    articleHeaders.forEach(element => element.style.textAlign = ''); 
    
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

window.addEventListener("scroll",  showSideInHead); //toggleSideNav


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
try{
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
} catch (error) {
    ;
}

function initHeaders() {
    let headers = document.querySelectorAll("h2");
    let titleBottom = document.querySelector("header").getBoundingClientRect().height;

    //console.log(titleBottom);
    headers.forEach(element => {
        element.style.top = titleBottom.toString() + "px"; //Due ore a capire che doveva essere una stringa 
        //console.log(element.style.top);
    })
}

initHeaders();



//Auto Grid Cards

function modifyObjProperties (item = document.querySelectorAll('p'), propertyName = "backgroundColor, color", value = "black, white") {
    const properties = propertyName.split(", ");
    const values = value.split(", ");
    const indexNameComma = propertyName.indexOf(",") !== -1;
    const indexValueComma = value.indexOf(",") !== -1;
    const commaError = (indexNameComma && !indexValueComma)||(!indexNameComma && indexValueComma)||(!indexNameComma && !indexValueComma);
    const lengthMatch = properties.length === values.length;

    //console.log(properties.length, values.length);
    //console.log(commaError, indexNameComma, indexValueComma);

    if(!commaError){ //Numero di proprietà e valori uguale

        if(properties.length === 1 && values.length === 1){ //Singola proprietà e valore

            item.style[propertyName] = value;

        }else if(properties.length !== 1 && values.length !== 1 && lengthMatch){ //Più proprietà e più valori, numero uguale

            if(item.length !== undefined) { //Singolo oggetto
                for(let c = 0; c < properties.length; c++) {
                    item.forEach(element => element.style[properties[c]] = values[c]);
                }
            }else{ //Più oggetti
                for(let d = 0; d < properties.length; d++) {
                    item.style[properties[d]] = values[d];
                }
            }
        }
    }else{ //Numero di proprietà e valori discordante
        if(indexNameComma && !indexValueComma){ //Più proprietà, un solo valore
            for (let i = 0; i < item.length; i++) {
                for (let c = 0; c < properties.length; c++) {
                    item[i].style[properties[c]] = value; 
                }
            }
        }else if(!indexNameComma && !indexValueComma) { //Una proprietà, un solo valore
            if(item.length === undefined) { //Singolo oggetto
                item.style[propertyName] = value;
            }else{ //Più oggetti
                item.forEach(element => element.style[propertyName] = value);
            }
        }
    }
}

//Esempio dell'utlizzo della funzione modifyObjProperties
//modifyObjProperties(document.querySelector('h2'), "backgroundColor, color, fontSize", "black, white, 17px");
//modifyObjProperties(document.querySelectorAll('h2'), "backgroundColor, fontSize", "black, 17px");
//modifyObjProperties(document.querySelector('h2'), "backgroundColor", "black");
//modifyObjProperties(document.querySelector('h2'), "backgroundColor, color, fontSize", "black, white, 45px");
//modifyObjProperties(document.querySelectorAll('h2'), "backgroundColor", "black");


const checkoutData = [];

function saveCheckoutData() {
    localStorage.setItem('checkoutData', JSON.stringify(checkoutData));
}

const GridForm = document.querySelector(".variableGrid");
const FirstGridItem = document.querySelector(".gridItem");

try {
    document.querySelector("#gridForm").addEventListener('submit', form => {
        form.preventDefault();

        const formData = new FormData(form.target); //new crea un istanza di un oggetto collegato ad un costruttore, è una funzione (o una classe) progettata per creare oggetti
        const itemTitle = formData.get("itemTitle");
        const itemText = formData.get("itemText");
        const giftValue = formData.get("importo");
        const image = formData.get("image");

        //console.log(formData);

        let child = document.createElement('form');
        child.innerHTML = `        
                <input class="itemTitle" value="${itemTitle}" readonly>
                <textarea class="itemText" readonly>${itemText}\n${itemTitle} presenta questa gift all'Alpa Club per ottenere ${giftValue}€ di sconto sulla tua prossima avventura!</textarea>
                `
        child.querySelectorAll("input, textarea").forEach(element => {
            modifyObjProperties(element, "backgroundColor, color, border, backdropFilter", "chocolate, white, none, blur(5px)");
            element.style.backgroundColor="rgba(210, 105, 30, 0.6)"; //Per qualche motivo non riesco a scrivere un rgba nella mia funzione
        });

        child.classList.add('gridItem');
        switch(image) {
            case "AlpaLand":
                child.style.backgroundImage = "url(./Risorse/images/AlpaLand.jpg)"
                break;
            case "Mountains":
                child.style.backgroundImage = "url(./Risorse/images/Mountains.jpg)"
                break;
            case "Park":
                child.style.backgroundImage = "url(./Risorse/images/Park.jpg)"
                break;
        }
        child.style.backgroundSize = "cover";
        child.style.backgroundColor = "brown";

        GridForm.append(child);

        checkoutData.push(giftValue);
        saveCheckoutData(); // Salva ogni volta che aggiungi

        console.log(checkoutData);

        FirstGridItem.querySelectorAll("#itemTitle, #itemText").forEach(element => element.value ='');
        
    }); 
} catch (error) {
    ;
}

setInterval(() => {
    try {
        if(document.querySelector(".variableGrid").childElementCount > 1) {
            document.querySelector("#checkOutButton").disabled = false;
        }  
    } catch (error) {
        ;
    }
}, 2000)

window.toggleSideNav = toggleSideNav;
window.removeSideNav = removeSideNav;