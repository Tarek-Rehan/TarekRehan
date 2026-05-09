/**
 * Compresses an image using a canvas to reduce its storage size.
 * @param {string} base64Str - The source base64 image string.
 * @param {number} maxWidth - Max width for the compressed image.
 * @param {number} maxHeight - Max height for the compressed image.
 * @param {number} quality - Compression quality (0 to 1).
 * @returns {Promise<string>} - The compressed base64 image string.
 */
export const compressImage = (base64Str, maxWidth = 1200, maxHeight = 1200, quality = 0.7) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = base64Str;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;

      // Calculate new dimensions while maintaining aspect ratio
      if (width > height) {
        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width *= maxHeight / height;
          height = maxHeight;
        }
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);
      
      const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
      resolve(compressedBase64);
    };
    img.onerror = (err) => reject(err);
  });
};
