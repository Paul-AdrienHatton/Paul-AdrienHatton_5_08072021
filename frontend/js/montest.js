// ici, je veux :
/**
 * - setter un objet
 * - le stocker dans le local storage
 * - le recuperer depuis le local storage
 * - l'afficher.
 */
let myObject = {
  nom: "Hatton",
  prenom: "Paul-Adrien",
};

sessionStorage.setItem("mon_objet", JSON.stringify(myObject));
sessionStorage.setItem("nom", myObject.nom);
sessionStorage.setItem("prenom", myObject.prenom);

let nom = sessionStorage.getItem("nom")
  ? sessionStorage.getItem("nom")
  : "Le nom n'est pas défini.";
let prenom = sessionStorage.getItem("prenom")
  ? sessionStorage.getItem("prenom")
  : "Le prenom n'est pas défini.";
let retrievedObj = sessionStorage.getItem("mon_objet")
  ? JSON.parse(sessionStorage.getItem("mon_objet"))
  : "L'objet n'est pas défini.";

console.log("nom : " + nom);
console.log("prenom : " + prenom);
console.log("retrievedObj : " + JSON.stringify(retrievedObj));

function exists(key) {
  return sessionStorage.getItem(key) !== null;
}

console.log("existe : " + exists("nom"));
console.log("existe pas : " + exists("bla"));
