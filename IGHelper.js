"use-strict";

const fs = require("fs");

const IG_USERNAMES_REGEX = /^[a-z0-9._]+$/gim;
const UPPERCASE_REGEX = /[A-Z]/;

class IGHelper {
  static containsUppercase(str) {
    return UPPERCASE_REGEX.test(str);
  }

  static filterData(rawData = "") {
    return rawData.match(IG_USERNAMES_REGEX);
  }

  static loadFollowers(followersPath) {
    const followersRawData = fs.readFileSync(followersPath, {
      encoding: "utf8",
      flag: "r",
    });
    return this.filterData(followersRawData).filter(
      (username) => !this.containsUppercase(username)
    );
  }

  static loadFollowing(followingPath) {
    const followingRawData = fs.readFileSync(followingPath, {
      encoding: "utf8",
      flag: "r",
    });
    return this.filterData(followingRawData).filter(
      (username) => !this.containsUppercase(username)
    );
  }

  static getUnfollowers(config = {}) {
    const { followersPath, followingPath } = config;
    const followers = this.loadFollowers(followersPath);
    const following = this.loadFollowing(followingPath);
    return [
      ...new Set(following.filter((username) => !followers.includes(username))),
    ];
  }
}

module.exports = IGHelper;
