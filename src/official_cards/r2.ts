function safeName(name?: string) {
  return (name ?? "official-card")
    .toLowerCase()
    .replace(/\s+/g, "-");
}

export async function uploadOfficialCardImage(
  bucket: R2Bucket,
  base64Image: string,
  title?: string
) {
  const base64 = base64Image.split(",")[1];
  const bytes = Uint8Array.from(atob(base64), c => c.charCodeAt(0));

  const path = `official-cards/${safeName(title)}-${Date.now()}.png`;

  await bucket.put(path, bytes, {
    httpMetadata: { contentType: "image/png" },
  });

  return path;
}

export async function uploadAnimatedCard(
  bucket: R2Bucket,
  base64Image: string,
  title?: string
) {
  const base64 = base64Image.split(",")[1];
  const bytes = Uint8Array.from(atob(base64), c => c.charCodeAt(0));

  const path = `official-cards/animated/${safeName(title)}-${Date.now()}.gif`;

  await bucket.put(path, bytes, {
    httpMetadata: { contentType: "image/gif" },
  });

  return path;
}

export async function deleteOfficialCardImage(
  bucket: R2Bucket,
  path: string
) {
  await bucket.delete(path);
}
