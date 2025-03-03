let SavedId = localStorage.getItem('key')
let detailRow = document.getElementById('detailRow')
let cartItemNumber = document.getElementById('cartItemNumber')

fetch(`https://restaurant.stepprojects.ge/api/Products/GetAll`)
.then(object => object.json())
.then(data => {
    data.forEach(element => {
        if(element.id == SavedId){
            createCard(element)
        }
    });
})
.catch(error => {
    console.error("Error fetching categories:", error);
});


function createCard(element){

    let vegIcon = element.vegeterian ? `<i class="fa-solid fa-check"></i>` : `<i class="fa-solid fa-circle-xmark"></i>`;
    let nutIcon = element.nuts ? `<i class="fa-solid fa-check"></i>` : `<i class="fa-solid fa-circle-xmark"></i>`;

    detailRow.innerHTML = `<img src="${element.image}" alt="" class="details-image">
                <div class="details-column">
                    <span class="details-header">${element.name}</span>
                    <div class="class-icons"> <div>Vegetarian: ${vegIcon} </div> <div> Nuts:${nutIcon} </div> </div>
                    <span class="details-description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae iure delectus asperiores adipisci, eveniet ea facere veritatis, reiciendis, nam aut culpa nisi doloribus amet! Placeat ipsam iste nihil in laudantium necessitatibus eum voluptatum animi, blanditiis illum molestiae nemo dolorum labore! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam dicta id suscipit minima doloremque, sed velit ducimus nihil perferendis molestiae, totam corporis amet nobis itaque accusamus atque magni non voluptatibus, maiores incidunt esse alias dolor tempore. Dolores explicabo libero maiores, voluptatum sapiente delectus quod dolore atque porro illum optio quis sit cumque corrupti blanditiis? Ex consequuntur ea aperiam beatae aliquam tenetur sequi reprehenderit tempore nam asperiores suscipit, atque rem amet eum voluptate consectetur ipsum pariatur maxime, magni incidunt. Asperiores libero suscipit placeat maiores totam aut ab itaque, iusto fuga quisquam ullam quia quasi vitae consequuntur sequi magnam! Qui, sunt officiis?</span>
                    <div class="details-small-row">
                    <div class="gap">
                        <span class="price-tag">Price: ${element.price}$</span>
                        <span class="price-tag">Spice: ${element.spiciness} </span>
                    </div>
                        <button class="card-button larger" onclick="AddInCart(${element.id},${element.price})">Add to Cart</button>
                    </div>`
}

fetch('https://restaurant.stepprojects.ge/api/Baskets/GetAll')
.then(object => object.json())
.then(data => {
    cartItemNumber.innerHTML = data.length
})
.catch(error => {
    console.error("Error fetching categories:", error);
});


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
    .then( data => {})
    .catch(error => {
        console.error("Error fetching categories:", error);
    });
}
