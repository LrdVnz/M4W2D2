/* Mostrare pagina univoca dell'artista tramite query.

 Asin di esempio : 1940026091
*/

if(window.location.search) {
    let params = new URLSearchParams(window.location.search);
    let queryValue = params.get('q');
  
    fetch(`https://striveschool-api.herokuapp.com/books/${queryValue}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
      });
  }
  