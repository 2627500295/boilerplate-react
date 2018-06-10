const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());

const resolve = (dir) => {
  if (dir === void 0 || dir === null) { dir = '' };

  return path.resolve(appDirectory, dir);
}

const resolveOwn = (dir) => {
  if (dir === void 0 || dir === null) { dir = '' };

  return path.resolve(__dirname, '..', dir);
};

module.exports = { appDirectory, resolve, resolveOwn };
