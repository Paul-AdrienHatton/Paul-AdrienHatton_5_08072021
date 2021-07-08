// Récupération de l'id du produit sélectionné dans la page précédente
const productId = window.location.search.substr(1);

//  Récupération du produit avec l'id associé depuis le serveur

fetch(`http://localhost:3000/api/teddies/${productId}`)
  .then((response) => response.json())
  .then((response) => {
    let html = "";

    // Affichage du produit en html
    html += `<h1 class="row">${response.name}</h1>
        <p class="row"><img src="${
          response.imageUrl
        }" alt="image d'ours en détails" style="width:40%; border-radius:5px;"></p>
        <p class="row">${response.description}</p>
        <p class="row"><b>Prix: ${(response.price / 100)
          .toFixed(2)
          .replace(".", ",")}€</b></p>
        <!-- Personalisation de la couleur -->
        <label for="select__color">
            <h3>Personnaliser votre ours</h3>
        </label>
            <select class="section__choice" name="colors" id="select__color">
            <!-- Mes choix de couleurs dans la function forEach --!>
            </select>
        <button class="addCart"><i class="fas fa-cart-arrow-down"></i>Ajouter au panier</button>`;
    document.getElementById("item__details").innerHTML = html;

    //Création d'une function foreach pour afficher les choix de couleurs
    let choice = document.querySelector(".section__choice");

    response.colors.forEach(function (colors) {
      let option = document.createElement("option");
      option.value = colors;
      option.textContent = colors;
      choice.appendChild(option); //le nœud est d'abord retiré de (section__choice), puis ajouté à la nouvelle position (option)
    });

    //Évènement "click" : lance la fonction d'ajout du produit au panier avec le button .addCart
    let cartBtn = document.querySelector(".addCart");

    cartBtn.addEventListener("click", () => {
      // ajout évènement au clique de cartBtn
      let select = document.querySelector(".section__choice");
      response.selectColors = select.options[select.selectedIndex].value;
      addItemCart(response);
    });
  })
  // Message d'erreur
  .catch((e) => {
    errorMessage();
  });

// Function ajout des articles au panier.
function addItemCart(item) {
  // variable tableaux
  let cartItem = [];

  // stockage dans un objet
  let saveItemCart = {
    _id: item._id,
    imageUrl: item.imageUrl,
    name: item.name,
    price: item.price,
    quantity: 1,
    selectColors: item.selectColors,
  };
  let otherItem = true;
  // Si sessionStorage ne contient pas "anyItem" elle crée un nouveau tableau cartItem et l'enregistre dans le sessionStorage
  if (sessionStorage.getItem("anyItem") === null) {
    //La méthode getItem() de l'interface Storage renvoie la valeur associée à la clé passée en paramètre
    cartItem.push(saveItemCart); //ajoute les éléments à la fin d'un tableau et retourne un nouveau tableau
    sessionStorage.setItem("anyItem", JSON.stringify(cartItem)); // retourne un string qui peut être "store" dans la session, qui se supprime à la fin de chaque session
  }
  // Sinon elle récupère le tableau du sessionStorage, ajoute le nouveau produit, et enregistre le nouveau tableau.
  else {
    cartItem = JSON.parse(sessionStorage.getItem("anyItem")); // récupére les donner json et les transforme en objet javascript

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
