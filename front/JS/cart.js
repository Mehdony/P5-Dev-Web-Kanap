//  On récupère les données du localstorage grace à la méthode getItem
const cartItems = JSON.parse(localStorage.getItem('cart'))
const cartContainer = document.getElementById("cart__items")

displayCart(cartItems)

function displayCart(items){
    let modele = []
    for(let item of items){
        modele = `<article class="cart__item" data-id=${item.id} data-color="{item-color}">
    <div class="cart__item__img">
     ${item.image}
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>${item.name}</h2>
        <p>${item.option}</p>
        <p>${item.price + " €"}</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : ${item.quantity}</p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
  </article> ` 
}
cartContainer.innerHTML = modele
}
















function displayitems(item) {
    // la fonction retrounera du code html de manière dynamique
    return ` `
}
