const router = require("express").Router();
const controller = require("../controllers/notificationController");
const auth = require("../middlewares/auth");

router.post("/", auth, controller.create);
router.get("/", controller.getAll);
router.put("/:id", auth, controller.markAsRead);

module.exports = router;