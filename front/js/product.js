// je définis une variable globale
let product = "";

//Gestion du panier
function addToCart(product) {
    const btn_envoyerPanier = document.querySelector("#addToCart");
    const quantityPicked = document.querySelector("#quantity");
    const colorPicked = document. querySelector("#colors");
    //Ecouter le panier avec 2 conditions couleur non nulle et quantité entre 1 et 100
    btn_envoyerPanier.addEventListener("click", (event)=> {
        if (quantityPicked.value > 0 && quantityPicked.value <=100 && quantityPicked.value != 0) {
            //Recupération du choix de la couleur
            let choixCouleur = colorPicked.value;
            //Recupération du choix de la quantité
            let choixQuantite = quantityPicked.value;
            //Récupération des options de product à ajouter au panier
            let optionsProduit = {
                idProduit: product._id,
                couleurProduit: choixCouleur,
                quantiteProduit: Number(choixQuantite),
                nomProduit: product.name,
                //prixProduit: product.price, 
                descriptionProduit: product.description,
                imgProduit: product.imageUrl,
                altImgProduit: product.altTxt
            };
            //Initialisation du local storage
            let productsLocalStorage = JSON.parse(localStorage.getItem("produit"));
            //fenêtre pop-up
            //indique au navigateur d'afficher une boîte de dialogue avec un message optionnel et d'attendre que la personne confirme ou annule la boîte de dialogue.
            //Ces boîtes de dialogue sont des fenêtres modales qui empêchent d'accéder au reste de l'interface utilisateur du programme, à moins que la boîte de dialogue soit fermée. Aussi, il ne faut pas abuser de cette fonction
            const popupConfirmation =() =>{
                if(window.confirm(`Votre commande de ${choixQuantite} ${product.name} ${choixCouleur} est ajoutée au panier
                Pour consulter votre panier, cliquez sur OK`)){
                    window.location.href ="cart.html";
                }
            }
            //Importation dans le local storage
            //Si le panier comporte déjà au moins 1 article
            if (productsLocalStorage) {
            const AllreadyExistingProduct = productsLocalStorage.find(
                (el) => el.idProduit === product._id && el.couleurProduit === choixCouleur);
                //Si le produit commandé est déjà dans le panier
                if (AllreadyExistingProduct) {
                    let newQuantite =
                    parseInt(optionsProduit.quantiteProduit) + parseInt(AllreadyExistingProduct.quantiteProduit);
                    AllreadyExistingProduct.quantiteProduit = newQuantite;
                    localStorage.setItem("produit", JSON.stringify(productsLocalStorage));
                    console.table(productsLocalStorage);
                    popupConfirmation();
                //Si le produit commandé n'est pas dans le panier
                } else {
                    productsLocalStorage.push(optionsProduit);
                    localStorage.setItem("produit", JSON.stringify(productsLocalStorage));
                    console.table(productsLocalStorage);
                    popupConfirmation();
                }
            //Si le panier est vide
            } else {
                productsLocalStorage =[];
                productsLocalStorage.push(optionsProduit);
                localStorage.setItem("produit", JSON.stringify(productsLocalStorage));
                console.table(productsLocalStorage);
                popupConfirmation();
            }
        }
    });
}

//mis en page des produits 
function displayProduct(product) {
    // Insertion de l'image
    let productImg = document.createElement("img");
    document.querySelector(".item__img").appendChild(productImg);//on utilise ici query selector psk l'élément indiqué n'a pas d'id
    productImg.src = product.imageUrl;
    productImg.alt = product.altTxt;

    // Modification du titre "h1"
    let productName = document.getElementById('title');
    productName.innerHTML = product.name;

    // Modification du prix
    let productPrice = document.getElementById('price');
    productPrice.innerHTML = product.price;

    // Modification de la description
    let productDescription = document.getElementById('description');
    productDescription.innerHTML = product.description;

    // Insertion des options de couleurs
    for (let colors of product.colors){//pour chaque élémént de l'itérable, on éxécute le corps de la boucle 
        let productColors = document.createElement("option");//créer un élément option
        document.querySelector("#colors").appendChild(productColors);
        productColors.value = colors;
        productColors.innerHTML = colors;
    }
    addToCart(product);
}

// Récupération des products de l'API
function getProduct(idProduct) {
    fetch("http://localhost:3000/api/products/" + idProduct)
    .then((res) => {
        return res.json();
    })
    // Répartition des données de l'API dans le DOM
    .then(async function (resultatAPI) {
        const product = await resultatAPI;
        if (product) {
            displayProduct(product);
        }
    })
    .catch((error) => {
        console.error("Erreur de la requête API");
    })
}  

// utiliser le domcontentload pour pouvoir executer le code js qui va manipuler le DOM uniquement quand la page est entièrement chargée
window.addEventListener("DOMContentLoaded", e => {

    var str = window.location.href;//va stocker l'url de la page en cours, l'utilisateur peut naviguer vers une autre page, peut revenir à la page précédente
    var url = new URL(str);//créer une url pointant vers ↑
    var idProduct = url.searchParams.get("id");//la méthode get des urlserachparam retourne la 1ère valeur associé au paramètre donné

    getProduct(idProduct);

});

