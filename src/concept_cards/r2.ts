export async function uploadConceptCardImage(
  bucket: R2Bucket,
  base64Image: string,
  title?: string
) {
  const base64 = base64Image.split(",")[1];
  const bytes = Uint8Array.from(atob(base64), c => c.charCodeAt(0));

  const safeName = (title ?? "card")
    .toLowerCase()
    .replace(/\s+/g, "-");

  const path = `concept-cards/${safeName}-${Date.now()}.png`;

  await bucket.put(path, bytes, {
    httpMetadata: { contentType: "image/png" },
  });

  return path;
}

export async function deleteConceptCardImage(
  bucket: R2Bucket,
  path: string
) {
  await bucket.delete(path);
}
