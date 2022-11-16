const fetch = require("node-fetch");

class SpotifyService {
  getNewAccessToken = async (basicAuth, refreshToken) => {
    let result = null;
    var details = {
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    };

    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    try {
      const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: basicAuth,
        },
        body: formBody,
      });
      result = await response.json();
    } catch (err) {
      console.log("Error getNewAccessToken", err);
    }

    return result;
  };

  getCurrentPlaying = async (accessToken) => {
    let result = null;
    try {
      const response = await fetch(
        "https://api.spotify.com/v1/me/player/currently-playing?market=VN",
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: "Bearer " + accessToken,
          },
        }
      );
      result = await response.json();
    } catch (err) {
      console.log("Error getCurrentPlaying", err);
    }

    return result;
  };
}

module.exports = { SpotifyService };
