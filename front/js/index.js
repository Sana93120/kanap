window.addEventListener('DOMContentLoaded', async (event) => {

   fillSection(); // défini une fonction async qu'on va appliquer a la ligne 12

    // Récupération des articles de l'API
    async function getArticles() {//on va créer une fonction asynchrone
        var articlesCatch = await fetch("http://localhost:3000/api/products") //on attend la résolution de la promise
        return await articlesCatch.json();//retourne la promise
    } 

    // Répartition des données de l'API 
    async function fillSection() {
        var result = await getArticles ()//on créer une var result et on attend la résolutuon de la promise 
        .then(function (resultatAPI){ //la méthode "then" permet de spécifier la ou les fonctions à utiliser comme rappels callbacks
            const articles = resultatAPI;
            console.table(articles);//affiche les données sous forme de tableau
            for (let article in articles) {//on a créer une boucle, qui va itérer chaque produit

                // Insertion de l'élément "a"
                let productLink = document.createElement("a");//va créer un élément "a"
                productLink.setAttribute("href", "http://127.0.0.1:5500/front/html/product.html?id=" + resultatAPI[article]._id)
                //http://www.exemple.com/recherche.php?nom=toto&age=15&ville=paris
                document.querySelector(".items").appendChild(productLink);//query selector va retourner le 1er élément qui correspond au sélecteur, et o va ajouter u noeud a la fin de la liste des éléments enfants

                // Insertion de l'élément "article"
                let productArticle = document.createElement("article");
                productLink.appendChild(productArticle);

                // Insertion de l'image
                let productImg = document.createElement("img");
                productArticle.appendChild(productImg);
                productImg.src = resultatAPI[article].imageUrl;//ajout élémént src
                productImg.alt = resultatAPI[article].altTxt;//et alt

                // Insertion du titre "h3"
                let productName = document.createElement("h3");//pareil
                productArticle.appendChild(productName);
                productName.innerHTML = resultatAPI[article].name;//récupère la syntaxe html des desendant de l'élément

                // Insertion de la description "p"
                let productDescription = document.createElement("p");
                productArticle.appendChild(productDescription);
                productDescription.innerHTML = resultatAPI[article].description;//pareil-
            }
        })
        .catch (function(error){ //si la promise est rejeté, ca va retourner une erreur (pas dans la console)
            return error;
        });
    }

});