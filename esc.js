function esc(r) {
  if (typeof r === "string" || r instanceof String) return p(r)
  else if (Array.isArray(r)) return r.map(r => r = p(r))
  else return r
  function p(r) {
    return r.replace(/(\/|\\|\^|\$|\*|\+|\?|\.|\(|\)|\[|\]|\{|\})/g, "\\$1")
  }
}
function unEsc(r) {
  if (typeof r === "string" || r instanceof String) return p(r)
  else if (Array.isArray(r)) return r.map(r => r = p(r))
  else return r
  function p(r) {
    return r.replace(/\\(\/|\\|\^|\$|\*|\+|\?|\.|\(|\)|\[|\]|\{|\})/g, "$1")
  }
}
