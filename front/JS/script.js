const items = document.querySelector("#items")

fetch("http://localhost:3000/api/products")
  .then((response) => response.json())
  .then((response) => {
    let articles = ""
    for (let product of response) {
      articles += displayProducts(product)
    }
    items.innerHTML = articles
  })

// fonction qui permet d'afficher les produits 
function displayProducts(product) {
  return `<a href="./product.html?id=${product._id}">
    <article>
      <img src="${product.imageUrl}" alt="${product.altTxt}">
      <h3 class="productName">${product.name}</h3>
      <p class="productDescription">${product.description}</p>
      <p class="productPrice">${product.price + " €"}</p>
    </article>
  </a>`
}
