// const chainederequete = surlapage.lachainederequetedanslurl.recherche
const queryString = window.location.search
// permet d'analyser les paramètres de  la chaîne de requête (parametre dans la console)
const urlParams = new URLSearchParams(queryString)
//permet d'obtenir l'id (id de la page (url))
const id = urlParams.get('orderId')


function showOrderID(){

    const orderIdContainer = document.getElementById("orderId");
    orderIdContainer.innerText = id;

}

showOrderID();


