// Récupération des products de l'API
async function getProduct(idProduct) {
    try {
        const APICall = await fetch("http://localhost:3000/api/products/" + idProduct);
        const res = await APICall.json();
        return res;
    } catch(error) {
        console.error("Erreur de la requête API");
    }
}

// Si le panier est vide
function getCart(productsLocalStorage, positionEmptyCart) {
    if (productsLocalStorage === null || productsLocalStorage == 0) {
        const emptyCart = `<p>Votre panier est vide</p>`;
        positionEmptyCart.innerHTML = emptyCart;
    } else {
        for (let produit in productsLocalStorage) {
            // Insertion de l'élément "article"
            let productArticle = document.createElement("article");
            document.querySelector("#cart__items").appendChild(productArticle);
            productArticle.className = "cart__item";
            productArticle.setAttribute('data-id', productsLocalStorage[produit].idProduit);

            // Insertion de l'élément "div"
            let productDivImg = document.createElement("div");
            productArticle.appendChild(productDivImg);
            productDivImg.className = "cart__item__img";

            // Insertion de l'image
            let productImg = document.createElement("img");
            productDivImg.appendChild(productImg);
            productImg.src = productsLocalStorage[produit].imgProduit;
            productImg.alt = productsLocalStorage[produit].altImgProduit;
            
            // Insertion de l'élément "div"
            let productItemContent = document.createElement("div");
            productArticle.appendChild(productItemContent);
            productItemContent.className = "cart__item__content";

            // Insertion de l'élément "div"
            let productItemContentTitlePrice = document.createElement("div");
            productItemContent.appendChild(productItemContentTitlePrice);
            productItemContentTitlePrice.className = "cart__item__content__titlePrice";
            
            // Insertion du titre h3
            let productTitle = document.createElement("h2");
            productItemContentTitlePrice.appendChild(productTitle);
            productTitle.innerHTML = productsLocalStorage[produit].nomProduit;

            // Insertion de la couleur
            let productColor = document.createElement("p");
            productTitle.appendChild(productColor);
            productColor.innerHTML = productsLocalStorage[produit].couleurProduit;
            productColor.style.fontSize = "20px";

            // Insertion du prix
            let productPrice = document.createElement("p");
            productItemContentTitlePrice.appendChild(productPrice);
            productPrice.innerHTML = productsLocalStorage[produit].price + "€";

            // Insertion de l'élément "div"
            let productItemContentSettings = document.createElement("div");
            productItemContent.appendChild(productItemContentSettings);
            productItemContentSettings.className = "cart__item__content__settings";

            // Insertion de l'élément "div"
            let productItemContentSettingsQuantity = document.createElement("div");
            productItemContentSettings.appendChild(productItemContentSettingsQuantity);
            productItemContentSettingsQuantity.className = "cart__item__content__settings__quantity";
            
            // Insertion de "Qté : "
            let productQte = document.createElement("p");
            productItemContentSettingsQuantity.appendChild(productQte);
            productQte.innerHTML = "Qté : ";

            // Insertion de la quantité
            let productQuantity = document.createElement("input");
            productItemContentSettingsQuantity.appendChild(productQuantity);
            productQuantity.value = productsLocalStorage[produit].quantiteProduit;
            productQuantity.className = "itemQuantity";
            productQuantity.setAttribute("type", "number");
            productQuantity.setAttribute("min", "1");
            productQuantity.setAttribute("max", "100");
            productQuantity.setAttribute("name", "itemQuantity");

            // Insertion de l'élément "div"
            let productItemContentSettingsDelete = document.createElement("div");
            productItemContentSettings.appendChild(productItemContentSettingsDelete);
            productItemContentSettingsDelete.className = "cart__item__content__settings__delete";

            // Insertion de "p" supprimer
            let productSupprimer = document.createElement("p");
            productItemContentSettingsDelete.appendChild(productSupprimer);
            productSupprimer.className = "deleteItem";
            productSupprimer.innerHTML = "Supprimer";
        }
    }
}

