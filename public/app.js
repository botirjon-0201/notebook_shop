const priceNotebook = document.querySelectorAll(".price");

priceNotebook.forEach((item) => {
  item.textContent = new Intl.NumberFormat("uz-UZ", {
    currency: "uzb",
    style: "currency",
  }).format(item.textContent);
});
