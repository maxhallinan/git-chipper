'use strict';
const simpleGit = require('simple-git')();

// silence logging
simpleGit.silent(true);

const git = exports;

// deleteBranch :: String -> Promise DeleteBranchSummary
git.deleteBranch = (name, isForce = false) => {
  // Use both `-d` and `-D` to work around two `simple-git` limitations:
  // 1. simple-git#deleteLocalBranch does not enable force delete.
  // 2. A DeleteBranchSummary is only provided to the `simple-git#deleteLocalBranch`
  // or `simple-git#branch` callback if `-d` is in the `options` array.
  // Thus, to both force delete and receive `DeleteBranchSummary`,
  // provide both `-d` and `-D`.
  const args = isForce ? [ '-d', '-D', name, ] : [ '-d', name, ];

  return new Promise((resolve, reject) => {
    simpleGit.branch(args, (err, DeleteBranchSummary) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(DeleteBranchSummary);
    });
  });
};

// deleteBranches :: Array -> Promise [ DeleteBranchSummary ]
git.deleteBranches = (names, isForce = false) => {
  return Promise.all(
    names.map(name => git.deleteBranch(name, isForce))
  );
};

// listLocaLBranches :: * -> Promise BranchSummary
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
  );
};

