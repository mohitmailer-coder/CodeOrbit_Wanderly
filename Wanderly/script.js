// Mobile menu: the Menu button opens and closes the navigation links
const menuBtn = document.getElementById("menu-btn");
const menu = document.getElementById("menu");

function setMenu(open) {
  menu.classList.toggle("open", open);
  menuBtn.setAttribute("aria-expanded", String(open));
  menuBtn.textContent = open ? "Close" : "Menu";
}

menuBtn.addEventListener("click", function () {
  setMenu(!menu.classList.contains("open"));
});

// Close the menu after tapping a link
menu.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", function () { setMenu(false); });
});
