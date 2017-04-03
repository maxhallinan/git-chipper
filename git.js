'use strict';
const simpleGit = require('simple-git')();

const git = exports;

// deleteBranch :: String -> Promise
git.deleteBranch = function (name) {
  return new Promise((resolve, reject) => {
    simpleGit.deleteLocalBranch(name, (err, data) => {
      if (err) {
        return reject(err);
      }

      resolve(data);
    });
  });
}

// deleteBranches :: Array -> Promise
git.deleteBranches = function (names) {
  return Promise.all(names.map(git.deleteBranch));
}

// listLocaLBranches :: * -> Promise
git.listLocalBranches = function () {
  return new Promise(
    (resolve, reject) => {
      simpleGit.branchLocal((err, data) => {
        if (err) {
          return reject(err);
        }

        resolve(data);
      });
    }
  );
}

