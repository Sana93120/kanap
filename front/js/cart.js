let productsLocalStorage = JSON.parse(localStorage.getItem("produit"));
    console.table(productsLocalStorage);
    const positionEmptyCart = document.querySelector("#cart__items");

// Si le panier est vide
function getCart(/**productsLocalStorage, positionEmptyCart*/){
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
            productPrice.innerHTML = productsLocalStorage[produit].prixProduit + " €";

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

function getTotals(/**productsLocalStorage*/) {
    // Récupération du total des quantités
    var elemsQtt = document.getElementsByClassName('itemQuantity');
    var myLength = elemsQtt.length,//la propriété lenght indique le nombre d'élément présent dans le tableau (number)
    totalQtt = 0;
    for (var i = 0; i < myLength; ++i) {
        //L'instruction for qui suit débute en déclarant la variable i et en l'initialisant à 0. Elle vérifie que i est inférieur (strictement) à mylenght et exécute ensuite les instructions contenues dans la boucle, ensuite elle incrémente i de 1, ce qui sera fait à chaque passage dans la boucle
        totalQtt += elemsQtt[i].valueAsNumber;//affectation après addition (va calculer la concaténation de ses deux opérateurs)
    }
    let productTotalQuantity = document.getElementById('totalQuantity');
    productTotalQuantity.innerHTML = totalQtt;
    console.log(totalQtt);
    // Récupération du prix total
    totalPrice = 0;
    for (var i = 0; i < myLength; ++i) {
        totalPrice += (elemsQtt[i].valueAsNumber * productsLocalStorage[i].prixProduit);
    }
    let productTotalPrice = document.getElementById('totalPrice');
    productTotalPrice.innerHTML = totalPrice;
    console.log(totalPrice);
}

// Modification d'une quantité de produit
function modifyQtt(/**productsLocalStorage*/) {
    let qttModif = document.querySelectorAll(".itemQuantity");
    for (let k = 0; k < qttModif.length; k++) {
        qttModif[k].addEventListener("change" , (event) => {//l'événement change est déclenché pour les éléments input , select, et textarea
            event.preventDefault();//si l'événement n'est pas géré, l'action par défaut ne devrait pas etre éxécuté normalement
            //Selection de l'element à modifier en fonction de son id ET sa couleur
            let quantityModif = productsLocalStorage[k].quantiteProduit;
            let qttModifValue = qttModif[k].valueAsNumber;
            const AllreadyExistingProduct  = productsLocalStorage.find((el) => el.qttModifValue !== quantityModif);
            AllreadyExistingProduct .quantiteProduit = qttModifValue;
            productsLocalStorage[k].quantiteProduit = AllreadyExistingProduct.quantiteProduit;
            localStorage.setItem("produit", JSON.stringify(productsLocalStorage));
        })
    }
}

// Suppression d'un produit
function deleteProduct(/**productsLocalStorage*/) {
    let btn_supprimer = document.querySelectorAll(".deleteItem");
    for (let j = 0; j < btn_supprimer.length; j++){
        btn_supprimer[j].addEventListener("click" , (event) => { //réagit à un clic de souris sur un élément
            event.preventDefault();//si l'événement n'est pas géré, l'action par défaut ne devrait pas etre éxécuté normalement
            //Selection de l'element à supprimer en fonction de son id ET sa couleur
            let idDelete = productsLocalStorage[j].idProduit;
            let colorDelete = productsLocalStorage[j].couleurProduit;
            productsLocalStorage = productsLocalStorage.filter( el => el.idProduit !== idDelete || el.couleurProduit !== colorDelete );
            localStorage.setItem("produit", JSON.stringify(productsLocalStorage));
            // TODO remove the deleted product from the DOM (so it is not displayed to the user anymore)
            //Alerte produit supprimé et refresh
            alert("Ce produit a bien été supprimé du panier");
        })
    }
}

// un objet regEx est utilisé pour étudier les correspondances d'un texte avec un motif donné
//les expressions régulières ne sont pas un élément du langage js mais constitue en fait un autre langage en soi
//Il peut arriver un moment où on a un document rempli de diverses données, éventuellement un qui contient des informations sur une longue liste de personnes, mais on a besoin que des adresses. C'est là que RegEx est utile. on peux utiliser RegEx pour parcourir les caractères du document et localiser une chaîne qui correspond au modèle qu'on spécifie
//instauration formulaire avec regex
function getForm() {
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
    const validFirstName = function(inputFirstName) {
        let firstNameErrorMsg = inputFirstName.nextElementSibling;//refers to next elemeent
        if (charRegExp.test(inputFirstName.value)) {
            firstNameErrorMsg.innerHTML = '';
        } else {
            firstNameErrorMsg.innerHTML = 'veuillez renseigner ce champ.';
        }
    };
    //validation du nom
    const validLastName = function(inputLastName) {
        let lastNameErrorMsg = inputLastName.nextElementSibling;

        if (charRegExp.test(inputLastName.value)) {
            lastNameErrorMsg.innerHTML = '';
        } else {
            lastNameErrorMsg.innerHTML = 'veuillez renseigner ce champ.';
        }
    };
    //validation de l'adresse 
    const validAddress = function(inputAddress) {
        let addressErrorMsg = inputAddress.nextElementSibling;
        if (addressRegExp.test(inputAddress.value)) {
            addressErrorMsg.innerHTML = '';
        } else {
            addressErrorMsg.innerHTML = 'veuillez renseigner votre adresse.';
        }
    };
    //valdidation de la ville
    const validCity = function(inputCity) {
        let cityErrorMsg = inputCity.nextElementSibling;

        if (charRegExp.test(inputCity.value)) {
            cityErrorMsg.innerHTML = '';
        } else {
            cityErrorMsg.innerHTML = 'veuillez renseigner ce champ.';
        }
    };
    //validation du mail
    const validEmail = function(inputEmail) {
        let emailErrorMsg = inputEmail.nextElementSibling;

        if (emailRegExp.test(inputEmail.value)) {
            emailErrorMsg.innerHTML = '';
        } else {
            emailErrorMsg.innerHTML = 'veuillez renseigner votre email.';
        }
    };

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
getForm();

//Envoi des informations client au localstorage
function postForm(){
    const btn_commander = document.getElementById("order");

    //Ecouter le panier
    btn_commander.addEventListener("click", (event)=>{
    
        //Récupération des coordonnées du formulaire client
        let inputName = document.getElementById('firstName');
        let inputLastName = document.getElementById('lastName');
        let inputAdress = document.getElementById('address');
        let inputCity = document.getElementById('city');
        let inputMail = document.getElementById('email');

        //Construction d'un array depuis le local storage
        let idProducts = [];
        for (let i = 0; i<productsLocalStorage.length;i++) {
            idProducts.push(productsLocalStorage[i].idProduit);
        }
        console.log(idProducts);

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
                console.log(data);
                localStorage.clear();
                localStorage.setItem("orderId", data.orderId);
                document.location.href = "confirmation.html";
            })
            .catch((err) => {
                alert ("Problème avec fetch : " + err.message);
            });
    })
}
postForm();

// TODO separate code that interacts with the DOM with the one that simply defines function
// TODO also in product.js
window.addEventListener("DOMContentLoaded", e => {

    let productsLocalStorage = JSON.parse(localStorage.getItem("produit"));
    console.table(productsLocalStorage);
    const positionEmptyCart = document.querySelector("#cart__items");
    
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
});