//  On récupère les données du localstorage grace à la méthode getItem
const cartItems = JSON.parse(localStorage.getItem('cart'))
const cartContainer = document.getElementById("cart__items")

displayCart(cartItems)

function displayCart(i) {
  let modele = []
  for (let i = 0; i < cartItems.length; i++) {
    modele[i] = `<article class="cart__item" data-id=${cartItems[i].id} data-color="{item-color}">
    <div class="cart__item__img">
     ${cartItems[i].image}
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>${cartItems[i].name}</h2>
        <p>${cartItems[i].option}</p>
        <p>${cartItems[i].price + " €"}</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : ${cartItems[i].quantity}</p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
  </article> `
  }



  //     for(let item of items){

  // }
  cartContainer.innerHTML = modele
}
















function displayitems(item) {
  // la fonction retrounera du code html de manière dynamique
  return ` `
}
