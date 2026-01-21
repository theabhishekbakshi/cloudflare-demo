export async function uploadNationImage(
  bucket: R2Bucket,
  base64Image: string,
  nationName: string
) {
  const base64 = base64Image.split(",")[1];
  const bytes = Uint8Array.from(atob(base64), c => c.charCodeAt(0));

  const safeName = nationName.toLowerCase().replace(/\s+/g, "-");
  const path = `nations/${safeName}.png`;

  await bucket.put(path, bytes, {
    httpMetadata: { contentType: "image/png" },
  });

  return path;
}

export async function deleteNationImage(
  bucket: R2Bucket,
  path: string
) {
  await bucket.delete(path);
}
