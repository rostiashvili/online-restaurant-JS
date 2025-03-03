let table = document.querySelector('table');
let cartItemNumber = document.getElementById('cartItemNumber')
let totalPrice;


fetch('https://restaurant.stepprojects.ge/api/Baskets/GetAll')
.then(object => object.json())
.then(data => {
    cartItemNumber.innerHTML = data.length
})

fetch('https://restaurant.stepprojects.ge/api/Baskets/GetAll')
  .then(object => object.json())
  .then(data => {
    data.forEach(element => {
      createCard(element);
    });
  });

function createCard(data) {
  totalPrice = data.quantity * data.product.price;

  table.innerHTML += `
    <tr>
        <td class="product-td">
            <img src="${data.product.image}" alt="">
            <span>${data.product.name}</span>
        </td>
        <td class="quantity-cell">
    <button class="change-value" onclick="changeQuantity(this, -1, ${data.product.id})">-</button>
    <span class="dataQuantity">${data.quantity}</span>
    <button class="change-value" onclick="changeQuantity(this, 1, ${data.product.id})">+</button>
        </td>
        <td>${data.product.price}</td>
        <td>${totalPrice}</td>
        <td>
            <button class="delete" onclick="deleteCard(${data.product.id})">Delete</button>
        </td>
    </tr>`;
}

function deleteCard(idForDelete) {

  
  setTimeout(() => {
    location.reload();
}, 100); 

  fetch(`https://restaurant.stepprojects.ge/api/Baskets/DeleteProduct/${idForDelete}`, {
    method: 'DELETE'
  });

  alert('Your product has been deleted');
}

function changeQuantity(button, amount, productId) {
  let quantitySpan = button.parentElement.querySelector('.dataQuantity');
  let quantity = parseInt(quantitySpan.innerHTML) + amount;

  if (quantity < 1) return;

  quantitySpan.innerHTML = quantity;

  setTimeout(() => {
    location.reload();
}, 100); 

  fetch(`https://restaurant.stepprojects.ge/api/Baskets/UpdateBasket`, {
    method: "PUT",
    headers: {
        "Content-Type": "application/json",
        "Accept": "*/*"
    },
    body: JSON.stringify({
        "productId": productId,
        "quantity": quantity
    })
})
}


