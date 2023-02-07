const path = require("path");

const IGHelper = require("./IGHelper");

const FOLLOWERS_FILE_PATH = path.join(__dirname, "followers.txt");
const FOLLOWING_FILE_PATH = path.join(__dirname, "following.txt");

const unfollowers = IGHelper.getUnfollowers({
  followersPath: FOLLOWERS_FILE_PATH,
  followingPath: FOLLOWING_FILE_PATH,
});

console.log(unfollowers);
