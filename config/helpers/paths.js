const path = require('path');

module.exports.ROOT_PATH = __dirname;
module.exports.PACKAGE_PATH = path.join(__dirname, '..', '..', 'package.json');
module.exports.SRC_PATH = path.join(__dirname, '..', '..', 'src');
module.exports.DIST_PATH = path.join(__dirname, '..', '..', 'dist');
