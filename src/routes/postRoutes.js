const router = require("express").Router();
const controller = require("../controllers/postController");
const auth = require("../middlewares/auth");
const upload = require("../utils/upload");
router.post("/", auth, upload.single("image"), controller.create);
router.get("/", controller.getAll);
router.put("/:id", auth, controller.update);
router.delete("/:id", auth, controller.delete);

module.exports = router;