// on va récupérer dans le dom le container 'items' afin de par la suite lui integrer du contenu 
const items = document.querySelector("#items")

//  On fait un appel à l'API grâce a 'fetch' et ("l'url de l'API") 
fetch("http://localhost:3000/api/products")
  // ensuite on prend la réponse et on la converti au format Json
  .then(response => response.json())
  // ensuite on prend la réponse et on effectue les actions désirées 
  .then(response => {
    // on crée une variable article vide qui contiendra les produits à afficher
    let articles = ""
    // parcour chacun des produits de la réponse (qui contient les objets de l'api)
    for (let product of response) {
      //on ajoute a article le resultat de la fonction
      articles += displayProducts(product)
    }
    // on integre article à notre container "items"
    items.innerHTML = articles
  })

// on crée une fonction qui permet d'afficher des produits
function displayProducts(product) {
  // la fonction retrounera du code html de manière dynamique
  return `<a href="./product.html?id=${product._id}">
    <article>
      <img src="${product.imageUrl}" alt="${product.altTxt}">
      <h3 class="productName">${product.name}</h3>
      <p class="productDescription">${product.description}</p>
      <p class="productPrice">${product.price + " €"}</p>
    </article>
  </a>`
}

