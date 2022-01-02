//  On récupère les données du localstorage grace à la méthode getItem
const cart = JSON.parse(localStorage.getItem("cart"))
const cartContainer = document.getElementById("cart__items")
// const qtyValue = document.getElementsByClassName('itemQuantity')
displayCart(cart)
updateQuantity()
displayTotal()
deleteProduct()
getForm()
postForm()

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

// Formulaire avec regex
function getForm() {
  // Ajout des Regex
  let form = document.querySelector(".cart__order__form")

  //Création des expressions régulières
  let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$')
  let charRegExp = new RegExp("^[a-zA-Z ,.'-]+$")
  let addressRegExp = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+")

  // Ecoute de la modification du prénom
  form.firstName.addEventListener('change', function () {
    validFirstName(this)
  })

  // Ecoute de la modification du nom
  form.lastName.addEventListener('change', function () {
    validLastName(this)
  })

  // Ecoute de la modification de l'adresse
  form.address.addEventListener('change', function () {
    validAddress(this)
  })

  // Ecoute de la modification de la ville
  form.city.addEventListener('change', function () {
    validCity(this)
  })

  // Ecoute de la modification de l'email
  form.email.addEventListener('change', function () {
    validEmail(this)
  })

  //validation du prénom
  const validFirstName = function (inputFirstName) {
    let firstNameErrorMsg = inputFirstName.nextElementSibling

    if (charRegExp.test(inputFirstName.value)) {
      firstNameErrorMsg.innerHTML = ''
    } else {
      firstNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.'
    }
  };

  //validation du nom
  const validLastName = function (inputLastName) {
    let lastNameErrorMsg = inputLastName.nextElementSibling

    if (charRegExp.test(inputLastName.value)) {
      lastNameErrorMsg.innerHTML = ''
    } else {
      lastNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.'
    }
  };

  //validation de l'adresse
  const validAddress = function (inputAddress) {
    let addressErrorMsg = inputAddress.nextElementSibling

    if (addressRegExp.test(inputAddress.value)) {
      addressErrorMsg.innerHTML = ''
    } else {
      addressErrorMsg.innerHTML = 'Veuillez renseigner ce champ.'
    }
  };

  //validation de la ville
  const validCity = function (inputCity) {
    let cityErrorMsg = inputCity.nextElementSibling;

    if (charRegExp.test(inputCity.value)) {
      cityErrorMsg.innerHTML = ''
    } else {
      cityErrorMsg.innerHTML = 'Veuillez renseigner ce champ.'
    }
  };

  //validation de l'email
  const validEmail = function (inputEmail) {
    let emailErrorMsg = inputEmail.nextElementSibling

    if (emailRegExp.test(inputEmail.value)) {
      emailErrorMsg.innerHTML = ''
    } else {
      emailErrorMsg.innerHTML = 'Veuillez renseigner votre email.'
    }
  };
}

//Envoi des informations client au localstorage
function postForm() {
  const btn_commander = document.getElementById("order")

  //Ecouter le panier
  btn_commander.addEventListener("click", (event) => {
    event.preventDefault()
    //Récupération des coordonnées du formulaire client
    let inputName = document.getElementById('firstName')
    let inputLastName = document.getElementById('lastName')
    let inputAdress = document.getElementById('address')
    let inputCity = document.getElementById('city')
    let inputMail = document.getElementById('email')

    //Construction d'un array depuis le local storage
    let productIdArray = []
    for (let i = 0; i < cart.length; i++) {
      productIdArray.push(cart[i].id)
    }
    console.log(productIdArray)

    const order = {
      contact: {
        firstName: inputName.value,
        lastName: inputLastName.value,
        address: inputAdress.value,
        city: inputCity.value,
        email: inputMail.value,
      },
      products: productIdArray,
    }

    const fetchPostOption = {
      method: 'POST',
      body: JSON.stringify(order),
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json"
      },
    };

    fetch("http://localhost:3000/api/products/order", fetchPostOption)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        localStorage.clear()
        localStorage.setItem("orderId", data.orderId)

        window.location.href = "confirmation.html"
      })
      .catch((err) => {
        alert("L'erreur suivante à été détectée: " + err.message)
      })
  })
}


















