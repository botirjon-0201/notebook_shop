const priceNotebook = document.querySelectorAll(".price");

priceNotebook.forEach((item) => {
  item.textContent = new Intl.NumberFormat("us-US", {
    currency: "usd",
    style: "currency",
  }).format(item.textContent);
});