function getTotals(productsLocalStorage){

    // récupération de tous les éléments affichant les quantités dans le DOM
    const elemsQtt = document.getElementsByClassName('itemQuantity');
    const cartLength = elemsQtt.length; // longueur du tableau récupéré précédemment
    let totalQtt = 0; // initialisation de la quantité totale à 0

    // cette boucle permet de calculer la quantité totale de tous les produits présents dans le panier
    for (var i = 0; i < cartLength; ++i) {
        totalQtt += elemsQtt[i].valueAsNumber;
    }

    // on récupère dans le DOM l'élément affichant la quantité totale et on met à jour cet affichage
    const productTotalQuantity = document.getElementById('totalQuantity');
    productTotalQuantity.innerHTML = totalQtt;

    let totalPrice = 0; // On initialise le prix total à 0

    // cette boucle permet de calculer le prix total de tous les produits présents dans le panier 
    for (var i = 0; i < cartLength; ++i) {
        // pour chaque tour de boucle on ajoutera a totalprice quantity du produit x le prix du produit depuis le localstorage
        totalPrice += (elemsQtt[i].valueAsNumber * productsLocalStorage[i].price);
    }

    let productTotalPrice = document.getElementById('totalPrice');
    productTotalPrice.innerHTML = totalPrice;
}

// Modification d'une quantité de produit
function modifyQtt(productsLocalStorage) {
    let qttModif = document.querySelectorAll(".itemQuantity");
    for (let k = 0; k < qttModif.length; k++) {
        qttModif[k].addEventListener("change" , (event) => {//l'événement change est déclenché pour les éléments input , select, et textarea
            event.preventDefault();//si l'événement n'est pas géré, l'action par défaut ne devrait pas etre éxécuté normalement
            //Selection de l'element à modifier en fonction de son id ET sa couleur
            let quantityModif = productsLocalStorage[k].quantiteProduit;
            let qttModifValue = qttModif[k].valueAsNumber;
            const alreadyExistingProduct  = productsLocalStorage.find((el) => el.qttModifValue !== quantityModif);
            alreadyExistingProduct .quantiteProduit = qttModifValue;
            productsLocalStorage[k].quantiteProduit = alreadyExistingProduct.quantiteProduit;
            localStorage.setItem("produit", JSON.stringify(productsLocalStorage));
        })
    }
}

// Suppression d'un produit
function deleteProduct(productsLocalStorage) {
    let btn_supprimer = document.querySelectorAll(".deleteItem");
    for (let j = 0; j < btn_supprimer.length; j++){
        btn_supprimer[j].addEventListener("click" , (event) => { //réagit à un clic de souris sur un élément
            event.preventDefault();//si l'événement n'est pas géré, l'action par défaut ne devrait pas etre éxécuté normalement
            //Selection de l'element à supprimer en fonction de son id ET sa couleur
            let idDelete = productsLocalStorage[j].idProduit;
            let colorDelete = productsLocalStorage[j].couleurProduit;
            productsLocalStorage = productsLocalStorage.filter( el => el.idProduit !== idDelete || el.couleurProduit !== colorDelete );
            localStorage.setItem("produit", JSON.stringify(productsLocalStorage));
            // Alerte produit supprimé et refresh
            alert("Ce produit a bien été supprimé du panier");
            // sélectionner la carte produit correspondant à `idDelete` et le retirer du DOM
            document.querySelector(`[data-id="${idDelete}"]`).remove();
        })
    }
}

//ajout des regex
let form = document.querySelector(".cart__order__form");
//création des expressions régulières à voir sur google
let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
let charRegExp = new RegExp("^[a-zA-Z ,.'-]+$"); //string expressions
//d'après ce que j'ai compris: caractère de a à z en minuscule et A à Z en majuscule et chiffre de 0 à 9 + le arobase @ {1 répétition}
let addressRegExp = new RegExp("^([0-9]|[-a-zA-Zàâäéèêëïîôöùûüç']|\s)+");
//question? comment va t-on faire pour une adresse postale américaine par exemple ? 
//l'expression restera la même ou va t-elle changer ?
//regex pour numéro de téléphone francais ^(\+33|0)[1-9]{1}([0-9][0-9]){4}$

