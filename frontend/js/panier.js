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
      `<h1>Panier</h1>
            <table>
                <thead>
                    <tr>
                        <th>Articles</th>              
                        <th>Nom</th>
                        <th>Couleurs</th>
                        <th>Nombre<br>d'articles</th>
                        <th>Prix</th>
                    </tr>
                </thead>
                <tbody class="order__details">
                </tbody>
            </table>`
    );

    let html = "";
    total = product.itemsTotalValue;
    product.itemsEnum.forEach((product, index) => {
      html += `<tr style="justify-items:center;">
                        <td class="old"><img src="${
                          product.imageUrl
                        }" alt="ours peluche" style="width:200px;"></td>
                        <td class="old">${product.name}</td>
                        <td class="old">${product.selectColors}</td>
                        <td class="old" style="padding-left:50px;">
                        ${product.quantity}
                        <td class="old" style="padding-left:50px;">${(
                          product.price * product.quantity
                        )
                          .toFixed(2)
                          .replace(".", ",")}€</td>
                        <td><button class="delete__product ${index}" style="background-color:white; padding:0 5px 0 5px;">Supprimer</button></td>
                    </tr>`;
      document.querySelector(".order__details").innerHTML = html;
    });

    cartShow.insertAdjacentHTML(
      "beforeend",
      `<div class="total" style="margin-left:5%;">
                <p class="cart-section" style="margin-right:5%;">Total: ${total
                  .toFixed(2)
                  .replace(".", ",")}€</p>
                <button class="cancel__ordered">
                    <p>Annuler le panier</p>
                </button>
            </div>`
    );

    cartShow.insertAdjacentHTML(
      "beforeend",
      `<h2 style="margin-top:30px;">Veuillez remplir le formulaire ci-dessous avant de valider votre commande</h2>
          <form class="contact__form" action="post" type="submit">
              <div class="details__form">
                  <label for="firstName">PRENOM</label>
                  <input type="text" name="firstName" id="firstName" placeholder="votre prénom" maxlength="25" pattern="[a-zA-ZÀ-ÿ]{2,}" required />
              </div>
              <div class="details__form">
                  <label for="lastName">NOM</label>
                  <input type="text" name="lastName" id="lastName" placeholder="votre nom" maxlength="25" pattern="[a-zA-ZÀ-ÿ]{2,}" required />
              </div>
              <div class="details__form">
                  <label for="address">ADRESSE</label>
                  <input type="text" name="address" id="address" placeholder="votre adresse" maxlength="50" required />
              </div>
              <div class="details__form">
                  <label for="city">VILLE</label>
                  <input type="text" name="city" id="city" placeholder="votre ville" maxlength="50" pattern="[A-Za-z]{2,}" required />
              </div>
              <div class="details__form">
                  <label for="email">EMAIL</label>
                  <input type="email" name="email" id="email" placeholder="Veulliez entrer une adresse valide: adressemail@gmail.com" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+[.][a-z]{2,4}" required />
              </div>
              <button class="validate" id="submit">
                  <p>Valider votre commande</p>
              </button>
          </form>`
    );

    //L'ecoute du boutton "supprimer" on ajoute un event qui vient supprimer l'item avec la fonction deleteproductselect
    const deleteItem = document.querySelectorAll(".delete__product");
    deleteItem.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        let products = product.itemsEnum;
        deleteProductSelect(e, products);
      });
    });
    //L'ecoute du boutton "annuler" le panier on ajoute un event qui vient supprimer l'ensemble du panier avec la fonction cancelMyOrdered
    const cancelOrdered = document.querySelector(".cancel__ordered");
    cancelOrdered.addEventListener("click", () => {
      cancelMyOrdered();
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
      `<h2>Panier</h2>
                <p class="cart-section">
                    Vous n'avez aucun article!<a href="./index.html"><button>Revenir à la page d'accueil</button></a>
                </p>`
    );
  }
}
//Supprime l'article sélectionné.
//Récupère l'index de l'article correspondant avec le caractère du nom de la classe.
//Supprime le bon article dans le tableau "items" du sessionStorage
function deleteProductSelect(e, products) {
  let index = e.target.classList[1].slice(-1);
  products.splice(index, 1);

  if (products.length === 0) {
    sessionStorage.removeItem("cart");
  }
  howManyArticles();
}

//Supprime tout les article du sessionstorage
function cancelMyOrdered() {
  sessionStorage.removeItem("cart");
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

  let customerOder = JSON.stringify({
    contact,
    products,
  });
  postOrder(customerOder);
}

// =====================================================================================

//Requête POST, envoi au serveur "contact" et le tableau d'id "products"
//Enregistre l'objet "contact" et Id, le total de la commande sur le sessionStorage.
//Envoie page "confirmation"
function postOrder(customerOder) {
  fetch("http://localhost:3000/api/teddies/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
    body: customerOder,
  })
    .then((response) => {
      return response.json();
    })
    .then((r) => {
      sessionStorage.setItem("contact", JSON.stringify(r.contact));
      sessionStorage.setItem("orderId", JSON.stringify(r.orderId));
      sessionStorage.setItem("total", JSON.stringify(total));
      window.location.replace("./confirmation.html");
    });
}
