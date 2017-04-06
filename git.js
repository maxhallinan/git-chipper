'use strict';
const simpleGit = require('simple-git')();
// silence logging
simpleGit.silent(true);

const git = exports;

// deleteBranch :: String -> Promise
git.deleteBranch = name => {
  return new Promise((resolve, reject) => {
    simpleGit.deleteLocalBranch(name, (err, data) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(data);
    });
  });
};

// deleteBranches :: Array -> Promise
git.deleteBranches = names => {
  return Promise.all(names.map(git.deleteBranch));
};

// getBranches :: Object -> Array
const getBranches = ({ all, branches, }) => all.map(name => branches[name]);

// listLocaLBranches :: * -> Promise
git.listLocalBranches = () => {
  return new Promise(
    (resolve, reject) => {
      simpleGit.branchLocal((err, data) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(data);
      });
    }
  ).then(getBranches);
};

