const { DdbService } = require("../services/ddb.service");
const { SpotifyService } = require("../services/spotify.service");
const { isEmpty } = require("lodash/isEmpty");

class SpotifyController {
  constructor() {
    this.spotifyService = new SpotifyService();
    this.ddbService = new DdbService();
  }

  getNowPlaying = async (req, res, next) => {
    const accessToken = await this.ddbService.getKey("access_token");
    let currentPlaying = await this.spotifyService.getCurrentPlaying(
      accessToken
    );
    if (!_.isEmpty(currentPlaying.error)) {
      const refreshToken = await this.ddbService.getKey("refresh_token");
      const basicAuth = await this.ddbService.getKey("basic_authorization");
      const accessToken = await this.spotifyService.getNewAccessToken(
        basicAuth,
        refreshToken
      );
      // TODO: Send to SQS to update new access_token
      const newAccessToken = accessToken.access_token;
      await this.ddbService.updateKey("access_token", newAccessToken);
      currentPlaying = await this.spotifyService.getCurrentPlaying(
        newAccessToken
      );
    }

    // console.log("currentPlaying", currentPlaying);

    return res.status(200).json({
      success: true,
      data: currentPlaying,
    });

    // // if no AT valid
    // // get new AT with refresh token

    // get current play
  };
}

module.exports = new SpotifyController();
