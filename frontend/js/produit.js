// Récupération de l'id du produit sélectionné dans la page précédente
const productId = window.location.search.substr(1);

//  Récupération du produit avec l'id associé depuis le serveur

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
        <button class="addCart"><i class="fas fa-cart-arrow-down"></i>Ajouter au panier</button>`;

      return myreturn;
    }
    document.getElementById("item_details").innerHTML = html;

    //Création d'une function foreach pour afficher les choix de couleurs
    let choice = document.querySelector(".section__choice");

    response.colors.forEach(function (colors) {
      let option = document.createElement("option");
      option.value = colors;
      option.textContent = colors;
      choice.appendChild(option); //le nœud est d'abord retiré de (section__choice), puis ajouté à la nouvelle position (option)
    });
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
