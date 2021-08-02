/**
 * Affichage du nombre d'article dans mon panier
 */
howManyArticles();
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
}
