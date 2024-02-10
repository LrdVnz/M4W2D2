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

searchBtn.addEventListener("click", (event) => {
  let searchValue = searchInput.value;
  loadBooks(searchValue);
});

let loadBooks = (searchValue) => {
  if (searchValue == undefined) {
    fetch(`https://striveschool-api.herokuapp.com/books`)
      .then((response) => response.json())
      .then((data) => {
        bookList.innerHTML = "";
        data.forEach((element, i) => {
          createCard(element, i);
        });
      });
  } else {
    /* Codice per la query. Come devo richiamare la ricerca ??? */
/* 
      fetch(`https://striveschool-api.herokuapp.com/books/search=${searchValue}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      }); */
  }
};

let createCard = (element, i) => {
  bookList.innerHTML += ` 
    <div class='col-6 col-md-3'> 
     <div class="card overflow-hidden" id="card-original">
      <img src="${element.img}" class="card-img-top" alt="${element.title}">
      <div class="card-body">
          <p class="card-text"> ${element.title} </p>
      </div>
    <div class="card-body d-flex justify-content-between py-1">
      <p class="card-text ">${element.category}</a>
      <p class="card-text ">€ ${element.price}</a>
    </div>
     </div>
    </div>
     `;
};

loadBooks();
