export async function uploadNomineeImage(
  bucket: R2Bucket,
  base64Image: string,
  slot: number,      // 1–20
  slug: string
) {
  const base64 = base64Image.split(",")[1];
  const bytes = Uint8Array.from(atob(base64), c => c.charCodeAt(0));

  const path = `nominees/${slug}/Nm${slot}.png`;

  await bucket.put(path, bytes, {
    httpMetadata: { contentType: "image/png" },
  });

  return path;
}

export async function deleteNomineeImage(
  bucket: R2Bucket,
  path: string
) {
  await bucket.delete(path);
}
