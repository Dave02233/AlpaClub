const checkoutData = JSON.parse(sessionStorage.getItem('checkoutData') || '[]');

//console.log('Dati checkout:', checkoutData);

// Funzione per raggruppare e contare le gift card per valore
function getGiftSummary(data) {
    const summary = {};
    data.forEach(val => {
        if (!summary[val]) {
            summary[val] = 0;
        }
        summary[val]++;
    });
    //console.log(summary);
    return summary;
}

function renderCheckoutTable() {
    const summary = getGiftSummary(checkoutData);
    const tbody = document.querySelector('#cartDetails tbody');
    const tfoot = document.querySelector('#cartDetails tfoot tr td');
    tbody.innerHTML = '';
    let total = 0;

    Object.keys(summary).sort((a, b) => b - a).forEach(val => {
        const qty = summary[val];
        const price = parseInt(val); // Conversione String a Intero
        const final = qty * price;
        total += final;
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="leftAlign">Gift Card ${price}€</td>
            <td>${qty}</td>
            <td>${price}€</td>
            <td>${final}€</td>
        `;
        tbody.appendChild(tr);
    });
    
    tfoot.colSpan = 4;
    tfoot.style.textAlign = 'right';
    tfoot.textContent = `Totale: ${total}€`;
    
}

renderCheckoutTable();

