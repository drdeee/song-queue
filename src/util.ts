export function classes(
  base: string,
  dynamic: { [key: string]: boolean } = {}
) {
  return [...Object.keys(dynamic).filter((k) => dynamic[k]), base].join(" ");
}
