// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// Affichage du nombre d'article dans mon panier
// Je choisis l'emplacement du nombre
// Je met le nombre d'article dans une variable de base à 0
// Je regarde si mon panier contient un produit
//  - Si oui le total reste à 0
//  - Si non je lui passe la valeur itemsCount (déterminer le nombre d'article dans le panier)
// J'ajoute le résultat à l'emplacement choisi pour le nombre
// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
howManyArticles();
// function qui affiche le nombre d'articles dans le panier.

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
