const router = require("express").Router();
const controller = require("../controllers/followController");
const auth = require("../middlewares/auth");

router.post("/", auth, controller.follow);
router.delete("/", auth, controller.unfollow);
router.get("/", controller.getAll);

module.exports = router;