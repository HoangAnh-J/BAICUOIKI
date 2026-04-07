const router = require("express").Router();
const controller = require("../controllers/messageController");
const auth = require("../middlewares/auth");

router.post("/", auth, controller.create);
router.get("/", controller.getAll);

module.exports = router;