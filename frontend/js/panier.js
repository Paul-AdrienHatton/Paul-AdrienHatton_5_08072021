let boxSection = document.querySelector("#item__select"); // ajout variable boxSection à la page panier
// variable quantité 0
let total = 0;
// Appel ma function affichage du panier
displayQuantity();

// Contenu du panier, des boutons de suppression, annulation du panier et formulaire de contact
function displayQuantity() {
  if (sessionStorage.getItem("anyItem") !== null) {
    // si le session storage est différent de null
    // Récupére les données depuis sessionStorage
    let items = JSON.parse(sessionStorage.getItem("anyItem")); //convertir en objet JavaScript getItem convertie en string et on les ajoute au store
    total = 0; //initialisation du total à 0

    boxSection.insertAdjacentHTML(
      //éviter la sérialisation supplémentaire, rend la fonction plus rapide et directe que innerHTML.
      "afterbegin", //  Juste à l'intérieur de l'element , avant son premier enfant
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
    // Affichage des articles avec image, le nom et la couleur selectionné plus le prix et la quantité de produit
    items.forEach((product, index) => {
      // on passe l'index qui permet d'ajouter ou d'enlever un items
      total = total + product.price * product.quantity; // pour chaque produit le total est égal au prix du produit par sa quantité

      html += `<tr style="justify-items:center;">
                        <td class="old"><img src="${
                          product.imageUrl
                        }" alt="ours peluche" style="width:200px;"></td>
                        <td class="old">${product.name}</td>
                        <td class="old">${product.selectColors}</td>
                        <td class="old" style="padding-left:50px;"><button class="decrease__item ${index}" style=" background-color:white; padding:0 5px 0 5px;"> - </button>
                        ${product.quantity}
                        <button class="increase__item ${index}" style="background-color:white; padding:0 5px 0 5px;"> + </button></td>
                        <td class="old" style="padding-left:50px;">${(
                          (product.price * product.quantity) /
                          100
                        )
                          .toFixed(2)
                          .replace(".", ",")}€</td>
                        <td><button class="delete__item ${index}" style="background-color:white; padding:0 5px 0 5px;">Supprimer</button></td>
                    </tr>`;
      document.querySelector(".order__details").innerHTML = html; // ajout en fin de tableau dans le tbody
    });

    //Total prix passé en fin de tableau et boutton annuler commande
    boxSection.insertAdjacentHTML(
      //éviter la sérialisation supplémentaire, rend la fonction plus rapide et directe que innerHTML.
      "beforeend", //Juste à l'intérieur de l'element, après son dernier enfant.
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

    // Ajout du formulaire en dessous du total prix
    boxSection.insertAdjacentHTML(
      "beforeend",
      `<h2 style="margin-top:30px;">Veuillez remplir le formulaire ci-dessous avant de valider votre commande</h2>
          <form class="contact__form" action="post" type="submit">
              <div class="details__form">
                  <label for="firstname">PRENOM</label>
                  <input type="text" name="firstname" id="firstname" placeholder="votre prénom" maxlength="25" pattern="[a-zA-ZÀ-ÿ]{2,}" required />
              </div>
              <div class="details__form">
                  <label for="name">NOM</label>
                  <input type="text" name="name" id="name" placeholder="votre nom" maxlength="25" pattern="[a-zA-ZÀ-ÿ]{2,}" required />
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

    // L'ecoute du boutton "-" on ajoute un event qui au clique retire un item avec la fonction removeOneItem
    const decreaseItem = document.querySelectorAll(".decrease__item ");
    decreaseItem.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        removeOneItem(e, items);
      });
    });
    // L'ecoute des bouttons "+" on ajoute un event qui au clique ajoute un item avec la fonction addOneItem
    const increaseItem = document.querySelectorAll(".increase__item");
    increaseItem.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        addOneItem(e, items);
      });
    });
    //L'ecoute du boutton "supprimer" on ajoute un event qui vient supprimer l'item avec la fonction deleteItemSelect
    const deleteItem = document.querySelectorAll(".delete__item");
    deleteItem.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        deleteItemSelect(e, items);
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
    boxSection.insertAdjacentHTML(
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
function addOneItem(e, items) {
  let index = e.target.classList[1].slice(-1);
  items[index].quantity++;
  sessionStorage.setItem("anyItem", JSON.stringify(items)); //ajout d'un arcticle dans la storage
  updateNumberArticles();
}

// Fonction enlève un article passé à l'eventlistener decreaseItem
function removeOneItem(e, items) {
  let index = e.target.classList[1].slice(-1);
  items[index].quantity--;

  if (items[index].quantity <= 0) {
    items.splice(index, 1);
    if (items.length === 0) {
      sessionStorage.removeItem("anyItem"); // supression d'un article du storage
    } else {
      sessionStorage.setItem("anyItem", JSON.stringify(items)); // si différent de 0 on ajoute item
    }
  } else {
    sessionStorage.setItem("anyItem", JSON.stringify(items));
  }
  updateNumberArticles();
}

//Fonction supprime un article passé à l'eventlistener deleteItem
//Récupère l'index de l'article correspondant avec le caractère du nom de la classe.
function deleteItemSelect(e, items) {
  let index = e.target.classList[1].slice(-1);
  items.splice(index, 1);
  sessionStorage.setItem("anyItem", JSON.stringify(items)); //Supprime le bon article dans le tableau "items" du sessionStorage

  if (items.length === 0) {
    sessionStorage.removeItem("anyItem");
  }
  updateNumberArticles(); // si aucun article reviens à updateNumberArcticles qui Réinitialiser la section "item__select" et le nombre d'article dans le panier
}

//Supprime tout les article du sessionstorage
function cancelMyOrdered() {
  sessionStorage.removeItem("anyItem");
  updateNumberArticles();
}

//Réinitialise la section "item__select" et le nombre d'article dans le panier
function updateNumberArticles() {
  boxSection.innerHTML = "";
  displayQuantity(); // on retoure à la fonction display quantity affiche le else  "Vous n'avez aucun article!"
  itemConfirmation(); // appel la fonction item confirmation qui affiche 0 article dans le panier
}

function sendform() {
  //Récupère les valeurs de l'input dans contact__form (récupère les données remplie dans le formulaire)
  let contact = {
    firstName: document.getElementById("firstname").value, //Récupère les valeurs du form les insères dans un objet contact
    lastName: document.getElementById("name").value,
    address: document.getElementById("address").value,
    city: document.getElementById("city").value,
    email: document.getElementById("email").value,
  };

  let products = []; // on déclare le tableau des produits
  if (sessionStorage.getItem("anyItem") !== null) {
    // si le session storage est différent de null
    let productTab = JSON.parse(sessionStorage.getItem("anyItem")); //convertir en objet JavaScript getItem convertie en string en ajoutant les données reçus, reçoit le storage sous JS
    productTab.forEach((p) => {
      // Pour chaque paramètres récupéré dans le storage on récupèrer les données que l'on push dans le tableau products
      products.push(p._id); // on obtient un array de string
    });
  }

  let contactItems = JSON.stringify({
    // objet js transformé en json string pour les données de contact et des produits pour le body de fetch post
    contact,
    products,
  });
  postOrder(contactItems); //L'objet contact et le tableau products sont envoyé dans la function postOrder
}
//Requête POST, envoi au serveur le "contact" et le tableau d'id "products"
//Enregistre l'objet "contact" et Id, le total de la commande sur le sessionStorage.
function postOrder(contactItems) {
  fetch("http://localhost:3000/api/teddies/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors", //partage des ressources entre origines multiples
    body: contactItems, // le corps de la requête contactItems préalablement transformé en json
  })
    .then((response) => {
      return response.json(); // renvoie la réponse au format json
    })
    .then((res) => {
      //ajout à l'emplacement de stockage pour la session
      sessionStorage.setItem("contact", JSON.stringify(res.contact)); // objet js transformé en json pour les données de contact
      sessionStorage.setItem("orderId", JSON.stringify(res.orderId)); // objet js transformé en json string pour les données des produits
      sessionStorage.setItem("total", JSON.stringify(total)); // objet js transformé en json string pour le total
      sessionStorage.removeItem("anyItem"); //supprime la ressource avec le nom de clé correspondant du storage anyItem
      window.location.replace("./confirmation.html"); //Envoie page "confirmation"
    })

    .catch((e) => {
      displayError();
      console.log(e);
    });
}
