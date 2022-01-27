const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const id = urlParams.get('orderId')
document.getElementById("orderId").innerText = id;



