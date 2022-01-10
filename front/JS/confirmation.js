function showOrderID(){
    const orderIdContainer = document.getElementById("orderId");
    orderIdContainer.innerText = localStorage.getItem("orderId");

    const price = document.getElementById('price')
    price.innerText = localStorage.getItem('total')
    
    localStorage.clear();
}

showOrderID();


