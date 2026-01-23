function safeName(title?: string) {
  return (title ?? "other-version-card")
    .toLowerCase()
    .replace(/\s+/g, "-");
}

export async function uploadOtherVersionCardImage(
  bucket: R2Bucket,
  base64Image: string,
  title?: string
) {
  const base64 = base64Image.split(",")[1];
  const bytes = Uint8Array.from(atob(base64), c => c.charCodeAt(0));

  const path = `other-version-cards/${safeName(title)}-${Date.now()}.png`;

  await bucket.put(path, bytes, {
    httpMetadata: { contentType: "image/png" },
  });

  return path;
}

export async function deleteOtherVersionCardImage(
  bucket: R2Bucket,
  path: string
) {
  await bucket.delete(path);
}
