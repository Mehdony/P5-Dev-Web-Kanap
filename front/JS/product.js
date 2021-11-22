// permet de stocker l'url qui suit product.html soit ?id=0651616
const queryString = window.location.search
console.log(queryString)

// permet d'analyser les paramètres de  la chaîne de requête
const urlParams = new URLSearchParams(queryString)
console.log(urlParams)

//permet d'obtenir l'id
const id = urlParams.get('id')
console.log(id)

// on fait une requete pour obetenir un produit avec un ID
// On rajoute ${id} pour affficher les id 
fetch(`http://localhost:3000/api/products/${id}`)
.then(response  => response.json())
// on utilise la réponse pour afficher image, titre etc
.then(product => {

  // L'IMAGE
  // On récupère le container de l'image et on le stock dans imageContainer
  let imageContainer = document.querySelector('.item__img')
  // On crée une variable articleImg dans laquelle on stockera l'image
  let articleImg =''
  // on stock le resultat de la fonction displayImage (l'image produit) dans articleImg
  articleImg += displayImg(product) 
  // on integre articleImg à imageContainer grace à innerHTML
  imageContainer.innerHTML = articleImg

  // LE TITRE
  // On récupère la balise title et on y integre du text ( product.name soit le nom du produit dans l'api)
  let title = document.getElementById('title')
  title.innerText = product.name
  
  // LE PRIX
  // On récupère la balise price et on y integre du text ( product.price soit le prix du produit dans l'api)
  let price = document.getElementById('price')
  price.innerText = product.price

})

// on crée une fonction qui permet de retourner du code html dynamique
function displayImg(product) {
    return `<img src=${product.imageUrl} alt="Photographie d'un canapé"></img>`
}

