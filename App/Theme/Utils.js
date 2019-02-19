export const sanitize = (string) => (
  string
    .replace(/&shy;/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&gt;/g, ">")
    .replace(/&lt;/g, "<")
    .replace(/&quot;/g, "'")
    .replace(/&#039;/g,"'")
    .replace(/&rdquo;/g, '"')
    .replace(/&uuml;/g, '"')
    .replace(/&ldquo;/g,'"')
)