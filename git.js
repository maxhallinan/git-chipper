'use strict';

const git = require('simple-git')();

// deleteBranch :: String -> Promise
function deleteBranch(name) {
  return new Promise((resolve, reject) => {
    git.deleteLocalBranch(name, (err, data) => {
      if (err) {
        return reject(err);
      }

      resolve(data);
    });
  });
}

// deleteBranchs :: Array -> Promise
function deleteBranches(names) {
  return Promise.all(names.map(deleteBranch));
}

// listLocaLBranches :: * -> Promise
function listLocalBranches() {
  return new Promise(
    (resolve, reject) => {
      git.branchLocal((err, data) => {
        if (err) {
          return reject(err);
        }

        resolve(data);
      });
    }
  );
}

module.exports.deleteBranch = deleteBranch;
module.exports.deleteBranches = deleteBranches;
module.exports.listLocalBranches = listLocalBranches;

