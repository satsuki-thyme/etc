function generatorMultidimObject(length, property_array, fill) {
  object = []
  for (var i = length - 1; i >= 0; i--) {
    object[i] = {}
    for (var j = property_array.length - 1; j >= 0; j--) {
      object[i][property_array[j]] = fill
    }
  }
  return object
}
