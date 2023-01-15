const emptyBasket = `
<div class="container-fluid mt-100">
  <div class="row">
    <div class="col-md-12">
      <div class="card basket">
        <div class="card-body cart">
          <div class="col-sm-12 empty-cart-cls text-center">
            <img
              src="https://i.imgur.com/dCdflKN.png"
              width="130"
              height="130"
              class="img-fluid mb-4 mr-3"
            />
            <h3><strong>Your Cart is Empty</strong></h3>
            <h4>Add something to make me happy :)</h4>
            <a
              href="/notebooks"
              class="btn btn-primary cart-btn-transform m-3"
              data-abc="true"
            >continue shopping</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
`;
const basket = (item) => {
  return `
  <tr>
    <td>${item.title}</td>
    <td>${item.price}</td>
    <td>${item.count}</td>
    <td>
      <button class="btn btn-small js-inc" data-id="${item.id}">Increment</button>
    </td>
    <td>
      <button class="btn btn-small js-dec" data-id="${item.id}">Decrement</button>
    </td>
    <td>
      <button class="btn btn-small js-remove" data-id="${item.id}">Delete</button>
    </td>
  </tr>
  `;
};

const toCurrency = (price) => {
  return new Intl.NumberFormat("us-US", {
    currency: "usd",
    style: "currency",
  }).format(price);
};

document.querySelectorAll(".price").forEach((c) => {
  c.textContent = toCurrency(c.textContent);
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
        .then((card) => {
          if (card.notebooks.length) {
            const dynamicHtml = card.notebooks
              .map((item) => {
                return basket(item);
              })
              .join("");
            $card.querySelector("tbody").innerHTML = dynamicHtml;
            $card.querySelector(".price").textContent = toCurrency(card.price);
          } else {
            $card.innerHTML = emptyBasket;
          }
        });
    } else if (e.target.classList.contains("js-inc")) {
      const id = e.target.dataset.id;

      fetch(`/card/inc/${id}`, {
        method: "post",
      })
        .then((res) => res.json())
        .then((card) => {
          if (card.notebooks.length) {
            const dynamicHtml = card.notebooks
              .map((item) => {
                return basket(item);
              })
              .join("");
            $card.querySelector("tbody").innerHTML = dynamicHtml;
            $card.querySelector(".price").textContent = toCurrency(card.price);
          } else {
            $card.innerHTML = emptyBasket;
          }
        });
    } else if (e.target.classList.contains("js-dec")) {
      const id = e.target.dataset.id;

      fetch(`/card/dec/${id}`, {
        method: "delete",
      })
        .then((res) => res.json())
        .then((card) => {
          if (card.notebooks.length) {
            const dynamicHtml = card.notebooks
              .map((item) => {
                return basket(item);
              })
              .join("");
            $card.querySelector("tbody").innerHTML = dynamicHtml;
            $card.querySelector(".price").innerHTML = toCurrency(card.price);
          } else {
            $card.innerHTML = emptyBasket;
          }
        });
    }
  });
}
