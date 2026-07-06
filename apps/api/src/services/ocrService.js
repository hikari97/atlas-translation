const { createWorker } = require('tesseract.js');
const path = require('path');

exports.detectText = async (imagePath) => {
  const absolutePath = path.resolve(imagePath);
  console.log(`Starting real OCR on image: ${absolutePath}`);

  // Inisialisasi Tesseract Worker secara lokal untuk bahasa Inggris
  const worker = await createWorker('eng');
  
  try {
    const { data } = await worker.recognize(absolutePath);
    
    // Tesseract mengembalikan data.words yang memuat teks dan bounding box (x0, y0, x1, y1)
    const words = data.words || [];
    console.log(`OCR complete. Found ${words.length} text elements.`);

    // Kelompokkan kata-kata yang berdekatan menjadi baris/balon teks
    const bubbles = [];
    const threshold = 50; // Jarak piksel toleransi pengelompokan kata

    for (const word of words) {
      if (word.confidence < 50 || !word.text.trim()) continue;

      const box = word.bbox;
      const x = box.x0;
      const y = box.y0;
      const w = box.x1 - box.x0;
      const h = box.y1 - box.y0;

      // Cari apakah kata ini berada dekat dengan bubble yang sudah ada
      let merged = false;
      for (const b of bubbles) {
        const nearX = Math.abs(b.x - x) < (b.width + threshold);
        const nearY = Math.abs(b.y - y) < (b.height + threshold);
        if (nearX && nearY) {
          // Gabungkan koordinat bounding box
          const newX = Math.min(b.x, x);
          const newY = Math.min(b.y, y);
          const newW = Math.max(b.x + b.width, x + w) - newX;
          const newH = Math.max(b.y + b.height, y + h) - newY;
          
          b.x = newX;
          b.y = newY;
          b.width = newW;
          b.height = newH;
          b.text = b.text + ' ' + word.text;
          merged = true;
          break;
        }
      }

      if (!merged) {
        bubbles.push({
          text: word.text,
          x,
          y,
          width: w,
          height: h
        });
      }
    }

    await worker.terminate();
    return bubbles;
  } catch (err) {
    await worker.terminate();
    throw err;
  }
};
