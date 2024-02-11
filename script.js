/* 
 1. Funzione di ricerca dall'input sulla pagina html.
    - Restituisce i libri sotto forma di cards. 
      - Ogni card ha il tasto per aggiungere al carrello.
      - 'aggiungi al carrello' aggiunge all'oggetto carrello

 2. Funzione di carrello.
    - Mostra la lista dei libri selezionati, prendendo dall'oggetto carrello. 
    - Implementa un tasto per cancellare. 
    - Calcola dinamicamente il prezzo totale ( se c'è nell'api. )

Usa forEach, map, filter 

API link : 
https://striveschool-api.herokuapp.com/books
*/

let searchInput = document.getElementById("book-search");
let searchBtn = document.getElementById("search-btn");
let bookList = document.getElementById("book-list");
let cartBtn = document.getElementById("cart-btn");
let cartUl = document.getElementById("cart-ul");
let bookData = undefined;

let cartList = {
  /* Structure 
    book_title : {
        title : book title,
        price : book price, 
    }
    */
};

searchBtn.addEventListener("click", (event) => {
  let searchValue = searchInput.value;
  loadBooks(searchValue);
});

let loadBooks = (searchValue) => {
  fetch(`https://striveschool-api.herokuapp.com/books`)
    .then((response) => response.json())
    .then((data) => {
      bookData = data;
      bookList.innerHTML = "";
      controlSearch(data, searchValue);
    });
};

/* Controllo se l'utente ha inserito dell'input */
let controlSearch = (data, searchValue) => {
  if (searchValue === undefined) {
    data.forEach((element, i) => {
      createCard(element, i);
    });
  } else {
    /*  Usa search value per controllare dentro l'array
        Usa filter 
    */
  }
};

/* Crea ogni card */
let createCard = (element, i) => {
  bookList.innerHTML += ` 
    <div class='col-6 col-md-3'> 
     <div class="card overflow-hidden" id="card-original">
      <img src="${element.img}" class="card-img-top" alt="${element.title}">
      <div class="card-body">
          <p class="card-text title"> ${element.title} </p>
      </div>
    <div class="card-body d-flex justify-content-between py-1">
      <p class="card-text category">${element.category}</a>
      <p class="card-text price">€ ${element.price}</a>
    </div>
    <div class="card-body">
      <a href="#" class="btn btn-primary" onclick='addToCart(this)'>Add to cart</a>
    </div>
     </div>
    </div>
     `;
};

/* Aggiungi al carrello: 
  1. Al click del bottone aggiungi il libro corrente all'oggetto carrello.
  2. Il carrello deve avere un testo che mostra sempre la somma totale del prezzo. 
  3. Quindi prendi il titolo del libro, e il prezzo. Saranno la sua voce nel carrello. 
*/

let addToCart = (this_obj) => {
  // Dal bottone, vado a prendere la card che lo contiene, come nodo.
  let card = this_obj.parentNode.parentNode;
  // Percorso per titolo : card.childNodes[3].childNodes[1].innerText
  // Percorso per prezzo : card.childNodes[5].childNodes[2].innerText
  book_title = card.childNodes[3].childNodes[1].innerText;
  book_price = card.childNodes[5].childNodes[2].innerText;
  // Per mostrare che è stata aggiunta al carrello:
  card.classList.add("border", "border-2", "border-success");
  // Reset del carrello
  cartUl.innerHtml = "";
  //  Aggiunta all'oggetto carrello.
  cartList[`${book_title}`] = {
    title: book_title,
    price: book_price,
  };
};

/* Per mostrare gli elementi nel cart. 
     - Ciclare nel cart e creare dei li da aggiungere a ul cart
     - La funzione partirà quando viene cliccato il link del carrello
     - Extra : far partire la funzione quando si scrolla fino al carrello. 
  */

let showCart = () => {
  Object.keys(cartList).forEach((key) => {
    cartUl.innerHTML += `
          <li> 
              <span> ${cartList[key].title} </span>
              <span> ${cartList[key].price} </span>
          </li> 
       `;
  });
};

/* Carica i libri a prescindere che l'utente abbia cercato qualcosa. */
loadBooks();

/*  Funzione di ricerca. 
     -Usa il keydown event listener sull'input. 
     -Controlla se l'input è più lungo di tre caratteri. 
        - Se si, filtra i risultati dell'array data. 
    - Problema : 
     - Quando vengono ricaricati i libri, si perde il border che segnala che sono stati aggiunti al carrello. 
*/

searchInput.addEventListener("input", (event) => {
  if (searchInput.value.length < 3) {
    loadBooks();
    return;
  }

  bookList.innerHTML = "";

  let dataResult = bookData.filter((element, index) => {
    if (element.title.toLowerCase().includes(searchInput.value.toLowerCase())) {
      createCard(element, index);
    }
    return element;
  });
});

/* 
 - Da fare :
   - Mostrare carrello senza che venga schiacciato 'carrello'  
   - Cancellare i libri dal carrello. 
   - Somma il costo del carrello. 
   - Pulsante per svuotare carrello. 
   - Stile migliore. 

*/