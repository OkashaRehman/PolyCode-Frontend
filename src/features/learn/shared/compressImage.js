const MAX_DIMENSION = 1600;
const MAX_BYTES = 1.4 * 1024 * 1024;

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Could not read that image file"));
    img.src = src;
  });
}

function dataUrlBytes(dataUrl) {
  const base64 = dataUrl.slice(dataUrl.indexOf(",") + 1);
  return Math.floor((base64.length * 3) / 4);
}

function encode(img, scale, quality) {
  const width = Math.max(1, Math.round(img.naturalWidth * scale));
  const height = Math.max(1, Math.round(img.naturalHeight * scale));
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, width, height);

  // WebP keeps transparency; browsers that can't encode it return PNG,
  // so fall back to JPEG on a white background.
  let dataUrl = canvas.toDataURL("image/webp", quality);
  if (!dataUrl.startsWith("data:image/webp")) {
    ctx.globalCompositeOperation = "destination-over";
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);
    dataUrl = canvas.toDataURL("image/jpeg", quality);
  }
  return { dataUrl, width, height };
}

/**
 * Downscale and re-encode an image File/Blob so it stays small enough for
 * localStorage and the annotation image upload (max ~1.4 MB).
 */
export async function compressImageFile(file) {
  if (!file || !file.type?.startsWith("image/")) {
    throw new Error("Please choose an image file");
  }

  const objectUrl = URL.createObjectURL(file);
  try {
    const img = await loadImage(objectUrl);
    let scale = Math.min(
      1,
      MAX_DIMENSION / Math.max(img.naturalWidth, img.naturalHeight),
    );
    let quality = 0.85;
    let result = encode(img, scale, quality);

    while (dataUrlBytes(result.dataUrl) > MAX_BYTES && scale > 0.1) {
      scale *= 0.75;
      quality = Math.max(0.6, quality - 0.1);
      result = encode(img, scale, quality);
    }
    return result;
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}
