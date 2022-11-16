const { Router } = require("express");
const router = Router();
const spotifyRoute = require("./spotify.route");

router.use("/", spotifyRoute);

module.exports = router;
