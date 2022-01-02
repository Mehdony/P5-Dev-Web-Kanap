//  On récupère les données du localstorage grace à la méthode getItem
const cart = JSON.parse(localStorage.getItem("cart"))
const cartContainer = document.getElementById("cart__items")
// const qtyValue = document.getElementsByClassName('itemQuantity')
displayCart(cart)
updateQuantity()
displayTotal()
deleteProduct()

function displayCart(cart) {
  console.log(cart)
  let modele = ""

  for (let product of cart) {
    modele += `<article class="cart__item" data-id=${product.id} data-color="${product.option}">
    <div class="cart__item__img">
     ${product.image}
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>${product.name}</h2>
        <p>${product.option}</p>
        <p>${product.price} €</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
  </article> `
  }

  cartContainer.innerHTML = modele
  displayTotal()
}

function displayTotal() {
  const cart = JSON.parse(localStorage.getItem("cart"));
  let total = 0
  let product = 0
  // Boucle

  let totalPriceCart = []
  let totalArticleCart = []

  for (let product of cart) {
    let quantityLocalStorage = product.quantity
    let totalProduct = product.price * quantityLocalStorage;
    totalPriceCart.push(totalProduct)
    totalArticleCart.push(quantityLocalStorage)
  }


  const reducer = (accumulator, currentValue) => accumulator + currentValue
  product = totalArticleCart.reduce(reducer, 0)
  total = totalPriceCart.reduce(reducer, 0)
  console.log(total)

  document.getElementById("totalQuantity").innerHTML = product
  document.getElementById("totalPrice").innerHTML = total
  // Enregristré dans le localstorage
}

function updateQuantity() {

  let itemQuantity = document.querySelectorAll(".itemQuantity")

  for (let k = 0; k < itemQuantity.length; k++) {
    itemQuantity[k].addEventListener("change", (event) => {

      event.preventDefault()
      //Selection de l'element à modifier en fonction de son id ET sa couleur

      const baseQuantity = cart[k].quantity
      let newQuantity = itemQuantity[k].valueAsNumber

      const resultFind = cart.find((el) => el.newQuantity !== baseQuantity)

      resultFind.quantity = newQuantity
      cart[k].quantity = resultFind.quantity
      localStorage.setItem("cart", JSON.stringify(cart))

      // refresh rapide
      location.reload()

    });

  }

}

function deleteProduct() {
  let btn_supprimer = document.querySelectorAll(".deleteItem");

  for (let i = 0; i < btn_supprimer.length; i++) {
    btn_supprimer[i].addEventListener("click", (event) => {
      event.preventDefault()

      //Selection de l'element à supprimer en fonction de son id ET sa couleur
      let idDelete = cart[i].id
      let colorDelete = cart[i].option
      const productToDelete = cart.filter(el => el.id !== idDelete || el.option !== colorDelete)

      localStorage.setItem("cart", JSON.stringify(productToDelete))

      //Alerte produit supprimé et refresh
      alert("Ce produit a bien été supprimé de votre panier")
      location.reload()
    })
  }
}






















 // for (let i = 0; i < cart.length; i++) {
  //   let qtyLS = cart[i].quantity
  //   let totalProduct = cart[i].price * qtyLS;
  //   totalPriceCart.push(totalProduct)
  //   totalArticleCart.push(qtyLS)
  // }