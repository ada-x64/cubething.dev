export function formatTime(mtime: Date | null) {
  if (mtime !== null) {
    return mtime.toLocaleDateString("en-us", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } else {
    return null;
  }
}
