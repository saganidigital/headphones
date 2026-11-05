import { useState, useEffect, useRef } from "react";

const TOTAL_FRAMES = 240;

export function useFramePreloader() {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [images, setImages] = useState([]);
  const imagesRef = useRef([]);

  useEffect(() => {
    let isCancelled = false;
    let loadedCount = 0;
    const loadedImages = new Array(TOTAL_FRAMES);

    // Concurrency limit for smooth network pipeline
    const concurrency = 16;
    let currentIndex = 1;

    const loadNext = () => {
      if (isCancelled || currentIndex > TOTAL_FRAMES) return;

      const frameIndex = currentIndex++;
      const img = new Image();
      img.src = `/frames/frame_${frameIndex}.webp`;

      const onImageReady = () => {
        if (isCancelled) return;
        loadedImages[frameIndex - 1] = img;
        loadedCount++;
        const currentPercent = Math.min(100, Math.round((loadedCount / TOTAL_FRAMES) * 100));
        setProgress(currentPercent);

        if (loadedCount === TOTAL_FRAMES) {
          imagesRef.current = loadedImages;
          setImages(loadedImages);
          setIsLoaded(true);
        } else {
          loadNext();
        }
      };

      img.onload = () => {
        if (img.decode) {
          img.decode().then(onImageReady).catch(onImageReady);
        } else {
          onImageReady();
        }
      };

      img.onerror = () => {
        console.warn(`Failed to load frame ${frameIndex}`);
        onImageReady();
      };
    };

    // Kick off pool
    const poolSize = Math.min(concurrency, TOTAL_FRAMES);
    for (let i = 0; i < poolSize; i++) {
      loadNext();
    }

    return () => {
      isCancelled = true;
    };
  }, []);

  return { progress, isLoaded, images, totalFrames: TOTAL_FRAMES };
}
