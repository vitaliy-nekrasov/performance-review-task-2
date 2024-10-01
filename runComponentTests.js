const { execSync } = require("child_process");

try {
  execSync("npm run test:utils", { stdio: "inherit" });

  execSync("npm run test:jest", { stdio: "inherit" });
} catch (error) {
  console.error("An error occurred while running the tests:", error);
  process.exit(1);
}
