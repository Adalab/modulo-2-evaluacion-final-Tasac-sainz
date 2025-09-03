'use strict';

console.log('>> Ready :)');

const htmlListProduct = document.querySelector(".product-section_list");
const selectList = document.querySelector(".select-product");
let selectProduct = [];


const buildCard = (product) => {
    const cardProduct = document.createElement ("li")
    cardProduct.classList.add ("card-container");
    const cardImg = document.createElement ("img");
    cardImg.classList.add ("card-image");
    cardImg.src = product.image;
    const cardTitle = document.createElement ("p");
    cardTitle.classList.add ("card-title");
    cardTitle.textContent = product.title;
    const cardPrice = document.createElement ("p");
    cardPrice.classList.add ("card-price");
    cardPrice.textContent = product.price + "€";
    const cardBtn = document.createElement ("button");
    cardBtn.classList.add ("card-button");
    cardBtn.textContent = "Comprar";
                                                      //el evento tiene que estar dentro de buildCard porque es donde existen los elementos que queremos escuchar (la función que crea los elementos de aside está más abajo: renderSelectProduct)
    cardBtn.addEventListener("click", () => {
        const indexSelectProduct = selectProduct.findIndex (select => select.id === product.id)
        if (indexSelectProduct === -1){
            selectProduct.push(product);
            cardBtn.textContent = "Quitar del carrito";
            
        } else {
            selectProduct.splice(indexSelectProduct,1);
            cardBtn.textContent ="Comprar";
        }
        renderSelectProduct();
    });

    cardProduct.appendChild (cardImg);
    cardProduct.appendChild (cardTitle);
    cardProduct.appendChild (cardPrice);
    cardProduct.appendChild (cardBtn);
    
    return cardProduct;
};

const renderProduct = () => {
    fetch ("https://fakestoreapi.com/products")
    .then ((response) => response.json())
    .then ((data) => {
        console.log(data);
        data.forEach (product => {  
            const card = buildCard(product); 
            htmlListProduct.appendChild(card);
        });
    });};
    
const renderSelectProduct = () => {  
    selectList.innerHTML = ""; 
    selectProduct.forEach((product, index) => {
    let li = document.createElement("li");
    li.classList.add("select-card");
    const deleteIcon =document.createElement("button");
    deleteIcon.textContent = "🗑️";
    deleteIcon.classList.add("remove-to-select");
    let selectImg = document.createElement("img");
    selectImg.src = product.image;
    let selectTitle = document.createElement("p");
    selectTitle.textContent = product.title;
    let selectPrice = document.createElement ("p");
    selectPrice.textContent = product.price;
    li.appendChild(deleteIcon);
    li.appendChild(selectImg);
    li.appendChild(selectTitle);
    li.appendChild(selectPrice);
    selectList.appendChild(li);

    deleteIcon.addEventListener ("click", () => {
        const indexSelectProduct = selectProduct.findIndex (select => select.id === product.id);
        selectProduct.splice(indexSelectProduct,1);
        renderSelectProduct();
    })
})};


renderProduct();

    
    
    



