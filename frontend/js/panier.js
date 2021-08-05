/**
 * Affichage du panier (données produits)
 * Création du formulaire (données contact)
 * Récupération des données de contact et produit
 * Envoie des données au serveur
 */

let cart = JSON.parse(sessionStorage.getItem("cart"));
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
                    <h2 class="items__title">
                      ${product.name}
                    </h2>
                    <p class="items__img">
                      <img src="${product.imageUrl}" alt="ours peluche">
                    </p>
                    
                    <p class="items__color">Couleur: ${product.selectColors}</p>
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
                  .replace(".", ",")}€
                </h2>
        </div>
        <div class="cancel__btn">
                <button class="cancel__ordered">
                    Annuler le panier
                </button>
        </div>`
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

    /**
     * L'ecoute du boutton "supprimer" on ajoute un event qui vient supprimer l'item avec la fonction deleteProductselect
     */
    const deleteItem = document.querySelectorAll(".delete__product");
    deleteItem.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        if (confirm("Êtes-vous sûrs de supprimer cette article ?")) {
          deleteProductSelect(e, product);
        }
        setValuesforCart(product);
        saveCart(product);
      });
    });

    /**
     * L'ecoute du boutton "annuler" le panier on ajoute un event qui vient supprimer l'ensemble du panier avec la fonction deleteCart
     */
    const cancelOrdered = document.querySelector(".cancel__ordered");
    cancelOrdered.addEventListener("click", () => {
      if (confirm("Êtes-vous sûrs d'annuler le panier ?")) {
        deleteCart();
      }
    });

    /**
     * L'ecoute du boutton "valider votre commande" on ajoute un event qui vient envoyer le formulaire si bien remplie
     */
    const form = document.querySelector(".contact__form");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      sendform();
    });

    /**
     * Sinon, Panier vide on injecte un message pour indique que le panier est vide
     */
  } else {
    cartShow.insertAdjacentHTML(
      "afterbegin",
      `<p class="cart__section">
          Vous n'avez aucun article!
       </p>
       <a href="./index.html">
          <button class="btn__returned">Revenir à la page d'accueil</button>
       </a>`
    );
  }
}

/**
 * Supprime l'article sélectionné.
 *
 *
 * @param {*} product
 */
function deleteProductSelect(e, product) {
  index = product.itemsEnum.quantity;
  console.log(product);
  product.itemsEnum.splice(index, 1);
  document.location.reload();
  sessionStorage.setItem("cart", JSON.stringify(product));
}

/**
 * Sauvegarde l'objet "cart" sous forme de json dans le sessionStorage
 * @param {*} cart
 */
function saveCart(cart) {
  sessionStorage.setItem("cart", JSON.stringify(cart));
}

/**
 * Calcule les valeurs des propriétés "itemsCount" et "itemsTotalValue"
 * de l'objet "cart".
 * Doit être appelée juste avant de sauvegarder l'objet "cart".
 * @param {*} cart
 */
function setValuesforCart(cart) {
  cart.itemsCount = 0;
  cart.itemsTotalValue = 0.0;

  cart.itemsEnum.forEach((element) => {
    cart.itemsCount += element.quantity;
    cart.itemsTotalValue += element.price * element.quantity;
  });
}

/**
 * function qui affiche le nombre d'articles dans le panier.
 */
function howManyArticles() {
  showNumber = document.querySelector(".product__number");
  let number = 0;
  if (sessionStorage.getItem("cart") !== null) {
    let keyNumber = JSON.parse(sessionStorage.getItem("cart"));
    number = keyNumber.itemsCount;
    showNumber.textContent = number;
  } else {
    showNumber.textContent = 0;
  }
  document.location.reload();
}

/**
 * Supprime tout les article du sessionstorage
 */
function deleteCart() {
  sessionStorage.removeItem("cart");
  howManyArticles();
}

/**
 * Récupère les valeurs de l'input dans contact__form
 * Récupère les id des produits du panier dans le tableau products
 * L'objet contact et le tableau products sont envoyé dans la function postOrder
 */
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

/**
 * Requête POST, envoi au serveur "contact" et le tableau d'id "products"
 * Enregistre l'objet "contact" et Id, le total de la commande sur le sessionStorage.
 * Envoie page "confirmation"
 * @param {*} customerOrder
 */
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
      try {
        fetch("http://localhost:3000/api/teddies/order").then((response) =>
          response.json()
        );
      } catch (error) {
        checkStatus(response);
      }
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
function checkStatus(response) {
  if (response.status !== 200) throw new Error("Request failed");

  return response.status === 200;
}
