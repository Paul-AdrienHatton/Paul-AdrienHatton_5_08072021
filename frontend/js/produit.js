/**
 * Récupération de l'id du produit sélectionné dans la page précédente
 * Récupération du produit avec l'id associé depuis le serveur
 * Donné du produit injecté dans une fonction, mise au format html
 * Gestion des erreur instruction try/catch
 */
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
      myreturn += `<h1 class="item__title">${name}</h1>
        <p class="item__img"><img src="${imageUrl}" alt="image d'ours en détails"></p>
        <p class="item__description">${description}</p>
        <p class="item__price"><b>Prix: ${(price / 100)
          .toFixed(2)
          .replace(".", ",")}€</b></p>
        <!-- Personalisation de la couleur -->
        <label for="select__color">
            <h3 class="item__subtitle">Personnaliser votre ours</h3>
        </label>
            <select class="section__choice" name="colors" id="select__color">
            <!-- Mes choix de couleurs dans la function forEach --!>
            </select>
        <button class="item__btn2"id="addToCart">Ajouter au panier</button>`;
      return myreturn;
    }
    document.getElementById("item__details").innerHTML = html;

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

    /**
     * Choix des couleurs et ajout du produit au panier
     */
    let choice = document.querySelector(".section__choice");
    response.colors.forEach(function (colors) {
      let option = document.createElement("option");
      option.value = colors;
      option.textContent = colors;
      choice.appendChild(option);
    });

    let cartBtn = document.querySelector("#addToCart");
    cartBtn.addEventListener("click", () => {
      // ajout évènement au clique de cartBtn
      let select = document.querySelector(".section__choice");
      response.selectColors = select.options[select.selectedIndex].value;
      if (confirm("Êtes-vous de vouloir ajouter cette article ?")) {
        myCart(response);
      }
    });
  });
