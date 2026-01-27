export async function uploadTop5MidImage(
  bucket: R2Bucket,
  base64Image: string,
  slot: string, // img_1, wf1, sm1, st1...
  title?: string
) {
  const base64 = base64Image.split(",")[1];
  const bytes = Uint8Array.from(atob(base64), c => c.charCodeAt(0));

  const safeTitle = (title ?? "top-5-mid")
    .toLowerCase()
    .replace(/\s+/g, "-");

  const path = `top-5-mid-cards/${safeTitle}/${slot}.png`;

  await bucket.put(path, bytes, {
    httpMetadata: { contentType: "image/png" },
  });

  return path;
}

export async function deleteTop5MidImage(
  bucket: R2Bucket,
  path: string
) {
  await bucket.delete(path);
}
