// permet de stocker l'url qui suit product.html soit ?id=0651616
const queryString = window.location.search
console.log(queryString)

// permet d'analyser les paramètres de  la chaîne de requête
const urlParams = new URLSearchParams(queryString)
console.log(urlParams)

//permet d'obtenir l'id
const id = urlParams.get('id')
console.log(id)

fetch(`http://localhost:3000/api/products/${id}`)
.then(response  => response.json())
.then(product => {

  let imageContainer = document.querySelector('.item__img')
  let articleImg =''
  articleImg += displayImg(product) 
  imageContainer.innerHTML = articleImg

  let title = document.getElementById('title')
  title.innerText = product.name

  let price = document.getElementById('price')
  price.innerText = product.price

  

})

function displayImg(product) {
    return `<img src=${product.imageUrl} alt="Photographie d'un canapé"></img>`
}

