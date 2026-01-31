function safeSlug(slug?: string) {
  return (slug ?? "player-review")
    .toLowerCase()
    .replace(/\s+/g, "-");
}

export async function uploadPlayerReviewImage(
  bucket: R2Bucket,
  base64Image: string,
  urlSlug?: string
) {
  const base64 = base64Image.split(",")[1];
  const bytes = Uint8Array.from(atob(base64), c => c.charCodeAt(0));

  const path = `player-reviews/${safeSlug(urlSlug)}.png`;

  await bucket.put(path, bytes, {
    httpMetadata: { contentType: "image/png" },
  });

  return path;
}

export async function deletePlayerReviewImage(
  bucket: R2Bucket,
  path: string
) {
  await bucket.delete(path);
}
