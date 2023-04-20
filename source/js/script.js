//Mobile menu

const menuButton = document.querySelector(".burger-button");
document.body.classList.remove("no-js");

if (menuButton) {
  menuButton.addEventListener("click", () => {
    document.body.classList.toggle("menu-open-js");
  });
}
