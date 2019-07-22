const Joi = require("joi");
const { Store } = require("../models/store");
const ObjectId = require("mongoose").Types.ObjectId;

const store = {
  // Create store
  create: async (req, res) => {
    const { name, description, category, image, url } = req.body;

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let store = await Store.findOne({ name });
    if (store) return res.status(409).send("Store already exists.");

    store = new Store({ name, description, category, image, url });
    await store.save();

    res.send(store);
  },

  // Get stores
  get: async (req, res) => {
    let stores = await Store.find();
    if (!stores.length) res.send("No stores found.");

    res.send(stores);
  },

  // Get store by id
  getById: async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
      return res.status(400).send("Invalid store");

    let store = await Store.findById({ _id: req.params.id });
    if (!store) return res.status(400).send("No store found.");

    res.send(store);
  },

  // Update store
  update: async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
      return res.status(400).send("Invalid store");
    
    let store = await Store.findById({ _id: req.params.id });
    if (!store) return res.status(400).send("No store found.");

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const { name, description, category, active, image, url } = req.body;

    store.name = name;
    store.description = description;
    store.category = category;
    store.active = active;
    store.image = image;
    store.url = url;

    try {
      await store.save();
    } catch (ex) {
      res.status(409).send("Store already exists");
    }
    res.send(store);
  },

  // Delete store
  delete: async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
      return res.status(400).send("Invalid store");

    let store = await Store.deleteOne({ _id: req.params.id });
    if (store.deletedCount) return res.send("Successfully deleted.");

    res.send("No store found.");
  }
};

// Validate store
const validate = req => {
  const Schema = {
    name: Joi.string()
      .min(5)
      .max(50)
      .required(),
    description: Joi.string()
      .min(5)
      .max(255)
      .required(),
    category: Joi.string()
      .min(5)
      .max(50)
      .required(),
    active: Joi.boolean(),
    image: Joi.string()
      .min(5)
      .max(255)
      .uri()
      .required(),
    url: Joi.string()
      .min(5)
      .max(255)
      .uri()
      .required()
  };

  return Joi.validate(req, Schema);
};

module.exports = store;
