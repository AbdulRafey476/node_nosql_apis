const db = require("../database");
require("mongoose-type-url");

const storeSchema = new db.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
    unique: true
  },
  description: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255
  },
  category: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  active: { type: Boolean, default: true },
  image: {
    type: db.SchemaTypes.Url,
    required: true,
    minlength: 5,
    maxlength: 255
  },
  url: {
    type: db.SchemaTypes.Url,
    required: true,
    minlength: 5,
    maxlength: 255
  }
});

const Store = db.model("Store", storeSchema);

exports.Store = Store;
