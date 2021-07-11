// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// Affichage du nombre d'article dans mon panier
// Je choisis l'emplacement du nombre
// Je met le nombre d'article dans une variable de base à 0
// Je regarde si mon panier contient un produit
//  - Si oui le total reste à 0
//  - Si non je regarde chaque produit du panier et j'ajoute la quantité du produit
//    pour chaque produit j'ajoute sa quantitée à ma variable qui est de base à 0
// J'ajoute le résultat à l'emplacement choisi pour le nombre
// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
howManyArticles();
// function qui affiche le nombre d'articles dans le panier.
function howManyArticles() {
  showNumber = document.querySelector(".product__number");
  let number = 0;

  if (sessionStorage.getItem("cart") !== null) {
    // si le storage est différent de 0
    let keyNumber = JSON.parse(sessionStorage.getItem("cart")); //convertir en objet JavaScript getItem convertie en string en ajoutant les données reçus

    keyNumber.forEach((prod) => {
      number = number + prod.quantity; // pour chaque boucle le nombre est égal a 0 + la quantité de produit dans le storage
    });
  }
  showNumber.textContent = number; // on ajoute le nombre à la div
}
