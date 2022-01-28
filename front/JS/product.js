const queryString = window.location.search 
const urlParams = new URLSearchParams(queryString) 
const id = urlParams.get("id") 

fetch(`http://localhost:3000/api/products/${id}`)
  .then((response) => response.json())
  .then((product) => {
    let articleImg = "" 
    
    articleImg = `<img src=${product.imageUrl} alt=${product.altTxt}></img>` 
   
    let imageUrl = (document.querySelector(".item__img").innerHTML = articleImg) 
    let name = (document.getElementById("title").innerText = product.name) 
    let price = (document.getElementById("price").innerText = product.price) 
    document.getElementById("description").innerText = product.description 

    let options = `<option value="">--SVP, choisissez une couleur --</option>` 

    for (let option of product.colors) {
      options += ` <option value="${option}">${option}</option>` 
    }

    document.getElementById("colors").innerHTML = options 

    document.getElementById("addToCart").addEventListener("click", (event) => {
      event.preventDefault() 

      const optionItem = document.getElementById("colors").value 
      const quantityItem = parseInt(document.getElementById("quantity").value) 

      const cart = JSON.parse(localStorage.getItem("cart")) || [] 

      // Fonction permettant de verifier que deux items aient le même Id et la même option
      const founded = cart.find((e) => 
      e.id === id && e.option === optionItem) 

      if (founded) {
        founded.quantity += quantityItem 
      } else {
        cart.push({
          id: id,
          quantity: quantityItem,
          option: optionItem,
          name: name,
          image: imageUrl,
          price: price,
        }) 
      }
      localStorage.setItem("cart", JSON.stringify(cart))
      alert("Produit ajouté au panier") 
      window.location.href = "cart.html" 
    }) 
  }) 
