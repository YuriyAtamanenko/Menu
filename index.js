import { breakfest } from "./ingridients.js";

const menuForm = document.querySelector(".menu-form");
const container = document.querySelector(".shopping-list");
const addForm = document.querySelector(".add-shop-item");
const menuBtn = document.querySelector(".submit-menu");

menuForm.addEventListener("submit", onSubmitMenuForm);
addForm.addEventListener("submit", onAddNewProduct);

function onSubmitMenuForm(event) {
  event.preventDefault();

  // menuBtn.disabled = true;

  const bfA = searchDish(event.currentTarget.elements.bfA.value);
  const bfB = searchDish(event.currentTarget.elements.bfB.value);
  const bfC = searchDish(event.currentTarget.elements.bfC.value);
  const bfD = searchDish(event.currentTarget.elements.bfD.value);

  const mySet = new Set([...bfA, ...bfB, ...bfC, ...bfD]);

  createShoppingList([...mySet]);

  container.addEventListener("click", onChecked);
}

function searchDish(SelecteDish) {
  for (const dish in breakfest) {
    if (dish === SelecteDish) {
      return breakfest[dish];
    }
  }

  return [];
}

function createShoppingList(ingridients) {
  const ingridientsMarkup = ingridients
    .map((ingridient) => `<li class='shop-item'>${ingridient}</li>`)
    .join("");

  container.insertAdjacentHTML("beforeend", ingridientsMarkup);
}

function onChecked(event) {
  event.target.classList.toggle("checked");
}

function onAddNewProduct(event) {
  event.preventDefault();

  createShoppingList([event.currentTarget.elements.add.value]);

  addForm.reset();
}
