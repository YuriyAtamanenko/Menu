import { breakfest } from "./ingridients.js";

const menuForm = document.querySelector(".menu-form");
const container = document.querySelector(".shopping-list");
const addForm = document.querySelector(".add-shop-item");
const menuBtn = document.querySelector(".submit-menu");
const resetBtn = document.querySelector(".reset-btn");

menuForm.addEventListener("submit", onSubmitMenuForm);
addForm.addEventListener("submit", onAddNewProduct);
resetBtn.addEventListener("click", onResetPage);

populateMenu();

populateListMarkup();

function onSubmitMenuForm(event) {
  event.preventDefault();
  menuBtn.disabled = true;

  const bfA = searchDish(event.currentTarget.elements.bfA.value);
  const bfB = searchDish(event.currentTarget.elements.bfB.value);
  const bfC = searchDish(event.currentTarget.elements.bfC.value);
  const bfD = searchDish(event.currentTarget.elements.bfD.value);

  const mySet = new Set([...bfA, ...bfB, ...bfC, ...bfD]);
  const shoppingList = [...mySet];

  createShoppingList(shoppingList);

  container.addEventListener("click", onChecked);

  const saveIndexMenu = [
    event.currentTarget.elements.bfA.selectedIndex,
    event.currentTarget.elements.bfB.selectedIndex,
    event.currentTarget.elements.bfC.selectedIndex,
    event.currentTarget.elements.bfD.selectedIndex,
  ];

  const saveIndexMenuJSON = JSON.stringify(saveIndexMenu);
  localStorage.setItem("Menu", saveIndexMenuJSON);
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

  localStorage.setItem("Shopping", container.innerHTML);
}

function onChecked(event) {
  event.target.classList.toggle("checked");

  localStorage.setItem("Shopping", container.innerHTML);
}

function onAddNewProduct(event) {
  event.preventDefault();

  createShoppingList([event.currentTarget.elements.add.value]);

  addForm.reset();
}

function populateMenu() {
  const savedIndexMenuJSON = localStorage.getItem("Menu");

  if (savedIndexMenuJSON) {
    menuBtn.disabled = true;
    const savedIndexMenu = JSON.parse(savedIndexMenuJSON);

    menuForm.bfA.selectedIndex = savedIndexMenu[0];
    menuForm.bfB.selectedIndex = savedIndexMenu[1];
    menuForm.bfC.selectedIndex = savedIndexMenu[2];
    menuForm.bfD.selectedIndex = savedIndexMenu[3];
  }
}

function populateListMarkup() {
  const savedShoppingMarkup = localStorage.getItem("Shopping");

  if (savedShoppingMarkup) {
    container.innerHTML = savedShoppingMarkup;
    container.addEventListener("click", onChecked);
  }
}

function onResetPage() {
  const isComing = confirm("Очистити сторінку?");
  if (isComing) {
    menuForm.reset();
    menuBtn.disabled = false;
    container.innerHTML = "";
    localStorage.clear();
  }
}
