const Bull = require("bull");
const { emailService } = require("../services");
const { redis } = require("../config/app");
const emailQueue = new Bull("email-queue", {
  redis: {
    port: redis.REDIS_PORT,
    host: redis.REDIS_HOST,
    password: redis.REDIS_PASSWORD,
  },
});

emailQueue.process(async (job) => {
  const { to, subject } = job.data;
  await emailService.sendMail(to, subject);
});

emailQueue.on("completed", (job) => {
  console.log(`Job with id ${job.id} has been completed`);
});

const dispatch = async (to, subject) => {
  await emailQueue.add({ to, subject }, { delay: 5000 });
};
module.exports = {
  dispatch,
};
