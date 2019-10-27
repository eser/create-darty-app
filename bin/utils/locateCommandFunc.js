function locateCommandFunc(...args) {
    // eslint-disable-next-line global-require
    const commandFunc = require('../scripts/create');

    return {
        error: null,
        func: commandFunc,
        args: args,
    };
}

module.exports = locateCommandFunc;
