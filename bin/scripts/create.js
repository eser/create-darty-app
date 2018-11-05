const shellSpawn = require('../utils/shellSpawn');
const presets = require('../../presets.json');

const path = require('path');
const rimraf = require('rimraf');
const colors = require('colors/safe');

function create(preset, folder) {
    const selectedPreset = presets[preset];

    if (selectedPreset === undefined || preset === undefined) {
        if (selectedPreset !== undefined) {
            console.error(colors.red(`no such preset named ${preset}`));
        }

        console.error(`${colors.red('specify a preset to create project files.')}

${colors.yellow('preset list:')}`);

        for (const presetKey in presets) {
            console.error(`- ${colors.white(presetKey)}`);
        }

        console.error(`
${colors.bold('example:')} '${colors.yellow('npx create-darty-app react app')}'
`);

        process.exit(1);
        return;
    }

    if (folder === undefined) {
        console.error(`${colors.red('specify a directory to create project files.')}

${colors.bold('example:')} '${colors.yellow('npx create-darty-app ${preset} app')}'
`);

        process.exit(1);
        return;
    }

    const target = path.resolve(process.cwd(), folder);

    shellSpawn('git', [ 'clone', '--depth=1', '--branch=master', selectedPreset.repository, target ]);
    rimraf.sync(`${target}/.git`);
    shellSpawn('npm', [ 'install' ], target);

    console.log(`

${colors.dim('----------------------------------------')}

Darty app is ${colors.green('successfully')} created under ${target}
First switch to app directory, then use commands listed below:

${colors.bold('command list:')}
- ${colors.yellow('npm run lint')}      : start linter
- ${colors.yellow('npm run test')}      : run tests
- ${colors.yellow('npm run dev')}       : start development mode
- ${colors.yellow('npm run bundle')}    : create an app bundle under dist/ folder
- ${colors.yellow('npm start')}         : serve bundle from localhost with SSR enabled

To start immediately,

  cd ${path.relative(process.cwd(), target)}
  npm run dev
`);
}

module.exports = create;
