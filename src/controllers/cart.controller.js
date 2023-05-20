const Notebook = require("../models/notebook");

function mapCart(cart) {
  return cart.items.map((item) => ({
    ...item.notebookId._doc,
    id: item.notebookId.id,
    count: item.count,
  }));
}

function computePrice(notebooks) {
  return notebooks.reduce((total, notebook) => {
    return (total += notebook.price * notebook.count);
  }, 0);
}

const addToCart = async (req, res) => {
  try {
    const notebook = await Notebook.findById(req.body.id);
    await req.user.addToCart(notebook);
    res.redirect("/card");
  } catch (error) {
    console.log(error);
  }
};

const deleteFromCart = async (req, res) => {
  try {
    await req.user.removeFromCart(req.params.id);
    const user = await req.user.populate("cart.items.notebookId");
    const notebooks = mapCart(user.cart);
    const cart = {
      notebooks,
      price: computePrice(notebooks),
    };
    res.status(200).json(cart);
  } catch (error) {
    console.log(error);
  }
};

const incrementCart = async (req, res) => {
  try {
    await req.user.increment(req.params.id);
    const user = await req.user.populate("cart.items.notebookId");
    const notebooks = mapCart(user.cart);
    const cart = {
      notebooks,
      price: computePrice(notebooks),
    };
    res.status(200).json(cart);
  } catch (error) {
    console.log(error);
  }
};

const decrementCart = async (req, res) => {
  try {
    await req.user.decrement(req.params.id);
    const user = await req.user.populate("cart.items.notebookId");
    const notebooks = mapCart(user.cart);
    const cart = {
      notebooks,
      price: computePrice(notebooks),
    };
    res.status(200).json(cart);
  } catch (error) {
    console.log(error);
  }
};

const getAllCarts = async (req, res) => {
  try {
    const user = await req.user.populate("cart.items.notebookId");
    const notebooks = mapCart(user.cart);
    res.render("card", {
      title: "Basket",
      isCard: true,
      notebooks,
      price: computePrice(notebooks),
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  addToCart,
  deleteFromCart,
  incrementCart,
  decrementCart,
  getAllCarts,
};
