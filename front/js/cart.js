// TODO afficher une seule carte de produit pour un produit qui a plusieurs items (en affichant la bonne quantité)
// TODO pouvoir supprimer un produit affiché (donc suppression aussi dans le local storage)
// TODO pouvoir modifier la quantité d'un produit affiché (donc modification aussi dans le local storage)

//Initialisation du local storage
let productsLocalStorage = JSON.parse(localStorage.getItem("produit"));
console.table(productsLocalStorage);
const positionEmptyCart = document.querySelector("#cart__items");

// Si le panier est vide
function getCart(){
    if (productsLocalStorage === null || productsLocalStorage == 0) {
        const emptyCart = `<p>Votre panier est vide</p>`;
        positionEmptyCart.innerHTML = emptyCart;
        } else {
        for (let produit in productsLocalStorage){
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
getCart();

function getTotals(){

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
getTotals();

// Modification d'une quantité de produit
function modifyQtt() {
    let qttModif = document.querySelectorAll(".itemQuantity");

    for (let k = 0; k < qttModif.length; k++){
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
modifyQtt();

// Suppression d'un produit
function deleteProduct() {
    let btn_supprimer = document.querySelectorAll(".deleteItem");

    for (let j = 0; j < btn_supprimer.length; j++){
        btn_supprimer[j].addEventListener("click" , (event) => {//simule un clic de souris sur un élément
            event.preventDefault();//si l'événement n'est pas géré, l'action par défaut ne devrait pas etre éxécuté normalement

            //Selection de l'element à supprimer en fonction de son id ET sa couleur
            let idDelete = productsLocalStorage[j].idProduit;
            let colorDelete = productsLocalStorage[j].couleurProduit;

            productsLocalStorage = productsLocalStorage.filter( el => el.idProduit !== idDelete || el.couleurProduit !== colorDelete );
            
            localStorage.setItem("produit", JSON.stringify(productsLocalStorage));

            //Alerte produit supprimé et refresh
            alert("Ce produit a bien été supprimé du panier");
        })
    }
}
deleteProduct();