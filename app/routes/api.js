const express = require("express");
const router = express.Router();

// Auth controllers
const register = require("../controllers/auth/register");
const login = require("../controllers/auth/login");
const me = require("../controllers/auth/me");
const { verification, resent } = require("../controllers/auth/verification");
const forgot = require("../controllers/auth/password/forgot");
const reset = require("../controllers/auth/password/reset");

// Admin controllers
const ulist = require("../controllers/admin/ulist");

// Middelwares
const auth = require("../middleware/auth");
const verified = require("../middleware/verified");
const admin = require("../middleware/roles/admin");
const editor = require("../middleware/roles/editor");
const subscriber = require("../middleware/roles/subscriber");

// Auth apis
router.post("/register", register);
router.post("/login", login);
router.get("/verification/:uid/:token", verification);
router.post("/verification/resent", resent);
router.post("/forgot", forgot);
router.post("/password/reset/:uid/:token", reset);
router.get("/me", [auth, verified], me);

// Admin apis
router.get("/users", [auth, verified, admin], ulist);

module.exports = router;
