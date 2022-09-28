const btnMenu = document.querySelector(".navbar__menu");
const categorias = document.querySelectorAll(".boton");
const platillos = document.querySelectorAll(".plato");

document.addEventListener("DOMContentLoaded", () => {
  iniciarApp();
});

const iniciarApp = () => {
  console.log("inciando app");
  btnMenu.addEventListener("click", abrirMenu);
  categorias.forEach((categoria) => categoria.addEventListener("click", filtrarCategoria));
};

const abrirMenu = () => {
  const menu = document.querySelector(".navbar__menu__movil");
  menu.classList.add("open");
  cerrarMenu();
};

const cerrarMenu = () => {
  const btnCerrar = document.createElement("p");
  const menu = document.querySelector(".navbar__menu__movil");
  btnCerrar.textContent = "X";
  btnCerrar.classList.add("cerrar");
  btnCerrar.addEventListener("click", () => {
    const menu = document.querySelector(".navbar__menu__movil");
    menu.classList.remove("open");
    btnCerrar.remove();
  });

  menu.append(btnCerrar);
};

const filtrarCategoria = (e) => {
  const id = e.target.id;
  const activo = document.querySelector(".active");
  if (activo) {
    activo.classList.remove("active");
    e.target.classList.add("active");
  }

  const platillosArray = [...platillos];
  const filtrados = platillosArray.filter((platos) => platos.id === id);
  id === "todo" ? mostrarRecetasFiltradas(platillosArray) : mostrarRecetasFiltradas(filtrados);
};

const mostrarRecetasFiltradas = (receta) => {
  const PlatillosContenedor = document.querySelector(`.platillos__platos`);

  limpiarHTML(PlatillosContenedor);
  receta.forEach((item) => {
    PlatillosContenedor.appendChild(item);
  });
};

const limpiarHTML = (item) => {
  while (item.firstChild) {
    item.removeChild(item.firstChild);
  }
};
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const imagen = entry.target;
      imagen.src = imagen.dataset.src;
      observer.unobserve(imagen);
    }
  });
});

const imagenesLazzy = document.querySelectorAll("img");
imagenesLazzy.forEach((imagen) => {
  observer.observe(imagen);
});
