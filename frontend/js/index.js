// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//Récupération des données ours en peluches avec l'API fetch.
//Donné du produit injecté dans une fonction, mise au format html
//Gestion des erreur instruction try/catch
//
// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
fetch("http://localhost:3000/api/teddies")
  .then((response) => response.json())
  .then((response) => {
    //Je créer ma variable que je vais ajouter à mes elements
    let html = "";

    // Boucle pour récupére toutes les variables des produits + (Foreach)
    for (let i = 0; i < response.length; i++) {
      console.log(response[i].name);

      //HTML à injecter
      html += formatHtml(
        response[i].name,
        response[i].imageUrl,
        response[i].description,
        response[i].price,
        response[i]._id
      );
    }

    try {
      fetch("http://localhost:3000/api/teddies").then((response) =>
        response.json()
      );
    } catch (error) {
      checkStatus(response);
    }

    function formatHtml(name, imageUrl, description, price, _id) {
      let myreturn = "";
      myreturn += `<li class="item">
                    <h2 class="item__title">${name}</h2>
                    <div class="item__img"><img src="
                 ${imageUrl}" alt="Images ours"></div>
            <p class="item__description">${description}</p>
            <p class="item__price">${(price / 100)
              .toFixed(2)
              .replace(".", ",")}€</p>
        <a class="item__btn" href="./produit.html?${_id}"<button>Choisir ${name}</button></a>
        </li>`;

      return myreturn;
    }

    document.getElementById("teddy_bear").innerHTML = html;
  });

function checkStatus(response) {
  if (response.status !== 200) throw new Error("Request failed");

  return response.status === 200;
}
