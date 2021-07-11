// Appel ma function du nombre d'article dans mon panier
itemConfirmation();

// function qui affiche le nombre d'articles dans le panier.
function itemConfirmation() {
  div = document.querySelector(".item__number");
  let number = 0;

  if (sessionStorage.getItem("anyItem") !== null) {
    // si le storage est différent de 0
    let keyNumber = JSON.parse(sessionStorage.getItem("anyItem")); //convertir en objet JavaScript getItem convertie en string en ajoutant les données reçus

    keyNumber.forEach((prod) => {
      number = number + prod.quantity; // pour chaque boucle le nombre est égal a 0 + la quantité de produit dans le storage
    });
  }
  div.textContent = number; // on ajoute le nombre à la div
}
