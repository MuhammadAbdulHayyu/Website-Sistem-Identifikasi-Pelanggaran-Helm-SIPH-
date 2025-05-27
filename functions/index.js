const { onSchedule } = require("firebase-functions/v2/scheduler");
const { initializeApp } = require("firebase-admin/app");
const { hapusFotoLama } = require("./function");

initializeApp();

exports.cleanupOldPhotos = onSchedule("every 24 hours", async (event) => {
  const bucketName = "gs://capstonesiph-d4637.firebasestorage.app";
  const folderPrefix = "pelanggaran/";
  await hapusFotoLama(bucketName, folderPrefix);
  console.log("Pembersihan selesai");
  console.log("Scheduler aktif");

});