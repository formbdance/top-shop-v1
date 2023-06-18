let cartItems = [];
let totalPrice = 0;


function addToCart(productName, price) {
    cartItems.push(productName);
    totalPrice += price;
    renderCart();
}

function renderCart() {
    //рендер корзины из массива
    const cartItemsElement = document.querySelector("#cart-item");
    cartItemsElement.innerHTML = "";
    //метод forEach не закончит работу, пока есть элементы в массиве.
    //.Для каждого элемента массива(item) создается li, в который записывается название текущего элемента. Затем li добавляется в список
    cartItems.forEach(item => {
        const li = document.createElement("li");
        li.innerText = item;
        cartItemsElement.appendChild(li);
    });
    document.querySelector("#total-price").innerText = `Общая стоимость: ${totalPrice}$`;
}

