const router = require("express").Router();
const controller = require("../controllers/likeController");
const auth = require("../middlewares/auth");

router.post("/", auth, controller.like);
router.delete("/", auth, controller.unlike);

module.exports = router;