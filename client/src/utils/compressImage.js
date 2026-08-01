/**
 * compressImage — client-side image compression before upload.
 * ==============================================================
 * Mod images & the site logo are stored in MongoDB as base64 data URLs,
 * so their size directly affects every page load. Compressing before
 * upload keeps the database (and API responses) dramatically smaller.
 *
 * Usage:
 *   const file = await compressImage(rawFile, { maxSize: 900, quality: 0.82 });
 *   fd.append('image', file);
 */

export function compressImage(file, { maxSize = 900, quality = 0.82 } = {}) {
  return new Promise((resolve, reject) => {
    // Already small (<=300KB) — keep original, preserves PNG transparency
    if (file.size <= 300 * 1024) return resolve(file);

    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        if (width <= maxSize && height <= maxSize && file.size <= 1024 * 1024) {
          return resolve(file);
        }
        const scale = Math.min(1, maxSize / Math.max(width, height));
        width = Math.max(1, Math.round(width * scale));
        height = Math.max(1, Math.round(height * scale));
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        // Keep PNG (transparency) for PNGs, JPEG for photos
        const type = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
        canvas.toBlob(
          (blob) => {
            if (!blob) return reject(new Error('Compression failed'));
            resolve(new File([blob], file.name.replace(/\.[^.]+$/, '') + (type === 'image/png' ? '.png' : '.jpg'), { type }));
          },
          type,
          type === 'image/png' ? 0.9 : quality
        );
      };
      img.onerror = () => reject(new Error('Invalid image file'));
      img.src = reader.result;
    };
    reader.onerror = () => reject(new Error('Could not read file'));
    reader.readAsDataURL(file);
  });
}
