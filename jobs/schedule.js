const { Worker, isMainThread, workerData } = require("worker_threads");

console.log("Events ==> ", workerData);
