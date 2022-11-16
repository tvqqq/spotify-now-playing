const { Router } = require("express");
const router = Router();

const spotifyController = require("../app/controllers/spotify.controller");

router.get("/now-playing", spotifyController.getNowPlaying);

module.exports = router;
