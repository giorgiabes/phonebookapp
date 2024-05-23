// deploy.js
const { execSync } = require("child_process");

const commitMessage = process.argv[2] || "uibuild";

execSync("npm run build:ui", { stdio: "inherit" });
execSync(
  `cd ../ && git add . && git commit -m "${commitMessage}" && git push -f`,
  { stdio: "inherit" }
);
