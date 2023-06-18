import { Good } from "./market.js";


let id;

document
  .querySelector("#add-product-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    //получение значений полей формы
    let imagePath = document.querySelector("#image-path").value;
    let name = document.querySelector("#name").value;
    let description = document.querySelector("#description").value;
    let price = +document.querySelector('#price').value;
    //создание нового товара(объект класса Good)

    // срез пути файла
    imagePath = imagePath.split(/(\\|\/)/g).pop()
    
    //получаем существующие товары из local Storage, если есть
    let existingGoods = JSON.parse(localStorage.getItem("goods")) || []; 

    // проверка кортежа
    if(!existingGoods[0]) {
      id = 0;
    } else {
      id = existingGoods.length
    }
    
    const good = new Good(imagePath, name, description, price, id);
    
    //добавляем новый товар
    existingGoods.push(good);
    //сохраняем изменения в localStorage
    localStorage.setItem("goods", JSON.stringify(existingGoods));
    //очищаем поля формы
    document.querySelector("#image-path").value = "", 
    document.querySelector("#name").value = "", 
    document.querySelector("#description").value = "", 
    
    document.querySelector('#price').value = "";
    
    //перенаправление на другую страницу
    //window.location.href = "market.html";
  });