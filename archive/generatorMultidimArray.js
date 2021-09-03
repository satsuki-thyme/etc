function generatorMultidimArray(length, number_of_properties, fill) {
  var dfr = $.Deferred()
  var array = new Array(length)
  for (var i = length - 1; i >= -1; i--) {
    if (i === -1) {
      dfr.resolve()
    } else {
      array[i] = new Array(number_of_properties)
      for (var j = number_of_properties - 1; j >= 0; j--) {
        array[i][j] = fill
      }
    }
  }
  return dfr.promise(array)
}
