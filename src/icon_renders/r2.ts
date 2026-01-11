export async function uploadIconImage(
  bucket: R2Bucket,
  base64Image: string,
  filename: string
) {
  const base64 = base64Image.split(",")[1];
  const bytes = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));

  const path = `icon-renders/${filename}`;

  await bucket.put(path, bytes, {
    httpMetadata: { contentType: "image/png" },
  });

  return path;
}

export async function deleteIconImage(bucket: R2Bucket, path: string) {
  await bucket.delete(path);
}
