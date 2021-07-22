// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
/**
 * Je veux afficher les résultats de mon panier (img, prix, quantité, couleur..)
 * je veux créer un total prix du panier de base à 0
 * je veux pouvoir intéragir sur les quantitées des produits déjà présent dans le panier
 *  - bouton "+"" et "-" avec un addeventlistener pour ajouter ou supprimer les quantitées d'un produit
 *  - bouton "supprimer" qui vient supprimer tout le produit peut importe la quantité et remet le total à 0
 * je veux pouvoir supprimer tout le panier
 *  - bouton "supprimer" tout le panier avec un addeventlistener et remet le total à 0
 *  - afficher un message panier vide
 * Je veux créer une fonction qui géreè toute le panier
 *
 * Je veux créer un formulaire
 * je veux que les champs soit obligatoire (requiered)
 * je veux créer des regex pour le mise en forme de donnée à envoyer
 * les données prennent la forme suivante: firstName, lastName, address, city et email
 * je veux que le form renvoie un objet nommé contact
 *
 * je veux envoyer mes données de contact et le tableau de produit
 *  - les données de contact doivent être un objet
 *  - le tableau de produit doit être un array de strings products
 * je doit utiliser la méthode post et envoyer la requête sous format Json
 * La réponse doit contenir l'objet contact, le tableau produits et  mon orderId sous forme de string
 * Je retourne une page de confirmation de l'envoie avec le contact, le total et orderID
 */
// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
let cartShow = document.querySelector("#display__cart");
let total = 0;
myCart();

function myCart() {
  if (sessionStorage.getItem("cart") !== null) {
    let product = JSON.parse(sessionStorage.getItem("cart"));
    cartShow.insertAdjacentHTML(
      "afterbegin",
      `<div class="order__details">
            </div>`
    );

    let html = "";
    total = product.itemsTotalValue;
    product.itemsEnum.forEach((product, index) => {
      html += `<div class="container">
                        <h2 class="items__title">${product.name}</h1>
                        <p class="items__img"><img src="${
                          product.imageUrl
                        }" alt="ours peluche"></p>
                        
                        <p class="items__color">Couleur: ${
                          product.selectColors
                        }</p>
                        <p class="items__quantity">
                        Quantité: ${product.quantity}</p>
                        <p class="items__price">Prix: ${(
                          product.price * product.quantity
                        )
                          .toFixed(2)
                          .replace(".", ",")}€</p>
                        <p><button class="delete__product ${index}">Supprimer</button></p>
                    </div>`;
      document.querySelector(".order__details").innerHTML = html;
    });

    cartShow.insertAdjacentHTML(
      "beforeend",
      `<div class="total">
                <h2 class="cart-section">Total: ${total
                  .toFixed(2)
                  .replace(".", ",")}€</h2>
                  </div>
                  <div class="cancel__btn">
                <button class="cancel__ordered">
                    Annuler le panier
                </button></div>`
    );

    cartShow.insertAdjacentHTML(
      "beforeend",
      `<h2 class="form__title">Veuillez remplir le formulaire ci-dessous avant de valider votre commande</h2>
          <form class="contact__form" action="post" type="submit">
              <div class="details__form">
                  <label for="firstName">PRENOM</label>
                  <input type="text" name="firstName" id="firstName" placeholder="Votre prénom" maxlength="25" pattern="[a-zA-ZÀ-ÿ]{2,}" required />
              </div>
              <div class="details__form">
                  <label for="lastName">NOM</label>
                  <input type="text" name="lastName" id="lastName" placeholder="Votre nom" maxlength="25" pattern="[a-zA-ZÀ-ÿ]{2,}" required />
              </div>
              <div class="details__form">
                  <label for="address">ADRESSE</label>
                  <input type="text" name="address" id="address" placeholder="Votre adresse" maxlength="50" required />
              </div>
              <div class="details__form">
                  <label for="city">VILLE</label>
                  <input type="text" name="city" id="city" placeholder="Votre ville" maxlength="50" pattern="[A-Za-z]{2,}" required />
              </div>
              <div class="details__form">
                  <label for="email">EMAIL</label>
                  <input type="email" name="email" id="email" placeholder="Veulliez entrer une adresse valide: adressemail@gmail.com" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+[.][a-z]{2,4}" required />
              </div>
              <button class="validate" id="submit">
                  Valider votre commande
              </button>
          </form>`
    );

    //L'ecoute du boutton "supprimer" on ajoute un event qui vient supprimer l'item avec la fonction deleteproductselect
    const deleteItem = document.querySelectorAll(".delete__product");
    deleteItem.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        if (confirm("Êtes-vous sûrs de supprimer cette article ?")) {
          deleteProductSelect(e, product);
        }
      });
    });
    //L'ecoute du boutton "annuler" le panier on ajoute un event qui vient supprimer l'ensemble du panier avec la fonction cancelMyOrdered
    const cancelOrdered = document.querySelector(".cancel__ordered");
    cancelOrdered.addEventListener("click", () => {
      if (confirm("Êtes-vous sûrs d'annuler le panier ?")) {
        cancelMyOrdered();
      }
    });

    //L'ecoute du boutton "valider votre commande" on ajoute un event qui vient envoyer le formulaire si bien remplie
    const form = document.querySelector(".contact__form");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      sendform();
    });

    //Sinon, Panier vide on injecte un message pour indique que le panier est vide
  } else {
    cartShow.insertAdjacentHTML(
      //éviter la sérialisation supplémentaire, rend la fonction plus rapide et directe que innerHTML.
      "afterbegin", //  Juste à l'intérieur de l'element , avant son premier enfant
      `<p class="cart__section">
          Vous n'avez aucun article!</p><a href="./index.html">
          <button class="btn__returned">Revenir à la page d'accueil</button></a>
        `
    );
  }
}
//Supprime l'article sélectionné.
//Récupère l'index de l'article correspondant avec le caractère du nom de la classe.
//Supprime le bon article dans le tableau "items" du sessionStorage
function deleteProductSelect(e, product) {
  index = product.itemsEnum.quantity;
  index2 = product.itemsCount.quantity;
  index3 = product.itemsTotalValue.quantity;

  console.log(product);
  product.itemsEnum.splice(index, 1);
  product.itemsCount.splice(index, 1);
  product.itemsTotalValue.splice(index, 1);
  document.location.reload();
  sessionStorage.setItem("cart", JSON.stringify(product));
  howManyArticles();
}

