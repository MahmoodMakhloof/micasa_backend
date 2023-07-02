const Bree = require("bree");
const path = require("path");

//* Fetch Models
const Schedules = require("./CLIENT/models/scheduleModel");
const { await } = require("signale/types");

var jobs = [];
var bree;

async function fetchJobs() {
  //* Fetch Jobs
  var schedules = await Schedules.find({ enabled: true }).exec();

  for (var s in schedules) {
    if (s.cron != null) {
      jobs.push({
        name: s._id.toString(),
        cron: s.cron,
        path: path.resolve("jobs/schedule.js"),
        worker: {
          workerData: {
            name: s.name,
            events: s.events,
          },
        },
      });
    } else if (s.datetime != null) {
      var datetime = Date.parse(s.datetime);
      let now = new Date();
      var timeout = datetime - now;
      if (timeout > 0) {
        jobs.push({
          name: s._id.toString(),
          timeout: timeout,
          path: path.resolve("jobs/schedule.js"),
          worker: {
            workerData: {
              name: s.name,
              events: s.events,
            },
          },
        });
      }
    }
  }

  //* Pass Jobs to Bree
  bree = new Bree({
    jobs: [{ name: "hello" }, ...jobs],

    errorHandler: (error, workerMetadata) => {
      // workerMetadata will be populated with extended worker information only if
      // Bree instance is initialized with parameter `workerMetadata: true`
      if (workerMetadata.threadId) {
        logger.info(
          `There was an error while running a worker ${workerMetadata.name} with thread ID: ${workerMetadata.threadId}`
        );
      } else {
        logger.info(
          `There was an error while running a worker ${workerMetadata.name}`
        );
      }

      logger.error(error);
      errorService.captureException(error);
    },
  });

  await bree.start();

  //* Listeners
  bree.on("worker created", (name) => {
    console.log("worker created", name);
  });

  bree.on("worker deleted", (name) => {
    console.log("worker deleted", name);
  });
}

async function addJob(s) {
  if (s.cron != null) {
    await bree.add({
      name: s._id.toString(),
      cron: s.cron,
      path: path.resolve("jobs/schedule.js"),
      worker: {
        workerData: {
          name: s.name,
          events: s.events,
        },
      },
    });
    bree.start(s._id.toString());
  } else if (s.datetime != null) {
    var datetime = Date.parse(s.datetime);
    let now = new Date();
    var timeout = datetime - now;
    if (timeout > 0) {
      await bree.add({
        name: s._id.toString(),
        timeout: timeout,
        path: path.resolve("jobs/schedule.js"),
        worker: {
          workerData: {
            name: s.name,
            events: s.events,
          },
        },
      });

      bree.start(s._id.toString());
    }
  }
}

async function removeJob(s, wasEnabled) {
  try {
    if (wasEnabled) {
      await bree.remove(s._id.toString());
    }
  } catch (e) {
    console.log(e.toString());
  }
}

function updateJob(s, wasEnabled) {
  removeJob(s, wasEnabled);

  if (s.enabled) {
    addJob(s);
  }
}

module.exports = { addJob, fetchJobs, removeJob, updateJob };
