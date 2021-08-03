/**
 * Déclare une constante pour le nom du local storage
 * */
const CART_STORAGE_NAME = "cart";
/**
 * Function ajout des articles au panier.
 * Cette fonction :
 *  - récupère le panier s'il existe dans le sessionStorage ;
 *      - s'il existe, elle l'utilise comme objet
 *      - s'il n'existe pas, elle instancie un objet "cart"
 *  - vérifie si le produit est déjà dans le panier ;
 *      - s'il est dans le panier, elle met à jour la quantité
 *      - s'il n'y est pas, elle l'ajoute
 *  - calcule les valeurs des propriétés de l'objet "cart"
 *  - sauvegarde l'objet "cart" dans le sessionStorage
 * @param {object} product
 */
function myCart(product) {
  let cart = getCartDtoOrCreate();

  if (productAlreadyInCart(cart, product)) updateProductQuantity(cart, product);
  else addToCart(cart, product);

  setValuesforCart(cart);
  saveCart(cart);
  howManyArticles();
  alert("Votre produit a été ajouté au panier");
}

/**
 * Cette fonction permet de transformer un produit en élément de panier
 * (DTO = Data Transfer Object)
 * @param object product est le produit à ajouté
 * @returns object
 */
function getDto(product) {
  return {
    _id: product._id,
    imageUrl: product.imageUrl,
    name: product.name,
    price: product.price / 100,
    quantity: 1,
    selectColors: product.selectColors,
  };
}

/**
 * Crée un objet "cart" utilisé comme format d'echange et de stockage
 * @returns Object
 */
function createCartDto() {
  return {
    itemsCount: 0,
    itemsTotalValue: 0.0,
    itemsEnum: [],
  };
}

/**
 * Vérifie l'existence d'un panier dans le sessionStorage.
 *  - s'il existe, le retourne sous forme d'objet
 *  - s'il n'existe pas, instancie un objet "cart" et le retourne
 * @returns
 */
function getCartDtoOrCreate() {
  let cart = JSON.parse(sessionStorage.getItem(CART_STORAGE_NAME));
  if (cart) return cart;
  else return createCartDto();
}

/**
 * Calcule les valeurs des propriétés "itemsCount" et "itemsTotalValue"
 * de l'objet "cart".
 * Doit être appelée juste avant de sauvegarder l'objet "cart".
 * @param {object} cart
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
 * Sauvegarde l'objet "cart" sous forme de json dans le sessionStorage
 * @param {object} cart
 */
function saveCart(cart) {
  sessionStorage.setItem(CART_STORAGE_NAME, JSON.stringify(cart));
}

/**
 * ajoute un item au cart.
 * Ne vérifie pas son existence ou non.
 * @param {object} cart
 * @param {object} product
 */
function addToCart(cart, product) {
  cart.itemsEnum.push(getDto(product));
}

/**
 * Verifie l'existence d'un produit dans le cart.
 * retourne true si le produit est déjà dans le panier.
 * @param {object} cart
 * @param {object} product
 * @returns bool
 */
function productAlreadyInCart(cart, product) {
  let alreadyInCart = false;
  if (!cart.itemsEnum) return alreadyInCart;
  cart.itemsEnum.forEach((element) => {
    if (
      element._id === product._id &&
      element.selectColors === product.selectColors
    )
      alreadyInCart = true;
  });
  return alreadyInCart;
}

/**
 * Ajoute une unité à un produit déjà dans le panier.
 * @param {object} cart
 * @param {object} product
 */
function updateProductQuantity(cart, product) {
  cart.itemsEnum.forEach((element) => {
    if (
      element._id === product._id &&
      element.selectColors === product.selectColors
    )
      element.quantity += 1;
  });
}
