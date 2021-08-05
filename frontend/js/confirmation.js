/**
 * Je retourne une page de confirmation de l'envoie avec le contact, le total et orderID
 * je veux les afficher sous format HTML
 * je veux supprimer les données de mon sessionsstorage après l'affichage pour avoir un panier vide
 */
const contact = JSON.parse(sessionStorage.getItem("contact"));
const orderId = JSON.parse(sessionStorage.getItem("orderId"));
const total = JSON.parse(sessionStorage.getItem("total"));
let html = "";
html += `
    <h1 class="title__ordered">Confirmation de la commande</h1>
    <div class="details__ordered">
        <h2>Vos coordonnées :</h2>
        <p class="puce">Nom: ${contact.lastName}</p>
        <p class="puce">Prénom: ${contact.firstName}</p>
        <p class="puce">Adresse: ${contact.address}</p>
        <p class="puce">Email: ${contact.email}</p>
    
    <h3>Total: ${total.toFixed(2).replace(".", ",")} €</h3>
    <h3>Numéro de la commande: </br> ${orderId}</h3>
    </div>`;
document.getElementById("order__confirmation").innerHTML = html;
alert("Votre commande à bien été effectuée !");

// sessionStorage.removeItem("contact");
// sessionStorage.removeItem("total");
// sessionStorage.removeItem("orderId");
// sessionStorage.removeItem("cart");
