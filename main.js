let row = document.getElementById('rowForFilter');
let checkboxNuts = document.getElementById('nuts');
let checkboxVeg = document.getElementById('vegetarian');
let cardPlace = document.getElementById('card-area')
let scrollButton = document.getElementById('scrollButton');
let targetSection = document.getElementById('targetSection');
let cartItemNumber = document.getElementById('cartItemNumber')


let sliderValue = -1;
let filteredId = 0;
let allproducts;





const slider = document.getElementById('slider');
const sliderValueDisplay = document.getElementById('sliderValue');


slider.addEventListener('input', function() {
    sliderValue = slider.value; 
    sliderValueDisplay.textContent = sliderValue; 
    if(sliderValue == -1){
        sliderValueDisplay.textContent = 'not chosen'
    }
});


fetch('https://restaurant.stepprojects.ge/api/Categories/GetAll')
    .then(response => response.json())
    .then(categories => {
        categories.forEach(element => {
            row.innerHTML += `<div class="filterting" onclick="selectCategory(${element.id})">${element.name}</div>`;
            
        });
    })
    .catch(error => {
        console.error("Error fetching categories:", error);
    });



fetch('https://restaurant.stepprojects.ge/api/Products/GetAll')
    .then(response => response.json())
    .then(products => {
       allproducts = products
       createCards(products)
    })
    .catch(error => {
        console.error("Error fetching categories:", error);
    });




function selectCategory(appliedID){
    fetch(`https://restaurant.stepprojects.ge/api/Categories/GetCategory/${appliedID}`)
    .then(object => object.json())
    .then(data => {
        createCards(data.products) 
    })
    filteredId = appliedID
}

function applyFilters(){
    if(filteredId != 0){
    fetch(`https://restaurant.stepprojects.ge/api/Products/GetFiltered?vegeterian=${checkboxVeg.checked}&nuts=${checkboxNuts.checked}&spiciness=${sliderValue}&categoryId=${filteredId}`)
    .then( object => object.json())
    .then( data => {
        createCards(data)
        
    })
}else{
    fetch(`https://restaurant.stepprojects.ge/api/Products/GetFiltered?vegeterian=${checkboxVeg.checked}&nuts=${checkboxNuts.checked}&spiciness=${sliderValue}`)
    .then( object => object.json())
    .then( data => {
        createCards(data)
})
}
}



// cardPlace.innerHTML = '<h1 class="sorry">No product was found :( </h1>'; 

function createCards(advancedFiltered){
    cardPlace.innerHTML = ''; 
    
    advancedFiltered.forEach(product => {
        let vegIcon = product.vegeterian ? `<i class="fa-solid fa-check"></i>` : `<i class="fa-solid fa-circle-xmark"></i>`;
        let nutIcon = product.nuts ? `<i class="fa-solid fa-check"></i>` : `<i class="fa-solid fa-circle-xmark"></i>`;
        
        cardPlace.innerHTML += `
            <div class="card">
                <img src="${product.image}" alt="" class="image-of-dish">
                <div class="price">${product.price}$</div>
                <div class="spice">${product.spiciness} <i class="fa-solid fa-pepper-hot"></i></div>
                <span class="nameOfProduct">${product.name}</span>
                <div class="section-three-column-row">
                    <div>${vegIcon} <span>Vegetarian</span></div>
                    <div>${nutIcon} <span>Nuts</span></div>
                </div>
                <div class="section-three-column-row">
                    <button class="card-button" onclick="GoOnDetails(${product.id})">Details</button>
                    <button class="card-button" onclick="AddInCart(${product.id}, ${product.price})">Add to cart</button>
                </div>
            </div>`;
            
    });
}

function abort() {
    filteredId = null
    createCards(allproducts)
}



scrollButton.addEventListener('click', function() {
    targetSection.scrollIntoView({
        behavior: 'smooth', 
        block: 'start' 
    });
});

function GoOnDetails(id){
    window.location = './details.html'
    localStorage.setItem('key', `${id}`)
}


fetch('https://restaurant.stepprojects.ge/api/Baskets/GetAll')
.then(object => object.json())
.then(data => {
    localStorage.setItem('CartItems', `${data.length}`)
    cartItemNumber.innerHTML = data.length
})
function AddInCart(id,price){
    let quantity = prompt()
    if(quantity == ''){
        quantity = 1;
    }
setTimeout(() => {
    location.reload();
}, 100); 
    localStorage.setItem('added',`${id}`)
    

    fetch("https://restaurant.stepprojects.ge/api/Baskets/AddToBasket", {
        method: "POST",
        headers: {
            accept: "text/plain",
            'Content-Type': "application/json"
        },
        body: JSON.stringify({
            "quantity": quantity,
            "price": price,
            "productId": id
        })
    }).then( pasuxi => pasuxi.json() )
    .then( data => {
        console.log(data);
    } )
}










// let vegIcon = product.vegeterian ? `<i class="fa-solid fa-check"></i>` : `<i class="fa-solid fa-circle-xmark"></i>`;
//         let nutIcon = product.nuts ? `<i class="fa-solid fa-check"></i>` : `<i class="fa-solid fa-circle-xmark"></i>`;

// `
// <div class="card">
//                 <img src="${product.image}" alt="" class="image-of-dish">
//                 <div class="price">${product.price}</div>
//                 <div class="spice">${product.spiciness} <i class="fa-solid fa-pepper-hot"></i></div>
//                 <div class="section-three-column-row">
//                     <div>${vegIcon} <span>Vegetarian</span></div>
//                     <div>${nutIcon} <span>Nuts</span></div>
//                 </div>
//                 <div class="section-three-column-row">
//                     <button class="card-button">Details</button>
//                     <button class="card-button">Add to cart</button>
//                 </div>
//             </div>`;