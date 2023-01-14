const priceNotebook = document.querySelectorAll(".price");

priceNotebook.forEach((item) => {
  item.textContent = new Intl.NumberFormat("us-US", {
    currency: "usd",
    style: "currency",
  }).format(item.textContent);
});

const $card = document.querySelector("#card");
if ($card) {
  $card.addEventListener("click", (e) => {
    if (e.target.classList.contains("js-remove")) {
      const id = e.target.dataset.id;

      fetch(`/card/remove/${id}`, {
        method: "delete",
      })
        .then((res) => res.json())
        .then((card) => console.log(card));
    } else if (e.target.classList.contains("js-inc")) {
      const id = e.target.dataset.id;

      fetch(`/card/inc/${id}`, {
        method: "delete",
      })
        .then((res) => res.json())
        .then((card) => console.log(card));
    } else if (e.target.classList.contains("js-dec")) {
      const id = e.target.dataset.id;

      fetch(`/card/dec/${id}`, {
        method: "delete",
      })
        .then((res) => res.json())
        .then((card) => console.log(card));
    }
  });
}