//validation du prénom
const validFirstName = (inputFirstName) => {
    let firstNameErrorMsg = inputFirstName.nextElementSibling;//refers to next elemeent
    if (charRegExp.test(inputFirstName.value)) {
        firstNameErrorMsg.innerHTML = '';
        return true;
    } else {
        firstNameErrorMsg.innerHTML = 'veuillez renseigner ce champ.';
        return false;
    }
};
//validation du nom
const validLastName = (inputLastName) => {
    let lastNameErrorMsg = inputLastName.nextElementSibling;
    if (charRegExp.test(inputLastName.value)) {
        lastNameErrorMsg.innerHTML = '';
        return true;
    } else {
        lastNameErrorMsg.innerHTML = 'veuillez renseigner ce champ.';
        return false;
    }
};
//validation de l'adresse 
const validAddress = (inputAddress) => {
    let addressErrorMsg = inputAddress.nextElementSibling;
    if (addressRegExp.test(inputAddress.value)) {
        addressErrorMsg.innerHTML = '';
        return true;
    } else {
        addressErrorMsg.innerHTML = 'veuillez renseigner votre adresse.';
        return false;
    }
};
//valdidation de la ville
const validCity = (inputCity) => {
    let cityErrorMsg = inputCity.nextElementSibling;
    if (charRegExp.test(inputCity.value)) {
        cityErrorMsg.innerHTML = '';
        return true;
    } else {
        cityErrorMsg.innerHTML = 'veuillez renseigner ce champ.';
        return false;
    }
};
//validation du mail
const validEmail = (inputEmail) => {
    let emailErrorMsg = inputEmail.nextElementSibling;
    if (emailRegExp.test(inputEmail.value)) {
        emailErrorMsg.innerHTML = '';
        return true;
    } else {
        emailErrorMsg.innerHTML = 'veuillez renseigner votre email.';
        return false;
    }
};

// un objet regEx est utilisé pour étudier les correspondances d'un texte avec un motif donné
//les expressions régulières ne sont pas un élément du langage js mais constitue en fait un autre langage en soi
//Il peut arriver un moment où on a un document rempli de diverses données, éventuellement un qui contient des informations sur une longue liste de personnes, mais on a besoin que des adresses. C'est là que RegEx est utile. on peux utiliser RegEx pour parcourir les caractères du document et localiser une chaîne qui correspond au modèle qu'on spécifie
//instauration formulaire avec regex
const getForm = () => {
    //écoute de la modification du prénom
    form.firstName.addEventListener('change', function(){
        validFirstName(this);
    });
    form.lastName.addEventListener('change', function(){
        validLastName(this);
    });
    form.address.addEventListener('change', function(){
        validAddress(this);
    });
    form.city.addEventListener('change', function(){
        validCity(this);
    });
    form.email.addEventListener('change', function(){
        validEmail(this);
    });
}

//Envoi des informations client au localstorage
function postForm(productsLocalStorage){
    const btn_commander = document.getElementById("order");

    //Ecouter le panier
    btn_commander.addEventListener("click", (event)=>{
    
        //Récupération des coordonnées du formulaire client
        let inputName = document.getElementById('firstName');
        let inputLastName = document.getElementById('lastName');
        let inputAdress = document.getElementById('address');
        let inputCity = document.getElementById('city');
        let inputMail = document.getElementById('email');

        if (
            validFirstName(inputName) 
            && validLastName(inputLastName) 
            && validAddress(inputAdress) 
            && validCity(inputCity) 
            && validEmail(inputMail)
        ) {
            //Construction d'un array depuis le local storage
            let idProducts = [];
            for (let i = 0; i<productsLocalStorage.length;i++) {
                idProducts.push(productsLocalStorage[i].idProduit);
            }

            const order = {
                contact : {
                    firstName: inputName.value,
                    lastName: inputLastName.value,
                    address: inputAdress.value,
                    city: inputCity.value,
                    email: inputMail.value,
                },
                products: idProducts,
            } 

            const options = {
                method: 'POST',
                body: JSON.stringify(order),
                headers: {
                    'Accept': 'application/json', 
                    "Content-Type": "application/json" 
                },
            };

            fetch("http://localhost:3000/api/products/order", options)
                .then((response) => response.json())
                .then((data) => {
                    localStorage.clear();
                    localStorage.setItem("orderId", data.orderId);
                    document.location.href = "confirmation.html";
                })
                .catch((err) => {
                    alert ("Problème avec fetch : " + err.message);
                });            
        }
    })
}

window.addEventListener("DOMContentLoaded", async e => {

    // Récupération des products de l'API
    let productsLocalStorage = JSON.parse(localStorage.getItem("produit"));

    const positionEmptyCart = document.querySelector("#cart__items");

    for(let i = 0; i < productsLocalStorage.length; i++) {
        const idProduit = productsLocalStorage[i].idProduit;
        const productFromApi = await getProduct(idProduit);
        const productPrice = productFromApi.price;
        productsLocalStorage[i].price = productPrice;
    }
    
    // affichage du panier
    getCart(productsLocalStorage, positionEmptyCart);
    // affichage des totaux
    getTotals(productsLocalStorage);
    // on enregistre les events listeners de notre page
    // modification des quantités (event listener)
    modifyQtt(productsLocalStorage);
    // suppression des produits (event listener)
    deleteProduct(productsLocalStorage);
    // event listener du formulaire
    getForm();
    postForm(productsLocalStorage);

});
