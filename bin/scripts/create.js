const shellSpawn = require("../utils/shellSpawn");
const presets = require("../../presets.json");

const path = require("path");
const rimraf = require("rimraf");
const colors = require("colors/safe");

function log(entry) {
  console.log(entry);
}

function error(entry) {
  console.error(entry);
}

function create(preset, folder) {
  const selectedPreset = presets[preset];

  if (selectedPreset === undefined || preset === undefined) {
    if (selectedPreset !== undefined) {
      error(colors.red(`no such preset named ${preset}`));
    }

    error(`${colors.red("specify a preset to create project files.")}

${colors.yellow("preset list:")}`);

    Object.keys(presets).forEach((presetKey) => {
      error(`- ${colors.white(presetKey)}`);
    });

    error(`
${colors.bold("example:")} '${colors.yellow("yarn create darty-app react app")}'
`);

    process.exit(1);

    return;
  }

  if (folder === undefined) {
    error(`${colors.red("specify a directory to create project files.")}

${colors.bold("example:")} '${
      colors.yellow(`yarn create darty-app ${preset} app`)
    }'
`);

    process.exit(1);

    return;
  }

  const target = path.resolve(process.cwd(), folder);

  shellSpawn("git", [
    "clone",
    "--depth=1",
    "--branch=master",
    selectedPreset.repository,
    target,
  ]);
  rimraf.sync(`${target}/.git`);
  shellSpawn("yarn", ["install"], target);

  log(`

${colors.dim("----------------------------------------")}

Darty app is ${colors.green("successfully")} created under ${target}
First switch to app directory, then use commands listed below:

${colors.bold("command list:")}
- ${colors.yellow("yarn lint")}      : start linter
- ${colors.yellow("yarn test")}      : run tests
- ${colors.yellow("yarn dev")}       : start development mode
- ${colors.yellow("yarn bundle")}    : create an app bundle under dist/ folder
- ${
    colors.yellow("yarn start")
  }     : serve bundle from localhost with SSR enabled

To start immediately,

  cd ${path.relative(process.cwd(), target)}
  yarn dev
`);
}

module.exports = create;
