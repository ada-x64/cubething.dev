export function getTime(mtime: Date | null) {
  if (mtime !== null) {
    const dateString = mtime.toLocaleDateString("en-us", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
    return `Last modified ${dateString}`;
  } else {
    return null;
  }
}
