/**
 * Upload a player render image to R2
 */
export async function uploadPlayerRenderImage(
  bucket: R2Bucket,
  base64Image: string,
  filename: string
) {
  const base64 = base64Image.split(",")[1];
  const bytes = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));

  const path = `player-renders/${filename}`;

  await bucket.put(path, bytes, {
    httpMetadata: {
      contentType: "image/png",
    },
  });

  return path;
}

/**
 * Delete a player render image from R2
 */
export async function deletePlayerRenderImage(
  bucket: R2Bucket,
  path: string
) {
  await bucket.delete(path);
}
