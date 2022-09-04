function esc(r) {
  return r
  .replace(/\//g, "\\/")
  .replace(/\\/g, "\\\\")
  .replace(/\^/g, "\\^")
  .replace(/\$/g, "\\$")
  .replace(/\*/g, "\\*")
  .replace(/\+/g, "\\+")
  .replace(/\?/g, "\\?")
  .replace(/\./g, "\\.")
  .replace(/\(/g, "\\(")
  .replace(/\)/g, "\\)")
  .replace(/\[/g, "\\[")
  .replace(/\]/g, "\\]")
  .replace(/\{/g, "\\{")
  .replace(/\}/g, "\\}")
}
function unEsc(r) {
  return r
  .replace(/\\\//g, "/")
  .replace(/\\\\/g, "\\")
  .replace(/\\\^/g, "^")
  .replace(/\\\$/g, "$")
  .replace(/\\\*/g, "*")
  .replace(/\\\+/g, "+")
  .replace(/\\\?/g, "?")
  .replace(/\\\./g, ".")
  .replace(/\\\(/g, "(")
  .replace(/\\\)/g, ")")
  .replace(/\\\[/g, "[")
  .replace(/\\\]/g, "]")
  .replace(/\\\{/g, "{")
  .replace(/\\\}/g, "}")
}
