function esc(data) {
  return data.replace(/\//g, "\\/")
             .replace(/\\/g, "\\\\")
             .replace(/\^/g, "\\^")
             .replace(/\$/g, "\\$")
             .replace(/\*/g, "\\*")
             .replace(/\+/g, "\\+")
             .replace(/\?/g, "\\?")
             .replace(/\./g, "\\.")
             .replace(/\(/g, "\\(")
             .replace(/\[/g, "\\[")
}
function unEsc(data) {
  return data.replace(/\\\//g, "/")
             .replace(/\\\\/g, "\\")
             .replace(/\\\^/g, "^")
             .replace(/\\\$/g, "$")
             .replace(/\\\*/g, "*")
             .replace(/\\\+/g, "+")
             .replace(/\\\?/g, "?")
             .replace(/\\\./g, ".")
             .replace(/\\\(/g, "(")
             .replace(/\\\[/g, "[")
}
