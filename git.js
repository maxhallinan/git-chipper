'use strict';
const simpleGit = require('simple-git')();
// silence logging
simpleGit.silent(true);

const git = exports;

// deleteBranch :: String -> Promise
git.deleteBranch = name => {
  return new Promise((resolve, reject) => {
    // Use both `-d` and `-D` to work around two `simple-git` limitations:
    // 1. simple-git#deleteLocalBranch does not enable force delete.
    // 2. A DeleteBranchSummary is only provided to the `simple-git#deleteLocalBranch`
    // or `simple-git#branch` callback if `-d` is in the `options` array.
    // Thus, to both force delete and receive `DeleteBranchSummary`,
    // provide both `-d` and `-D`.
    simpleGit.branch([ '-d', '-D', name, ], (err, DeleteBranchSummary) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(DeleteBranchSummary);
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
      simpleGit.branchLocal((err, BranchSummary) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(BranchSummary);
      });
    }
  ).then(getBranches);
};

