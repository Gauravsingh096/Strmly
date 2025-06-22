const express = require("express");
const router = express.Router();
const videoController = require("../controllers/videoController");
const auth = require("../middleware/auth");
const upload = require("../middleware/upload");
const { check } = require("express-validator"); // ADD THIS IMPORT

router.post(
  "/upload",
  auth,
  upload.single("video"),
  [
    check("title", "Title is required").not().isEmpty(),
    check("description", "Description is required").not().isEmpty(),
  ],
  videoController.uploadVideo
);

router.get("/videos", videoController.getVideos);

module.exports = router;
