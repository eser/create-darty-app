const shellSpawn = require('../utils/shellSpawn');
const path = require('path');
const rimraf = require('rimraf');
const colors = require('colors/safe');

const baseRepo = 'https://github.com/eserozvataf/dart-app';

function create(folder) {
    if (folder === undefined) {
        console.error(`${colors.red('specify a directory to create project files.')}

${colors.white('example:')} 'npx dart create app'
`);

        process.exit(1);
        return;
    }

    const target = path.resolve(process.cwd(), folder);

    shellSpawn('git', [ 'clone', '--depth=1', '--branch=master', baseRepo, target ]);
    rimraf.sync(`${target}/.git`);
    shellSpawn('npm', [ 'install' ], target);

    console.log(`----------------------------------------
Dart app is created under ${target}
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
