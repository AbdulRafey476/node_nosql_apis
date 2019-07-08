const express = require("express");
const router = express.Router();

// Controllers
const register = require("../controllers/auth/register");
const login = require("../controllers/auth/login");
const me = require("../controllers/auth/me");
const verification = require("../controllers/auth/verification");
const forgot = require("../controllers/auth/password/forgot");
const reset = require("../controllers/auth/password/reset");

// Middelwares
const auth = require("../middleware/auth");
const admin = require("../middleware/roles/admin");
const verified = require("../middleware/verified");

router.post("/register", register);
router.post("/login", login);
router.get("/me", auth, me);
router.get("/verification/:uid/:token", verification);
router.post("/forgot", forgot);
router.post("/password/reset/:uid/:token", reset);

// router.get("/demo", [auth, verified], (req, res) => {
//   res.send("/demo");
// });

module.exports = router;
