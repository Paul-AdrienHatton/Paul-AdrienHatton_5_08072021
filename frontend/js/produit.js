// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// Récupération de l'id du produit sélectionné dans la page précédente
// Récupération du produit avec l'id associé depuis le serveur
//Donné du produit injecté dans une fonction, mise au format html
//Gestion des erreur instruction try/catch
//
// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
const productId = window.location.search.substr(1);

fetch(`http://localhost:3000/api/teddies/${productId}`)
  .then((response) => response.json())
  .then((response) => {
    let html = "";
    html += formatHtml(
      response.name,
      response.imageUrl,
      response.description,
      response.price,
      response._id
    );

    function formatHtml(name, imageUrl, description, price, _id) {
      let myreturn = "";
      myreturn += `<h1 class="row">${name}</h1>
        <p class="row"><img src="${imageUrl}" alt="image d'ours en détails" style="width:40%; border-radius:5px;"></p>
        <p class="row">${description}</p>
        <p class="row"><b>Prix: ${(price / 100)
          .toFixed(2)
          .replace(".", ",")}€</b></p>
        <!-- Personalisation de la couleur -->
        <label for="select__color">
            <h3>Personnaliser votre ours</h3>
        </label>
            <select class="section__choice" name="colors" id="select__color">
            <!-- Mes choix de couleurs dans la function forEach --!>
            </select>
        <button id="addToCart">Ajouter au panier</button>`;

      return myreturn;
    }
    document.getElementById("item__details").innerHTML = html;

    //Création d'une function foreach pour afficher les choix de couleurs
    let choice = document.querySelector(".section__choice");

    response.colors.forEach(function (colors) {
      let option = document.createElement("option");
      option.value = colors;
      option.textContent = colors;
      choice.appendChild(option);
    });

    try {
      fetch(`http://localhost:3000/api/teddies/${productId}`).then((response) =>
        response.json()
      );
    } catch (error) {
      checkStatus(response);
    }

    function checkStatus(response) {
      if (response.status !== 200) throw new Error("Request failed");

      return response.status === 200;
    }
    console.log(response);

    const sendCartBtn = document.getElementById("addToCart");
    console.log(sendCartBtn);

    sendCartBtn.addEventListener("click", () => {
      let select = document.querySelector(".section__choice");
      response.selectColors = select.options[select.selectedIndex].value;
      addProductOrUpdateQuantity();
    });
  });

// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
/**
 * Je veux ajouter ma réponse au session storage
 * je veux lui passe la fonction addProductOrUpdateQuantity
 * je veux ajouter la reponse au panier avec un add event listener pour récupérer mes données
 */
// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
/**
 * Je veux ajouter un élément dans le panier.
 * Je dois savoir si le panier est vide ou pas. (cartExists)
 * s'il est vide, j'ajoute simplement le produit. (addToCart)
 * s'il n'est pas vide, je vérifie si le produit est déjà dans le panier (productAlreadyInCart)
 *  - s'il est dans le panier , j'augmente la quantité (updateProductQuantity)
 *  - s'il n'y est pas, j'ajoute simplement le produit.(addToCart)
 */
// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

// déclare une constante pour le nom du local storage
const CART_STORAGE_NAME = "cart";

///////////////////////////////////////////////////////////////////////
//                                                                   //
//   Function ajouter élément au panier ou augmenter la quantitée    //
//                                                                   //
///////////////////////////////////////////////////////////////////////

function addProductOrUpdateQuantity(product) {
  if (cartExists)
    if (productAlreadyInCart(product)) updateProductQuantity(product);
    else addToCart(product);
  else addToCart(product);

  itemConfirmation();
  alert("Votre produit a été ajouter au panier");
}

///////////////////////////////////////////////////////////////////////
//                                                                   //
//           S'il est vide, j'ajoute simplement le produit.          //
//                                                                   //
///////////////////////////////////////////////////////////////////////

function addToCart(product) {
  // je recupère le panier (s'il existe, c'est un array, sinon on l'initialise)
  let cart = sessionStorage.getItem(CART_STORAGE_NAME)
    ? sessionStorage.getItem(CART_STORAGE_NAME)
    : [];

  // l'array cart est initialisé, je pousse les données dedans
  cart.push(getDto(product));

  // je stocke mon array "panier" dans le sessionStorage
  sessionStorage.setItem(CART_STORAGE_NAME, cart);
}
///////////////////////////////////////////////////////////////////////
//                                                                   //
//           S'il est vide, j'ajoute simplement le produit.          //
//                                                                   //
///////////////////////////////////////////////////////////////////////

/**
 * Cette fonction permet de transformer un produit en élément de panier
 * (DTO = Data Transfer Object)
 * @param object product est le produit à ajouter
 * @returns object
 */
function getDto(product) {
  return {
    _id: product._id,
    imageUrl: product.imageUrl,
    name: product.name,
    price: product.price,
    quantity: 1,
    selectColors: product.selectColors,
  };
}
///////////////////////////////////////////////////////////////////////
//                                                                   //
//           Je dois savoir si le panier est vide ou pas             //
//                                                                   //
///////////////////////////////////////////////////////////////////////
/**
 * Détermine si le panier est déjà créé
 * @returns boolean
 */
function cartExists() {
  return sessionStorage.getItem(CART_STORAGE_NAME) !== null;
}
////////////////////////////////////////////////////////////////////////////
//                                                                        //
//  S'il n'est pas vide, je vérifie si le produit est déjà dans le panier //
//                                                                        //
////////////////////////////////////////////////////////////////////////////

function productAlreadyInCart(product) {
  let productAlreadyInCart = false;

  if (cartExists) {
    // on récupère le panier.
    let cart = JSON.parse(sessionStorage.getItem(CART_STORAGE_NAME));

    // on parse le panier item par item (boucle)
    cart.forEach((item) => {
      if (
        product._id === item._id &&
        product.selectColors === item.selectColors
      )
        productAlreadyInCart = true;
    });
  }

  return productAlreadyInCart;
}
///////////////////////////////////////////////////////////////////////
//                                                                   //
//         S'il est dans le panier , j'augmente la quantité          //
//                                                                   //
///////////////////////////////////////////////////////////////////////

function updateProductQuantity(product) {
  // on récupère le panier.
  let cart = JSON.parse(sessionStorage.getItem(CART_STORAGE_NAME));

  // on parse le panier item par item (boucle)
  cart.forEach((item) => {
    if (product._id === item._id && product.selectColors === item.selectColors)
      item.quantity++;
  });
}
