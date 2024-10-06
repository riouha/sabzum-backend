export function slugify(str: string) {
  return str
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\u0600-\u06FF-\u200c\u2009]/g, '')
    .replace(/-+/g, '-');
}
