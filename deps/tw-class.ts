export default function TwClass(
  params:
    | {
      light?: string[];
      dark?: string[];
    }
    | string[],
) {
  if (Array.isArray(params)) {
    return params.join(" ");
  } else {
    return [
      params.light?.join(" "),
      params.dark?.map((item) => `dark:${item}`).join(" "),
    ].join(" ");
  }
}
