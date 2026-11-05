import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const SOURCE_DIR = path.resolve('headphone_frames_folder');
const OUTPUT_DIR = path.resolve('public/frames');
const TARGET_WIDTH = 3840;
const TARGET_HEIGHT = 2160;
const TOTAL_FRAMES = 240;

async function convertFrames() {
  console.log(`Starting conversion of ${TOTAL_FRAMES} frames to 4K (${TARGET_WIDTH}x${TARGET_HEIGHT}) .webp...`);
  const startTime = Date.now();

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const tasks = [];
  for (let i = 1; i <= TOTAL_FRAMES; i++) {
    tasks.push({
      index: i,
      input: path.join(SOURCE_DIR, `frame_${i}.jpg`),
      output: path.join(OUTPUT_DIR, `frame_${i}.webp`)
    });
  }

  let completed = 0;
  const CONCURRENCY = 8;
  let activeIndex = 0;

  async function worker() {
    while (activeIndex < tasks.length) {
      const current = tasks[activeIndex++];
      if (!fs.existsSync(current.input)) {
        console.error(`Input file missing: ${current.input}`);
        continue;
      }

      await sharp(current.input)
        .resize(TARGET_WIDTH, TARGET_HEIGHT, {
          kernel: sharp.kernel.lanczos3,
          fit: 'fill'
        })
        .webp({
          quality: 82,
          effort: 4
        })
        .toFile(current.output);

      completed++;
      if (completed % 20 === 0 || completed === TOTAL_FRAMES) {
        const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
        console.log(`[${completed}/${TOTAL_FRAMES}] frames converted (${((completed / TOTAL_FRAMES) * 100).toFixed(0)}%) - ${elapsed}s elapsed`);
      }
    }
  }

  const workers = Array.from({ length: CONCURRENCY }, () => worker());
  await Promise.all(workers);

  const totalTime = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`Conversion completed in ${totalTime}s.`);
}

convertFrames().catch((err) => {
  console.error('Error during conversion:', err);
  process.exit(1);
});

