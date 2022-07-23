const router = require("express").Router();
const AuthController = require("../controllers/AuthController");

router.post("/registration", AuthController.signUp);
router.post("/login", AuthController.signIn);
router.get("/logout", AuthController.logOut);

module.exports = router;
