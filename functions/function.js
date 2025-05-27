const { getStorage } = require("firebase-admin/storage");

/**
 * Menghapus file di Storage yang lebih dari 3 hari berdasarkan tanggal (bukan waktu jam).
 * @param {string} bucketName - Nama bucket Firebase Storage
 * @param {string} prefix - Folder prefix di dalam bucket (misal: 'pelanggaran/')
 */
const hapusFotoLama = async (bucketName, prefix) => {
  const storage = getStorage();
  const bucket = storage.bucket(bucketName);

  const [files] = await bucket.getFiles({ prefix });

  const now = new Date();
  const batasWaktu = new Date();
  batasWaktu.setDate(now.getDate() - 3); // hanya berdasarkan tanggal

  console.log(`Batas waktu: ${batasWaktu.toISOString()}`);
  console.log(`Total file ditemukan: ${files.length}`);

  const deletePromises = files.map(async (file) => {
    const [metadata] = await file.getMetadata();
    const updatedTime = new Date(metadata.updated);

    console.log(`Cek: ${file.name} | Updated: ${updatedTime.toISOString()}`);

    if (updatedTime < batasWaktu) {
      console.log(`Menghapus: ${file.name}`);
      return file.delete();
    } else {
      console.log(`Lewati: ${file.name}`);
    }
  });

  await Promise.all(deletePromises);
};

module.exports = { hapusFotoLama };
