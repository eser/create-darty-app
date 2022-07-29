function locateCommandFunc(...args) {
  const commandFunc = require("../scripts/create");

  return {
    error: null,
    func: commandFunc,
    args: args,
  };
}

module.exports = locateCommandFunc;
