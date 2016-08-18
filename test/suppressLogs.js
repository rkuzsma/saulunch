// Helper function to suppress all console logs while running
// a specified function. Helpful to avoid polluting the console
// when testing error conditions.
// Console logging is restored after the function succeeds or fails.
// The specified function MUST return a promise!
module.exports.suppressLogs = function(promiseFunc) {
  let log = console.log;
  let suppressLogs = function() {
    console.log = function(s) {
      // suppress output
    }
  }
  let restoreLogs = function() {
    console.log = log;
  }

  return new Promise((resolve, reject) => {
    suppressLogs();
    return promiseFunc()
    .then(result => {
      restoreLogs();
      resolve(result);
    })
    .catch(err => {
      restoreLogs();
      reject(err);
    })
  });
}
