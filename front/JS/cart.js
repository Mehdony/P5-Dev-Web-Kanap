//  On récupère les données du localstorage grace à la méthode getItem
const cart = JSON.parse(localStorage.getItem("cart"));
const cartContainer = document.getElementById("cart__items");

displayCart(cart);



function displayCart(cart) {
  console.log(cart);
  let modele = "";

  for (let product of cart) {
    modele += `<article class="cart__item" data-id=${product.id} data-color="${product.color}">
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
  </article> `;
  }

  cartContainer.innerHTML = modele;
}




