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
    let products = JSON.parse(sessionStorage.getItem("cart"));

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
    products.forEach((product, index) => {
      total = total + product.price * product.quantity;

      html += `<tr style="justify-items:center;">
                        <td class="old"><img src="${
                          product.imageUrl
                        }" alt="ours peluche" style="width:200px;"></td>
                        <td class="old">${product.name}</td>
                        <td class="old">${product.selectColors}</td>
                        <td class="old" style="padding-left:50px;"><button class="decrease__product ${index}" style=" background-color:white; padding:0 5px 0 5px;"> - </button>
                        ${product.quantity}
                        <button class="increase__product ${index}" style="background-color:white; padding:0 5px 0 5px;"> + </button></td>
                        <td class="old" style="padding-left:50px;">${(
                          (product.price * product.quantity) /
                          100
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
                <p class="cart-section" style="margin-right:5%;">Total: ${(
                  total / 100
                )
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

    const decreaseItem = document.querySelectorAll(".decrease__product");
    decreaseItem.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        removeOneItem(e, products);
      });
    });
    // L'ecoute des bouttons "+" on ajoute un event qui au clique ajoute un item avec la fonction addOneItem
    const increaseItem = document.querySelectorAll(".increase__product");
    increaseItem.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        addOneItem(e, products);
      });
    });
    //L'ecoute du boutton "supprimer" on ajoute un event qui vient supprimer l'item avec la fonction deleteproductselect
    const deleteItem = document.querySelectorAll(".delete__product");
    deleteItem.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        deleteproductselect(e, products);
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

// Fonction ajout d'un article passé à l'eventlistener increaseItem
function addOneItem(e, products) {
  let index = e.target.classList[1].slice(-1);
  products[index].quantity++;
  sessionStorage.setItem("cart", JSON.stringify(products));
  updateNumberArticles();
}

// Fonction enlève un article passé à l'eventlistener decreaseItem
function removeOneItem(e, products) {
  let index = e.target.classList[1].slice(-1);
  products[index].quantity--;

  if (products[index].quantity <= 0) {
    products.splice(index, 1);
    if (products.length === 0) {
      sessionStorage.removeItem("cart");
    } else {
      sessionStorage.setItem("cart", JSON.stringify(products));
    }
  } else {
    sessionStorage.setItem("cart", JSON.stringify(products));
  }
  updateNumberArticles();
}

//Fonction supprime un article passé à l'eventlistener deleteItem
//Récupère l'index de l'article correspondant avec le caractère du nom de la classe.
function deleteproductselect(e, products) {
  let index = e.target.classList[1].slice(-1);
  products.splice(index, 1);
  sessionStorage.setItem("cart", JSON.stringify(products));

  if (products.length === 0) {
    sessionStorage.removeItem("cart");
  }
  updateNumberArticles();
}

//Supprime tout les article du sessionstorage
function cancelMyOrdered() {
  sessionStorage.removeItem("cart");
  updateNumberArticles();
}

//Réinitialise la section "item__select" et le nombre d'article dans le panier
function updateNumberArticles() {
  cartShow.innerHTML = "";
  myCart();
  howManyArticles();
}
///////////////////////////////////////////////////////////////////////
//                                                                   //
//                  Function envoie du formulaire                    //
//                                                                   //
///////////////////////////////////////////////////////////////////////
