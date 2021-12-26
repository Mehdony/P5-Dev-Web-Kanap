//  On récupère les données du localstorage grace à la méthode getItem
const cart = JSON.parse(localStorage.getItem("cart"));
const cartContainer = document.getElementById("cart__items");
// const qtyValue = document.getElementsByClassName('itemQuantity')
displayCart(cart);

function displayCart(cart) {
  console.log(cart);
  let modele = "";

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
  </article> `;
  }

  cartContainer.innerHTML = modele;
  displayTotal()
}

document.querySelectorAll(".itemQuantity").forEach((quantityInput) => {
  quantityInput.addEventListener("change", (e) => {
    let newvalue = parseInt(e.target.value)
    const parent = e.target.parentElement.parentElement.parentElement.parentElement
    console.log(parent.dataset.id)

    // Mettre à jour le localStorage
    // localStorage.setItem('cart',)
    displayTotal()

  })
})


function displayTotal() {
  const cart = JSON.parse(localStorage.getItem("cart"));
  let total = 0
  let product = 0
  // Boucle 

  let totalPriceCart = [];

  for (let i = 0; i < cart.length; i++) {
    let qtyLS = cart[i].quantity
    let totalProduct = cart[i].price * qtyLS;
    totalPriceCart.push(totalProduct)
  }

  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  total = totalPriceCart.reduce(reducer, 0);
  console.log(total);

  document.getElementById("totalQuantity").innerHTML = product
  document.getElementById("totalPrice").innerHTML = total
  // Enregristré dans le localstorage 
}






// let addNewItem = function(quantity) {

//   // retrieve it (Or create a blank array if there isn't any info saved yet),
//   let items = JSON.parse(localStorage.getItem("cart"))


//   // add to it, only if it's empty
//   let item = items.find(item => item.id === id);

//   if (item) {
//     item.quantity = newvalue;
//   } else {
//     items.push({
//       id,
//       quantity,
//       price
//     })
//   }

//   // then put it back.
//   localStorage.setItem('cart', JSON.stringify(items));
//   console.log(items);
// }
// addNewItem(newvalue)

// let produit = {
//   id : idLS,
//   qty : qtyLS
// }
// console.log(produit); 