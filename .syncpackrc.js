// @ts-check

/** @type {import("syncpack").RcFile} */
const config = {
  versionGroups: [
    {
      dependencies: ["**"],
      packages: ["**"],
      dependencyTypes: ["peer"],
      policy: "sameRange",
    },
    {
      dependencies: ["@keyanz/**"],
      packages: ["**"],
      dependencyTypes: ["local"],
    },
  ],
};

module.exports = config;
