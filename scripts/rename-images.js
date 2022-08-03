const path = require('path');
const fs = require('fs');

const VERSION = 1;

const listDir = (dir, fileList = []) => {

  let files = fs.readdirSync(dir);

  files.forEach(file => {
    if (fs.statSync(path.join(dir, file)).isDirectory()) {
      fileList = listDir(path.join(dir, file), fileList);
    } else {
      // if(/\.png$/.test(file)) {
      if(/[a-z0-9]\.(?:jpg|gif|png)$/.test(file)) {
        console.log("enter", file)
        let name = file.split('.')[0] + `-${VERSION}.png`;
        let src = path.join(dir, file);
        let newSrc = path.join(dir, name);
        fileList.push({
          oldSrc: src,
          newSrc: newSrc
        });
      } else if(/\.js$/.test(file)) {

      }
    }
  });

  return fileList;
};


let foundFiles = listDir( "./dist/images/products");
foundFiles.forEach(f => {
  fs.renameSync(f.oldSrc, f.newSrc);
});


/*
fs.readFile("./dist/service-worker.js", 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  let result = data.replaceAll(/\/1.png/g, `/1-${VERSION}.png`);
  fs.writeFile("./dist/service-worker.js", result, 'utf8', function (err) {
    if (err) return console.log(err);
  });

  result = data.replaceAll(/\/2.png/g, `/2-${VERSION}.png`);
  fs.writeFile("./dist/service-worker.js", result, 'utf8', function (err) {
    if (err) return console.log(err);
  });

  result = data.replaceAll(/\/3.png/g, `/3-${VERSION}.png`);
  fs.writeFile("./dist/service-worker.js", result, 'utf8', function (err) {
    if (err) return console.log(err);
  });
});
 */
