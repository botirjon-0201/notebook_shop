const path = require("path");
const fs = require("fs");

const pathToDb = path.join(__dirname, "..", "data", "card.json");

class Card {
  static async add(notebook) {
    const card = await Card.fetch();
    const idx = card.notebooks.findIndex((item) => item.id === notebook.id);
    const candidate = card.notebooks[idx];

    if (candidate) {
      candidate.count++;
      card.notebooks[idx] = candidate;
    } else {
      notebook.count = 1;
      card.notebooks.push(notebook);
    }

    card.price += +notebook.price;

    return new Promise((resolve, reject) => {
      fs.writeFile(pathToDb, JSON.stringify(card), (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  static async increment(id) {
    const card = await Card.fetch();
    const idx = card.notebooks.findIndex((item) => item.id === id);
    const notebook = card.notebooks[idx];

    card.notebooks[idx].count++;
    card.price += +notebook.price;

    return new Promise((resolve, reject) => {
      fs.writeFile(pathToDb, JSON.stringify(card), (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(card);
        }
      });
    });
  }

  static async decrement(id) {
    const card = await Card.fetch();
    const idx = card.notebooks.findIndex((item) => item.id === id);
    const notebook = card.notebooks[idx];

    if (notebook.count === 1) {
      card.notebooks = card.notebooks.filter((item) => item.id !== id);
    } else {
      card.notebooks[idx].count--;
    }

    card.price -= +notebook.price;

    return new Promise((resolve, reject) => {
      fs.writeFile(pathToDb, JSON.stringify(card), (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(card);
        }
      });
    });
  }

  static async remove(id) {
    const card = await Card.fetch();
    const idx = card.notebooks.findIndex((item) => item.id === id);
    const notebook = card.notebooks[idx];

    card.price -= +notebook.price * card.notebooks[idx].count;
    card.notebooks = card.notebooks.filter((item) => item.id !== id);

    return new Promise((resolve, reject) => {
      fs.writeFile(pathToDb, JSON.stringify(card), (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(card);
        }
      });
    });
  }

  static async fetch() {
    return new Promise((resolve, reject) => {
      fs.readFile(pathToDb, "utf-8", (err, content) => {
        if (err) {
          reject(err);
        } else {
          resolve(JSON.parse(content));
        }
      });
    });
  }
}

module.exports = Card;
