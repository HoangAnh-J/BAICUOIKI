const router = require("express").Router();
const controller = require("../controllers/commentController");
const auth = require("../middlewares/auth");

router.post("/", auth, controller.create);
router.get("/", controller.getAll);
router.delete("/:id", auth, controller.delete);

module.exports = router;