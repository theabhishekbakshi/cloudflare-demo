function safeName(name?: string) {
  return (name ?? "player")
    .toLowerCase()
    .replace(/\s+/g, "-");
}

export async function uploadPlayerImage(
  bucket: R2Bucket,
  base64Image: string,
  slot: string, // cardimg, headshot, nation, league, club
  playerName?: string
) {
  const base64 = base64Image.split(",")[1];
  const bytes = Uint8Array.from(atob(base64), c => c.charCodeAt(0));

  const path = `player-database/${safeName(playerName)}/${slot}.png`;

  await bucket.put(path, bytes, {
    httpMetadata: { contentType: "image/png" },
  });

  return path;
}

export async function deletePlayerImage(
  bucket: R2Bucket,
  path: string
) {
  await bucket.delete(path);
}
