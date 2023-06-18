import { saveCartItems} from "./market.js";
let cartItems;
let totalPrice;
let totalCount = 0;
//рендер корзины из массива
function renderCart() {
  const cartItemsElement = document.querySelector("#cart-item");
  cartItemsElement.innerHTML = "";
  //метод forEach не закончит работу, пока есть элементы в массиве.
  //.Для каждого элемента массива(item) создается tr, строка таблицы. Создается ячейка для каждого из значений элемента массива(название, цена, количество)
  cartItems.forEach((item) => {
    totalCount = totalCount + item.quantity;
    const tr = document.createElement("tr");
    const tdName = document.createElement("td");
    const tdPrice = document.createElement("td");
    const tdQuantity = document.createElement("td");
    const tdProductSum = document.createElement("td");
    //кнопки + и - для увеличения/уменьшения количества
    const plusButton = document.createElement("button");
    const minusButton = document.createElement("button");
    plusButton.textContent = "+";
    minusButton.textContent = "-";
    plusButton.addEventListener("click", () => increaseQuantity(item));
    minusButton.addEventListener("click", () => decreaseQuantity(item));
    minusButton.classList.add("quantBtn");
    plusButton.classList.add("quantBtn");
    //--------------------------------------

    tdName.innerText = item.name;
    tdPrice.innerText = `${item.price}$`;
    //в одну ячейку размещаем кнопки +, - и количество
    tdQuantity.append(minusButton, item.quantity, plusButton);
    tdQuantity.classList.add("quantityCell");
    tdProductSum.innerText = `${item.price * item.quantity}$`;
    tr.append(tdName, tdPrice, tdQuantity, tdProductSum);
    cartItemsElement.appendChild(tr);
  });
  showCartLength()
  totalCount = 0;
  document.querySelector(
    "#total-price"
  ).innerText = `Общая стоимость: ${totalPrice}$`;
}
async function showCartLength() {

  document.querySelector("#cartIndicator").textContent = "";
  document.querySelector("#cartIndicator").textContent = totalCount;
}
//кнопка + увеличивает количество в корзине
function increaseQuantity(item) {
  item.quantity++;
  totalPrice += item.price;
  renderCart();
  saveCartItems(cartItems, totalPrice);
}


//кнопка - уменьшает количество в корзине
function decreaseQuantity(item) {
  if (item.quantity > 1) {
    item.quantity--;
    totalPrice -= item.price;
  } else {
    //удаляем элемент из массива, если текущее колиество при клике 1.
    //используем splice, который удалить элементы массива с указанной позиции и в заданном количестве.
    //позицию находим, получив индекс элемента, найденный при сравнении имен. количество указано вторым параметром
    cartItems.splice(
      cartItems.findIndex((cartItem) => cartItem.name == item.name),
      1
    );
    totalPrice -= item.price;
  }
  renderCart();
  saveCartItems(cartItems, totalPrice);
}

//вешаем на кнопку Оформления заказа обработчик клика
const orderBtn = document.querySelector(".order-btn");
orderBtn.addEventListener("click", checkout);

//оформление заказа(пока заглушка). В перспективе отправка данных заказа на сервер с отправкой пользователю сообщения о заказе. Сброс массива корзины, сброс стоимости, отрисовка пустой корзины
function checkout() {
  alert("Заказ оформлен! Спасибо за покупку!");
  cartItems = [];
  totalPrice = 0;
  renderCart();
  saveCartItems(cartItems, totalPrice);
}

//метод загрузки корзины из локального хранилища.
//полученные json-строки парсим в соответствующие переменные, которые изначально использовались для хранения корзины и стоимости
function loadCartItems() {
  const savedCartItems = localStorage.getItem("cartItems");
  const savedTotalPrice = localStorage.getItem("totalPrice");

  if (savedCartItems) {
    cartItems = JSON.parse(savedCartItems);
    
    totalPrice = JSON.parse(savedTotalPrice);

    renderCart();
  }
}



//загрузка сохраненных товаров при загрузке страницы
loadCartItems();