//Supprime tout les article du sessionstorage
function cancelMyOrdered() {
  sessionStorage.removeItem("cart");
  howManyArticles();
}

//Réinitialise la section "item__select" et le nombre d'article dans le panier
function howManyArticles() {
  cartShow.innerHTML = "";
  myCart();
  howManyArticles();
}
///////////////////////////////////////////////////////////////////////
//                                                                   //
//                  Function envoie du formulaire                    //
//                                                                   //
///////////////////////////////////////////////////////////////////////

//Récupère les valeurs de l'input dans contact__form
//Récupère les id des produits du panier dans le tableau products
//L'objet contact et le tableau products sont envoyé dans la function postOrder
function sendform() {
  let contact = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    address: document.getElementById("address").value,
    city: document.getElementById("city").value,
    email: document.getElementById("email").value,
  };

  let products = [];
  if (sessionStorage.getItem("cart") !== null) {
    let productTab = JSON.parse(sessionStorage.getItem("cart"));
    productTab.itemsEnum.forEach((p) => {
      products.push(p._id);
    });
  }

  let customerOrder = JSON.stringify({
    contact,
    products,
  });
  postOrder(customerOrder);
}

// =====================================================================================

//Requête POST, envoi au serveur "contact" et le tableau d'id "products"
//Enregistre l'objet "contact" et Id, le total de la commande sur le sessionStorage.
//Envoie page "confirmation"
function postOrder(customerOrder) {
  fetch("http://localhost:3000/api/teddies/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
    body: customerOrder,
  })
    .then((response) => {
      return response.json();
    })
    .then((r) => {
      sessionStorage.setItem("contact", JSON.stringify(r.contact));
      sessionStorage.setItem("orderId", JSON.stringify(r.orderId));
      sessionStorage.setItem("total", JSON.stringify(total));
      sessionStorage.removeItem("cart");
      window.location.replace("./confirmation.html");
    });
}
