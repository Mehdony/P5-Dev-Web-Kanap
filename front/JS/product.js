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



// on fait une requete pour obetenir un produit avec un ID
// On rajoute ${id} pour afficher les id 
fetch(`http://localhost:3000/api/products/${id}`)
  .then(response => response.json())
  // on utilise la réponse pour afficher image, titre etc
  .then(product => {

    // L'IMAGE
    // On récupère le container de l'image et on le stock dans imageContainer

    // On crée une variable articleImg dans laquelle on stockera l'image
    let articleImg = ''
    // on stock le resultat de la fonction displayImage (l'image produit) dans articleImg
    articleImg = `<img src=${product.imageUrl} alt="Photographie d'un canapé"></img>`
    // on integre articleImg à imageContainer grace à innerHTML

    let imageUrl = document.querySelector('.item__img').innerHTML = articleImg

    // LE TITRE
    // On récupère la balise title et on y integre du text ( product.name soit le nom du produit dans l'api)
    let name = document.getElementById('title').innerText = product.name

    // LE PRIX
    // On récupère la balise price et on y integre du text ( product.price soit le prix du produit dans l'api)
    let price = document.getElementById('price').innerText = product.price

    // DESCRIPTION

    document.getElementById('description').innerText = product.description

    // OPTIONS

    let options = `<option value="">--SVP, choisissez une couleur --</option>`

    // On fait une boucle et on crée une variable (option) de l'API (product) et on veut les couleurs dispo (.colors)
    for (let option of product.colors) {
      //on ajoute a options le resultat de la fonction (plus bas)
      options += ` <option value="${option}">${option}</option>`
      // on integre options à notre container "selection" (variable plus haut)
    }

    document.getElementById('colors').innerHTML = options


    //récupération du bouton ajouter au panier
    document.getElementById('addToCart').addEventListener('click', (event) => {
      event.preventDefault()
      // récupération de la valeur de colors et quantity 
      
      const optionItem = document.getElementById('colors').value
      const quantityItem = parseInt(document.getElementById('quantity').value)

      // création de l'objet à envoyer dans le tableau cart 
      const cart = JSON.parse(localStorage.getItem('cart')) || []
      const founded = cart.find(e => e.id === id && e.option === optionItem)

      if (founded) {
        founded.quantity += quantityItem
      } else {
        cart.push({
          id: id,
          quantity: quantityItem,
          option: optionItem,
          name: name,
          image : imageUrl,
          price : price
        })
      }
      localStorage.setItem('cart', JSON.stringify(cart))
      window.location.href = 'cart.html'
    })
  }
  )














