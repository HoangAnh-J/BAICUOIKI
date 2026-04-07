const router = require("express").Router();
const controller = require("../controllers/conversationController");
const auth = require("../middlewares/auth");

router.post("/", auth, controller.create);
router.get("/", controller.getAll);

module.exports = router;