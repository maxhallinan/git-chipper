'use strict';
const git = require('simple-git')();

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

function deleteBranches(names) {
  return Promise.all(names.map(deleteBranch));
}

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

module.exports.deleteBranches = deleteBranches;
module.exports.listLocalBranches = listLocalBranches;

