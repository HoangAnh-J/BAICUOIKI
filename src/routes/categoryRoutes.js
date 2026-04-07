const router = require("express").Router();
const controller = require("../controllers/categoryController");

router.post("/", controller.create);
router.get("/", controller.getAll);
router.delete("/:id", controller.delete);

module.exports = router;