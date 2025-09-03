'use strict';

console.log('>> Ready :)');

const htmlListProduct = document.querySelector(".product-section_list");
const selectList = document.querySelector(".select-product");
let selectProduct = [];
selectList.textContent = selectProduct;

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

    cardBtn.addEventListener("click", () => {
        selectProduct.push(product);
        console.log("Has añadido al carrito:", product.title);
        renderSelectProduct();
        }
    )

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
    let selectImg = document.createElement("img")
    selectImg.src = product.image;
    let selectTitle = document.createElement("p");
    selectTitle.textContent = product.title;
    let selectPrice = document.createElement ("p");
    selectPrice.textContent = product.price;
    li.appendChild(selectImg);
    li.appendChild(selectTitle);
    li.appendChild(selectPrice);
    selectList.appendChild(li);
})};


renderProduct();
    
    
    



