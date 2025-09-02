'use strict';

console.log('>> Ready :)');

const htmlListProduct = document.querySelector(".product-section_list");

const renderProduct = () => {
    fetch ("https://fakestoreapi.com/products")
        .then ((response) => response.json())
        .then ((data) => {
            console.log(data)
    data.forEach (product => {       
    const cardProduct = document.createElement ("li")
    cardProduct.classList.add ("card-container");
    const cardImg = document.createElement ("img");
    cardImg.classList.add ("card-image");
    const cardTitle = document.createElement ("p");
    cardTitle.classList.add ("card-title");
    const cardPrice = document.createElement ("p");
    cardPrice.classList.add ("card-price");
    const cardBtn = document.createElement ("button");
    cardBtn.classList.add ("card-button");
    cardImg.src = product.image;
    cardTitle.textContent = product.title;
    cardPrice.textContent = product.price + "€";
    cardBtn.textContent = "Comprar";
    cardProduct.appendChild (cardImg);
    cardProduct.appendChild (cardTitle);
    cardProduct.appendChild (cardPrice);
    cardProduct.appendChild (cardBtn);
    htmlListProduct.appendChild(cardProduct);
        })})
}
renderProduct()

const selectList = document.querySelector(".select-product")
let selectProduct = [];

const handleClickBuy = () => {
    
}