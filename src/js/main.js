'use strict';

console.log('>> Ready :)');

const htmlListProduct = document.querySelector(".product-section_list");
const selectList = document.querySelector(".select-product");
let initialProducts = JSON.parse(localStorage.getItem("initialProducts")) || [];
let selectProducts = JSON.parse(localStorage.getItem("selectedProducts")) || [];



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
            selectProducts.push({...product, units: 1});  /* los ... es spreadoperator y sirve para que copie todas las propiedades más unit que es la que añadimos en el corchete */
        } else {
            selectProducts.splice(indexSelectProduct,1);
        };
        renderSelectProduct();
        renderProducts(initialProducts);
        totalCalculate();
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
    if (initialProducts.length === 0) {
        fetch ("https://fakestoreapi.com/products")
            .then ((response) => response.json())
            .then ((data) => {
        initialProducts = data;
        localStorage.setItem ("initialProducts", JSON.stringify(initialProducts));
        renderProducts(initialProducts);
        })
    } else {
        renderProducts(initialProducts);
    };
    if (selectProducts) {
        renderSelectProduct()
    };
};



const renderSelectProduct = () => {  
    selectList.innerHTML="";
    localStorage.setItem("selectedProducts", JSON.stringify(selectProducts)); 
    
    selectProducts.forEach((product) => {
        
    let li = document.createElement("li");
    li.classList.add("select-card");
        
    let selectImg = document.createElement("img");
    selectImg.src = product.image;
    
    let selectTitle = document.createElement("p");
    selectTitle.textContent = product.title;
    
    let selectPrice = document.createElement ("p");
    selectPrice.textContent = product.price + " €";
    
    const deleteIcon =document.createElement("button");
    deleteIcon.classList.add("remove-to-select");
    deleteIcon.title = "Eliminar";   
    const deleteImg = document.createElement("img");
    deleteImg.src = "../public/images/recycle-bin.png"
    deleteImg.classList.add("delete-icon-img");
    deleteIcon.appendChild(deleteImg);
    deleteIcon.title = "Eliminar del carrito";
    deleteIcon.classList.add("remove-to-select");
    
    
    const countCard = document.createElement ("div");
    countCard.classList.add("counter-container")
    const countPlus = document.createElement ("button");
    countPlus.classList.add ("count-button");
    countPlus.textContent = "+";
    let countNumber = document.createElement("p");
    countNumber.textContent = product.units;
    const countLess = document.createElement("button");
    countLess.classList.add ("count-button");
    countLess.textContent = "-";
  
    countCard.appendChild(countLess);
    countCard.appendChild(countNumber);
    countCard.appendChild(countPlus);


    li.appendChild(deleteIcon);
    li.appendChild(selectImg);
    li.appendChild(selectTitle);
    li.appendChild(selectPrice);
    li.appendChild(countCard);
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
        totalCalculate();
    });

    countPlus.addEventListener ("click", () => {
        const indexSelectProduct = selectProducts.findIndex (select => select.id === product.id);
        selectProducts[indexSelectProduct].units ++;
        renderSelectProduct();
        totalCalculate();
            
    });

    countLess.addEventListener ("click", () =>{
        const indexSelectProduct = selectProducts.findIndex (select => select.id === product.id);
        if (selectProducts[indexSelectProduct].units > 1) {
            selectProducts[indexSelectProduct].units --;}
            renderSelectProduct();
            totalCalculate()
        });
    })
};

const totalCalculate = () => {
    const sumPrice = selectProducts.reduce((acc,product) => acc + product.price * product.units, 0)
    const containerTotal = document.querySelector(".total");
    containerTotal.innerHTML="";
    const amountCard = document.createElement ("div");
    amountCard.classList.add ("total-container");
    const totalAmount = document.createElement ("p");
    totalAmount.innerHTML = "Total carrito = " + sumPrice.toFixed(2) + " €";
    amountCard.appendChild (totalAmount);
    containerTotal.appendChild(amountCard);
};

totalCalculate();
loadProduct();

const deleteAllSelected = document.querySelector(".delete-all-select-prod");
deleteAllSelected.addEventListener ("click", (event) => {
    event.preventDefault();
    if (!confirm("¿Seguro que quieres eliminar todos los productos del carrito?")) return;
    selectProducts.length = 0;
    renderSelectProduct();
    renderProducts(initialProducts);
    totalCalculate();
});



const findBtn = document.querySelector (".form-section_search-btn");
const findInput = document.querySelector(".form-section_search-input");
const notAvailable = document.querySelector(".not-available");

const handleClickFind = (event) => {
    event.preventDefault();
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

const showCart = document.querySelector(".button-cart");
const cart = document.querySelector (".aside");
showCart.addEventListener("click", () => {
    cart.classList.toggle("aside-visible");
})
    
    



