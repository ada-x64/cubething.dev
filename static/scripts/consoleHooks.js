// This script will add a global "log" object that will
// intercept all console logs. If an error occurs,
// this log object will be stringified and appended
// to the document.

const Level = Object.freeze({
  LOG: Symbol("log"),
  WARN: Symbol("warn"),
  ERROR: Symbol("error"),
  DEBUG: Symbol("debug"),
  INFO: Symbol("info"),
});
let log = [];
let mklog = (console_fn, level) => {
  return (...args) => {
    log.push({
      timestamp: new Date().toLocaleString(),
      level: Symbol.keyFor(level),
      args: [...args],
    });
    let fn = console_fn;
    fn(...args);
  };
};

console.log = mklog(console.log, Level.LOG);
console.warn = mklog(console.warn, Level.WARN);
console.error = mklog(console.error, Level.ERROR);
console.debug = mklog(console.debug, Level.DEBUG);
console.info = mklog(console.info, Level.INFO);
