const path = require("path");
const fs = require("fs");

const pathToDb = path.join(__dirname, "..", "data", "card.json");

class Card {
  static async add(notebook) {
    const card = await Card.fetch();
    const idx = card.notebooks.findIndex((item) => item.id === notebook.id);

    if (idx >= 0) {
      card.notebooks[idx].count++;
    } else {
      notebook.count = 1;
      card.notebooks.push(notebook);
    }
    card.price += +notebook.price;

    return new Promise((resolve, reject) => {
      fs.writeFile(pathToDb, JSON.stringify(card), (err) => {
        err ? reject(err) : resolve();
      });
    });
  }

  static async increment(id) {
    const card = await Card.fetch();
    const idx = card.notebooks.findIndex((item) => item.id === id);

    card.price += +card.notebooks[idx].price;
    card.notebooks[idx].count++;

    return new Promise((resolve, reject) => {
      fs.writeFile(pathToDb, JSON.stringify(card), (err) => {
        err ? reject(err) : resolve(card);
      });
    });
  }

  static async decrement(id) {
    const card = await Card.fetch();
    const idx = card.notebooks.findIndex((item) => item.id === id);

    card.price -= +card.notebooks[idx].price;

    if (card.notebooks[idx].count === 1) {
      card.notebooks = card.notebooks.filter((item) => item.id !== id);
    } else {
      card.notebooks[idx].count--;
    }

    return new Promise((resolve, reject) => {
      fs.writeFile(pathToDb, JSON.stringify(card), (err) => {
        err ? reject(err) : resolve(card);
      });
    });
  }

  static async remove(id) {
    const card = await Card.fetch();
    const idx = card.notebooks.findIndex((item) => item.id === id);

    card.price -= +card.notebooks[idx].price * card.notebooks[idx].count;
    card.notebooks = card.notebooks.filter((item) => item.id !== id);

    return new Promise((resolve, reject) => {
      fs.writeFile(pathToDb, JSON.stringify(card), (err) => {
        err ? reject(err) : resolve(card);
      });
    });
  }

  static async fetch() {
    return new Promise((resolve, reject) => {
      fs.readFile(pathToDb, "utf-8", (err, content) => {
        err ? reject(err) : resolve(JSON.parse(content));
      });
    });
  }
}

module.exports = Card;
