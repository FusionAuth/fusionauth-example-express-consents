var express = require("express");
var router = express.Router();
var { FusionAuthClient } = require("@fusionauth/typescript-client");

const fusionClient = new FusionAuthClient(
  "<YOUR_FUSION_API_KEY>",
  "https://<YOUR_FUSIONAUTH_URL>"
);

/* GET users listing. */
router.get("/me", async function (req, res, next) {
  const user = req.user;
  // Get the user's consent info:
  let userConsents = {};
  try {
    const response = await fusionClient.retrieveUserConsents(user.id);
    userConsents = response.response.userConsents;
  } catch (err) {
    console.log(err);
  }
  res.render("me", {
    profile: JSON.stringify(user, null, "\t"),
    consents: JSON.stringify(userConsents, null, "\t"),
  });
});


module.exports = router;
