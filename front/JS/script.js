// Appel de l'ID "items" transformé en variable "items"
let items = document.querySelector("#items")

fetch("http://localhost:3000/api/products")
.then(response  => response.json())
.then(products => {
    let articles = ""
for (let product of products){
    articles += displayProducts(product)
    items.innerHTML = articles
}
})

function displayProducts(product) {
    return `<a href="./product.html?id=${product._id}">
    <article>
      <img src="${product.imageUrl}" alt="${product.altTxt}">
      <h3 class="productName">${product.name}</h3>
      <p class="productDescription">${product.description}</p>
    </article>
  </a>`

}