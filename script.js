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
let cartTotal = document.getElementById("cart-total");
let totalPrice = 0;

let cartList = {
  /* Structure 
    book_title : {
        title : book title,
        price : book price, 
    }
    */
};

fetch(`https://striveschool-api.herokuapp.com/books`)
  .then((response) => response.json())
  .then((data) => {
    bookData = data;
    bookList.innerHTML = "";
    createResults(data);
  });

/* Controllo se l'utente ha inserito dell'input */
let createResults = (data = bookData) => {
  bookList.innerHTML = "";

  data.forEach((element, i) => {
    createCard(element, i);
  });
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
      <p class="card-text category">${element.category}</p>
      <p class="card-text price">€ ${element.price}</p>
      <a class="card-text asin" href="details.html?q=${element.asin}">dettagli</a>
    </div>
    <div class="card-body">
      <button class="btn btn-primary m-1" onclick='addToCart(this)'>Add to cart</a>
      <button class="btn btn-primary m-1" onclick='hideCard(this)'>Hide</a>
    </div>
    </div>
    </div>
     `;
};

let filterData = (searchValue) => {
  let dataResult = bookData.filter((element) => {
    if (element.title.toLowerCase().includes(searchValue.toLowerCase())) {
      return element;
    }
  });
  createResults(dataResult);
};/[^\d.,]/g

searchBtn.addEventListener("click", (event) => {
  filterData(searchInput.value);
});

searchInput.addEventListener("input", (event) => {
  if (searchInput.value.length < 3) {
    createResults();
    return;
  }
  bookList.innerHTML = "";
  filterData(searchInput.value);
});

/* Pulsante hide: 
  Nascondi il libro dai risultati. */

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
  book_price = card.childNodes[5].childNodes[3].innerText;
  // Per mostrare che è stata aggiunta al carrello:
  card.classList.add("border", "border-2", "border-success");
  // Reset del carrello
  cartUl.innerHTML = "";
  //  Aggiunta all'oggetto carrello.
  cartList[`${book_title}`] = {
    title: book_title,
    price: book_price,
  };
  showCart();
};

let hideCard = (this_obj) => {
  let card_column = this_obj.parentNode.parentNode.parentNode;

  card_column.remove();
};

/* Per mostrare gli elementi nel cart. 
       - Ciclare nel cart e creare dei li da aggiungere a ul cart
       - La funzione partirà quando viene cliccato il link del carrello
       - Extra : far partire la funzione quando si scrolla fino al carrello. 
    */

let showCart = () => {
  Object.keys(cartList).forEach((key) => {
    innerContent = cartUl.innerHTML;
    if (innerContent.includes(cartList[key].title)) {
      return;
    }
    convertedPrice = parseFloat(cartList[key].price.replace(/[^\d.,]/g, ''), 10);
    totalPrice += convertedPrice;
    cartUl.innerHTML += `
          <li> 
              <span> ${cartList[key].title} </span>
              <span> ${cartList[key].price} </span>
              <i class="fa-solid fa-rectangle-xmark" onclick="removeFromCart(this)"></i>
          </li> 
       `;
  });

  cartTotal.innerText = ` ${totalPrice} `;
};

let removeFromCart = (this_obj) => {
  let outerElement = this_obj.parentNode;
  outerElement.remove();
};

let clearCart = () => {
  cartUl.innerHTML = "";
  cartTotal.innerHTML = "";
  cartList = {};
};


/* Create book details 
- Creare pagina di dettaglio del libro :
  - Libro centrato. 
  - Titolo sopra al libro. 
  - genere sotto. 
  - prezzo sotto.

*/
