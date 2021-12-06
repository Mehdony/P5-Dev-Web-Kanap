//  Permet recuperer les données de l'url de la page (www.google:// id=qslr357446szerteqe  name=qdrmogiphuj   color=qsdrpiugh) 
// const chainederequete = surlapage.lachainederequetedanslurl.recherche
const queryString = window.location.search
console.log(queryString)

// permet d'analyser les paramètres de  la chaîne de requête (parametre dans la console)
const urlParams = new URLSearchParams(queryString)
console.log(urlParams)

//permet d'obtenir l'id (id de la page (url))
const id = urlParams.get('id')
console.log(id)


// let products = []


// on fait une requete pour obetenir un produit avec un ID
// On rajoute ${id} pour afficher les id 
fetch(`http://localhost:3000/api/products/${id}`)
.then(response  => response.json())
// on utilise la réponse pour afficher image, titre etc
.then(product => {

  // L'IMAGE
  // On récupère le container de l'image et on le stock dans imageContainer
 
  // On crée une variable articleImg dans laquelle on stockera l'image
  let articleImg =''
  // on stock le resultat de la fonction displayImage (l'image produit) dans articleImg
  articleImg += displayImg(product) 
  // on integre articleImg à imageContainer grace à innerHTML
  
  document.querySelector('.item__img').innerHTML = articleImg

  // LE TITRE
  // On récupère la balise title et on y integre du text ( product.name soit le nom du produit dans l'api)
  document.getElementById('title').innerText = product.name
  
  // LE PRIX
  // On récupère la balise price et on y integre du text ( product.price soit le prix du produit dans l'api)
  document.getElementById('price').innerText = product.price

  // DESCRIPTION

  document.getElementById('description').innerText = product.description

  // OPTIONS

  let options = `<option value="">--SVP, choisissez une couleur --</option>`
  
  // On fait une boucle et on crée une variable (option) de l'API (product) et on veut les couleurs dispo (.colors)
  for (let option of product.colors){
    //on ajoute a options le resultat de la fonction (plus bas)
    options += displayOptions(option)
    // on integre options à notre container "selection" (variable plus haut)
  }
  
 document.getElementById('colors').innerHTML = options
  

  // selection.addEventListener('input', function(event) {
  //   let selectValue = event.target.value; 
  //   console.log(selectValue);
  // });

  // //  On crée une variable qu'on relis à l'id de l'input de la page product html
  //   let inputValue = document.getElementById('quantity')  


  //   inputValue.addEventListener('input', function(event) {
  //   let quantity = event.target.value; 
  //   console.log(quantity);
   
  // });

  //récupération du bouton ajouter au panier
  let cartBtn = document.getElementById('addToCart')
  // au click sur le bouton envoie l'objet dans le tableau panier puis envoie le panier dans le local storage 
 cartBtn.addEventListener('click' , (event) => {
//comment récupérer les valeurs de colors et quantity dans l'objetPAnier?
  event.preventDefault()
  // tentative de récupération de la valeur de colors et quantity 
  let optionItem = document.getElementById('colors').value
  let quantityItem = document.getElementById('quantity').value 

  // création de l'objet à envoyer dans le tableau cart 
  let objetPanier = {
    id : id,
    quantity : quantityItem, 
    option : optionItem  
 }
 
    //quantity et option ne renvoient rien  lors du consolelog de obetPanier
    console.log(objetPanier);
 
 
 const cart = JSON.parse(localStorage.getItem('cart')) || []
 const founded = cart.find(e => e.id === product.id)
 const quantity = document.getElementById('quantity').value

 if (founded) {
   founded.quantity += quantity
 }else {
   product.quantity = quantity
   cart.push(objetPanier)
 }
 localStorage.setItem('cart' , JSON.stringify(cart))
 })
  
})




// on crée une fonction qui permet de retourner du code html dynamique
function displayImg(product) {
    return `<img src=${product.imageUrl} alt="Photographie d'un canapé"></img>`
}
function displayOptions(product) {
    return ` <option value="${product}">${product}</option>`
}















//  Test LocalStorage


// const id = urlParams.get('id')
// localStorage.setItem('id', id)



// let products = [id , quantite]
//   console.log(products);
//   localStorage.setItem('quantitéetid' , products)




