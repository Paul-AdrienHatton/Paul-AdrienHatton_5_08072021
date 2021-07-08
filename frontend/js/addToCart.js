/**
 * Je veux ajouter un élément dans le panier.
 * Je dois savoir si le panier est vide ou pas. (cartExists)
 * s'il est vide, j'ajoute simplement le produit. (addToCart)
 * s'il n'est pas vide, je vérifie si le produit est déjà dans le panier (productAlreadyInCart)
 *  - s'il est dans le panier , j'augmente la quantité (updateProductQuantity)
 *  - s'il n'y est pas, j'ajoute simplement le produit.(addToCart)
 *
 */
const CART_STORAGE_NAME = "cart";

function addProductOrUpdateQuantity(product) {
  if (cartExists)
    if (productAlreadyInCart(product)) updateProductQuantity(product);
    else addToCart(product);
  else addToCart(product);

  itemConfirmation();
  alert("Votre produit a été ajouter au panier");
}

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

/**
 * Détermine si le panier est déjà créé
 * @returns boolean
 */
function cartExists() {
  return sessionStorage.getItem(CART_STORAGE_NAME) !== null;
}

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

function updateProductQuantity(product) {
  // on récupère le panier.
  let cart = JSON.parse(sessionStorage.getItem(CART_STORAGE_NAME));

  // on parse le panier item par item (boucle)
  cart.forEach((item) => {
    if (product._id === item._id && product.selectColors === item.selectColors)
      item.quantity++;
  });
}

/////////////////////////////////////////////////////////////////////////

function addItemCart(item) {
  // cartItem est un tableau (vide à ce stade), destiné à contenir les produits du panier.
  // pourquoi est il vide ? on aurait pu faire
  // let cartItem = sessionStorage.getItem("cart");
  // le nommage est mauvais : cartItems ou cart plus simplement aurait été plus facilitant.
  let cartItem = [];

  // on stocke le produit dans un objet destiné à être stocké dans le tableau cartItem
  let saveItemCart = {
    _id: item._id,
    imageUrl: item.imageUrl,
    name: item.name,
    price: item.price,
    quantity: 1,
    selectColors: item.selectColors,
  };

  // ce flag sert à définir si on doit ajouter le produit ou mettre à jour la quantité
  // si on avait déjà fait un sessionStorage.getItem("cart"), on aurait une idée.
  let otherItem = true;

  // Si sessionStorage ne contient pas "anyItem" elle crée un nouveau tableau cartItem et l'enregistre dans le sessionStorage
  // Enorme souci de nommage ici, anyItem n'a pas de sémantique
  // le conditionnel verifie la présence d'un panier
  if (sessionStorage.getItem("anyItem") === null) {
    // pas de panier dans ce cas
    //La méthode getItem() de l'interface Storage renvoie la valeur associée à la clé passée en paramètre
    cartItem.push(saveItemCart); //ajoute les éléments à la fin d'un tableau et retourne un nouveau tableau
    sessionStorage.setItem("anyItem", JSON.stringify(cartItem)); // retourne un string qui peut être "store" dans la session, qui se supprime à la fin de chaque session

    //on aurait pu simplifier toute cette partie par
    // if (sessionStorage.getItem("anyItem") === null) sessionStorage.setItem("anyItem", [JSON.stringify(cartItem)]);
  }
  // Sinon elle récupère le tableau du sessionStorage, ajoute le nouveau produit, et enregistre le nouveau tableau.
  else {
    cartItem = JSON.parse(sessionStorage.getItem("anyItem")); // récupére les donnees json et les transforme en objet javascript

    cartItem.forEach((prod) => {
      if (item._id === prod._id && item.selectColors === prod.selectColors) {
        // boucle for ajoute le nouveau produit
        prod.quantity++;
        otherItem = false;
      }
    });
    if (otherItem) cartItem.push(saveItemCart); // si otherItem est vrai on ajoute les données produit dans saveItemCart
    sessionStorage.setItem("anyItem", JSON.stringify(cartItem)); // on transforme le tableau en string
  }

  itemConfirmation();
  alert("Votre produit a été ajouter au panier");
}
