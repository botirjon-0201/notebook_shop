const { Schema, model } = require("mongoose");

const notebookSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  descr: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

// notebookSchema.method("toClient", function () {
//   const notebook = this.toObject();
//   notebook.id = notebook._id;
//   delete notebook._id;

//   return notebook;
// });

module.exports = model("Notebook", notebookSchema);
