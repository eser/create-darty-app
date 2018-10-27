const spawn = require('cross-spawn');

function shellSpawn(command, args, cwd) {
    const proc = spawn.sync(command, args, {
        stdio: 'inherit',
        cwd: cwd || process.cwd(),
    });

    if (proc.status > 0) {
        throw new Error(`command '${command}' exited with ${proc.status}.`);
    }

    return proc;
}

module.exports = shellSpawn;
