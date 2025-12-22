export async function uploadReviewImage(
  bucket: R2Bucket,
  base64Image: string,
  filename: string
): Promise<string> {
  const base64 = base64Image.split(",")[1];
  const bytes = Uint8Array.from(atob(base64), c => c.charCodeAt(0));

  const path = `reviews/${filename}`;

  await bucket.put(path, bytes, {
    httpMetadata: { contentType: "image/png" },
  });

  return path;
}
