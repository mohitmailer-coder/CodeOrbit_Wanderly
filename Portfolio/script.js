// ---------- 1. Dark / light theme (remembered with localStorage) ----------
const themeBtn = document.getElementById("theme");

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  themeBtn.textContent = theme === "dark" ? "Light mode" : "Dark mode";
}

let saved = "light";  
try {
  saved = localStorage.getItem("theme") || "light";
} catch (e) {
  /* storage blocked: use light */
}
applyTheme(saved);

themeBtn.addEventListener("click", function () {
  const next =
    document.documentElement.getAttribute("data-theme") === "dark"
      ? "light"
      : "dark";
  applyTheme(next);
  try {
    localStorage.setItem("theme", next);
  } catch (e) {
    /* ignore */
  }
});

// ---------- 2. Highlight the nav link of the section you are reading ----------
const links = document.querySelectorAll("nav a");
const sections = document.querySelectorAll("main section");

const observer = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        links.forEach(function (link) {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === "#" + entry.target.id,
          );
        });
      }
    });
  },
  { rootMargin: "-40% 0px -55% 0px" },
);

sections.forEach(function (section) {
  observer.observe(section);
});

// ---------- 3. Contact form: validate, then open the visitor's email app ----------
document.getElementById("form").addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const message = document.getElementById("message").value.trim();
  const msg = document.getElementById("msg");

  if (!name || !message) {
    msg.textContent = "Please fill in your name and message.";
    return;
  }
  msg.textContent = "Opening your email app...";
  window.location.href =
    "mailto:mohitmailer@gmail.com?subject=" +
    encodeURIComponent("Portfolio message from " + name) +
    "&body=" +
    encodeURIComponent(message);
});
