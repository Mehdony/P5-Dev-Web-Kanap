function showOrderID(){
    const orderIdContainer = document.getElementById("orderId");
    orderIdContainer.innerText = localStorage.getItem("orderId");
    console.log(localStorage.getItem("orderId"))
    localStorage.clear();
}

showOrderID();


//  Afficher le Total !! 