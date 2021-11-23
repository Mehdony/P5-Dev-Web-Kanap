//  Permet recuperer les données de l'url de la page (www.google:// id=qslr357446szerteqe  name=qdrmogiphuj   color=qsdrpiugh) 
// const chainedecaractere = surlapage.lachainederequetedanslurl.recherche
const queryString = window.location.search
console.log(queryString)

// permet d'analyser les paramètres de  la chaîne de requête (parametre dans la console)
const urlParams = new URLSearchParams(queryString)
console.log(urlParams)

//permet d'obtenir l'id (id de la page (url))
const id = urlParams.get('id')
console.log(id)

// on fait une requete pour obetenir un produit avec un ID
// On rajoute ${id} pour afficher les id 
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

  // DESCRIPTION

  let description = document.getElementById('description')
  description.innerText = product.description

  // OPTIONS
  let selection = document.getElementById('colors')
  let options = `<option value="">--SVP, choisissez une couleur --</option>`
  
  // On fait une boucle et on crée une variable (option) de l'API (product) et on veut les couleurs dispo (.colors)
  for (let option of product.colors){
    //on ajoute a options le resultat de la fonction (plus bas)
    options += displayOptions(option)
    // on integre options à notre container "selection" (variable plus haut)
    selection.innerHTML = options
  }
})


// on crée une fonction qui permet de retourner du code html dynamique
function displayImg(product) {
    return `<img src=${product.imageUrl} alt="Photographie d'un canapé"></img>`
}
function displayOptions(product) {
    return ` <option value="${product}">${product}</option>`
}

//  On crée une variable qu'on relis à l'id de l'input de la page product html
let inputValue = document.getElementById('quantity')

// On ecoute l' event de la balise input graçe à la methode d'evenement ('input') 
// qui permet d'écouter la saisie de l'utilisateur
// Puis on crée une variable (quantite) qui correspond à la valeur demandé de l'utilisateur (event.input.value)
//  ex: (1 piece, 3 pieces, 10 pieces ...)
inputValue.addEventListener('input', function(event) {
  let quantite = event.target.value; 
  // localStorage.setItem('prout', quantite)
});

