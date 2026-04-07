const router = require("express").Router();
const controller = require("../controllers/tagController");

router.post("/", controller.create);
router.get("/", controller.getAll);
router.post("/add", controller.addTagToPost);
module.exports = router;