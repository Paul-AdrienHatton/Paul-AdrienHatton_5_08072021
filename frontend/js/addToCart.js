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

// déclare une constante po;ur le nom du local storage
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

  howManyArticles();
  alert("Votre produit a été ajouté au panier");
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
