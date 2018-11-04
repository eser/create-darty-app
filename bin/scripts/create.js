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
${colors.white('example:')} 'npx create-darty-app react app'
`);

        process.exit(1);
        return;
    }

    if (folder === undefined) {
        console.error(`${colors.red('specify a directory to create project files.')}

${colors.white('example:')} 'npx create-darty-app ${preset} app'
`);

        process.exit(1);
        return;
    }

    const target = path.resolve(process.cwd(), folder);

    shellSpawn('git', [ 'clone', '--depth=1', '--branch=master', selectedPreset.repository, target ]);
    rimraf.sync(`${target}/.git`);
    shellSpawn('npm', [ 'install' ], target);

    console.log(`----------------------------------------
Darty app is created under ${target}
First switch to app directory, then use commands listed below:

${colors.yellow('command list:')}
- ${colors.white('npm run lint')}      : start linter
- ${colors.white('npm run test')}      : run tests
- ${colors.white('npm run dev')}       : start development mode
- ${colors.white('npm run bundle')}    : create an app bundle under dist/ folder
- ${colors.white('npm start')}         : serve bundle from localhost with SSR enabled
`);
}

module.exports = create;
