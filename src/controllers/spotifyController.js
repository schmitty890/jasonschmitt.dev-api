import mongoose from "mongoose";
import { CurrentSongSchema } from "../models/currentSongModel";
import { CurrentTokenSchema } from "../models/spotifyTokenModel";
var SpotifyWebApi = require("spotify-web-api-node");
const CurrentSong = mongoose.model("CurrentSong", CurrentSongSchema);
const CurrentToken = mongoose.model("CurrentToken", CurrentTokenSchema);

let spotifyApi = new SpotifyWebApi({
  redirectUri:
    process.env.SPOTIFYAPIREDIRECTURI || "http://localhost:8081/callback",
  clientId: process.env.SPOTIFYAPICLIENTID,
  clientSecret: process.env.SPOTIFYAPICLIENTSECRET,
});

const scopes = [
  "ugc-image-upload",
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",
  "streaming",
  "app-remote-control",
  "user-read-email",
  "user-read-private",
  "playlist-read-collaborative",
  "playlist-modify-public",
  "playlist-read-private",
  "playlist-modify-private",
  "user-library-modify",
  "user-library-read",
  "user-top-read",
  "user-read-playback-position",
  "user-read-recently-played",
  "user-follow-read",
  "user-follow-modify",
];

export const loginSpotify = (req, res) => {
  console.log("loginSpotify");
  res.redirect(spotifyApi.createAuthorizeURL(scopes));
};

export const getMe = (req, res) => {
  console.log("getMe function");
  (async () => {
    const me = await spotifyApi.getMe();
    console.log(me);
  })().catch((e) => {
    console.error(e);
  });
};

export const getCurrentSong = (req, res) => {
  console.log("getCurrentSong function");

  console.log(spotifyApi.createAuthorizeURL(scopes));
};

export const callback = (req, res) => {
  const error = req.query.error;
  const code = req.query.code;
  const state = req.query.state;

  if (error) {
    console.error("Callback Error:", error);
    res.send(`Callback Error: ${error}`);
    return;
  }

  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      const access_token = data.body["access_token"];
      const refresh_token = data.body["refresh_token"];
      const expires_in = data.body["expires_in"];

      spotifyApi.setAccessToken(access_token);
      spotifyApi.setRefreshToken(refresh_token);

      console.log("access_token:", access_token);
      console.log("refresh_token:", refresh_token);
      const initialAccessToken = {
        token: access_token,
      };
      const initialCurrentToken = new CurrentToken(initialAccessToken);
      console.log("saving access_token");
      initialCurrentToken.save((err, newToken) => {
        if (err) {
          return res.status(400).send({ message: err });
        } else {
          console.log("access_token saved");
          // return res.json(newToken);
        }
      });

      console.log(
        `Sucessfully retreived access token. Expires in ${expires_in} s.`
      );
      // res.send("Success! You can now close the window.");

      // console.log((expires_in / 2) * 1000);
      setInterval(async () => {
        console.log("awaiting refresh access token");
        const data = await spotifyApi.refreshAccessToken();
        const access_token = data.body["access_token"];

        console.log("The access token has been refreshed!");
        console.log("access_token:", access_token);
        console.log("setting access token");
        spotifyApi.setAccessToken(access_token);
        const newAccessToken = {
          token: access_token,
        };
        const newCurrentToken = new CurrentToken(newAccessToken);
        console.log(newCurrentToken);
        console.log("saving new access token");
        newCurrentToken.save((err, newToken) => {
          if (err) {
            return res.status(400).send({ message: err });
          } else {
            console.log("new access token saved");
            // return res.json(newToken);
          }
        });
        // }, (expires_in / 2) * 1000);
      }, 900000); // every 15 minutes
    })
    .catch((error) => {
      console.error("Error getting Tokens:", error);
      res.send(`Error getting Tokens: ${error}`);
    });
};

export const getCurrentToken = (req, res) => {
  console.log("getCurrentToken");
  CurrentToken.find({}, (err, token) => {
    if (err) {
      res.send(err);
    }
    res.json(token);
  })
    .sort({ $natural: -1 })
    .limit(1);
};

// export const getCurrentSongFromClient = (req, res) => {
//   console.log("getCurrentSongFromClient");
//   CurrentSong.find({}, (err, contact) => {
//     if (err) {
//       res.send(err);
//     }
//     res.json(contact);
//   })
//     .sort({ $natural: -1 })
//     .limit(1);
// };
