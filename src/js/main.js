'use strict';

console.log('>> Ready :)');

const htmlListProduct = document.querySelector(".product-section_list");
const selectList = document.querySelector(".select-product");
let initialProducts = [];
let selectProducts = [];


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

    const isSelected = selectProducts.find(select => select.id === product.id )

    const cardBtn = document.createElement ("button");
    cardBtn.classList.add ("card-button");
    cardBtn.textContent = isSelected ? "Quitar del carrito" : "Comprar";
    isSelected ? cardBtn.classList.add("delete-button-card") : "";
    cardBtn.dataset.id = product.id;    //para guardar el id del producto asociado a cada botón y usarlo con el botón de papelera
    //el evento tiene que estar dentro de buildCard porque es donde existen los elementos que queremos escuchar (la función que crea los elementos de aside está más abajo: renderSelectProduct)
    cardBtn.addEventListener("click", () => {
        const indexSelectProduct = selectProducts.findIndex (select => select.id === product.id)
        if (indexSelectProduct === -1){       
            selectProducts.push(product);
            
        } else {
            selectProducts.splice(indexSelectProduct,1);
        }
        renderSelectProduct();
        renderProducts(initialProducts);
        });

    cardProduct.appendChild (cardImg);
    cardProduct.appendChild (cardTitle);
    cardProduct.appendChild (cardPrice);
    cardProduct.appendChild (cardBtn);
    
    return cardProduct;
};

const renderProducts= (products) => {
        htmlListProduct.innerHTML="";
        products.forEach (product => {  
            const card = buildCard(product); 
            htmlListProduct.appendChild(card);
            
        });
    }


const loadProduct = () => {
    fetch ("https://fakestoreapi.com/products")
    .then ((response) => response.json())
    .then ((data) => {
        initialProducts = data;
        renderProducts(data);
    })};


    
const renderSelectProduct = () => {  
    selectList.innerHTML = ""; 
    
    selectProducts.forEach((product) => {
    
    let li = document.createElement("li");
    li.classList.add("select-card");
    
    let selectImg = document.createElement("img");
    selectImg.src = product.image;
    
    let selectTitle = document.createElement("p");
    selectTitle.textContent = product.title;
    
    let selectPrice = document.createElement ("p");
    selectPrice.textContent = product.price;
    
    const deleteIcon =document.createElement("button");
    deleteIcon.classList.add("remove-to-select");
    deleteIcon.title = "Eliminar";   
    const deleteImg = document.createElement("img");
    deleteImg.src = "../images/recycle-bin.png"
    deleteImg.classList.add("delete-icon-img");
    deleteIcon.appendChild(deleteImg);
    deleteIcon.title = "Eliminar del carrito";
    deleteIcon.classList.add("remove-to-select");

    li.appendChild(deleteIcon);
    li.appendChild(selectImg);
    li.appendChild(selectTitle);
    li.appendChild(selectPrice);
    selectList.appendChild(li);

    deleteIcon.addEventListener ("click", () => {
        const indexSelectProduct = selectProducts.findIndex (select => select.id === product.id);
        selectProducts.splice(indexSelectProduct,1);
        const button = document.querySelector(`.card-button[data-id="${product.id}"]`);
        if (button) {
         button.textContent = "Comprar";
         button.classList.remove("delete-button-card");
        }    
        
        renderSelectProduct();
    })
})};

loadProduct();


const findBtn = document.querySelector (".form-section_search-btn");
const findInput = document.querySelector(".form-section_search-input");
const notAvailable = document.querySelector(".not-available");

const handleClickFind = (event) => {
    event.preventDefault();
    console.log("click")
    const findText = findInput.value.toLowerCase();
    const findProduct = initialProducts.filter(product => product.title.toLowerCase().includes(findText));
    htmlListProduct.innerHTML="";
    if (findProduct.length === 0) {
        notAvailable.innerHTML = "Producto no disponible";
        
    } else {
        findProduct.forEach(product => {
            const card = buildCard(product);
            htmlListProduct.appendChild(card);
        });
    }
}
    
findBtn.addEventListener ("click", handleClickFind);
    
    



