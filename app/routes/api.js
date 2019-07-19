const express = require("express");
const router = express.Router();

// Auth controllers
const register = require("../controllers/auth/register");
const login = require("../controllers/auth/login");
const me = require("../controllers/auth/me");
const verification = require("../controllers/auth/verification");
const forgot = require("../controllers/auth/password/forgot");
const reset = require("../controllers/auth/password/reset");

// Store controllers
const store = require("../controllers/store");

// Middelwares
const auth = require("../middleware/auth");
const verified = require("../middleware/verified");
const admin = require("../middleware/roles/admin");
const editor = require("../middleware/roles/editor");
const subscriber = require("../middleware/roles/subscriber");

// Auth apis
router.post("/register", register);
router.post("/login", login);
router.get("/me", auth, me);
router.get("/verification/:uid/:token", verification);
router.post("/forgot", forgot);
router.post("/password/reset/:uid/:token", reset);

// Store apis
router.post("/store", [auth, verified, admin], store.create);
router.get("/store", store.get);
router.get("/store/:id", store.getById);
router.put("/store/:id", [auth, verified, admin], store.update);
router.delete("/store/:id", [auth, verified, admin], store.delete);

module.exports = router;
