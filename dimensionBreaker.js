function dimensionBreaker(multidimArray) {
  let row = []
  return breaker(multidimArray, [])
  .then(rly => {
    return sorter(rly)
  })
  function breaker(target, id) {
    return new Promise(resolve => {
      if (!Array.isArray(target)) {
        resolve(row.push({"id": id, "not": target}))
      }
      else {
        let promiseArray = []
        for (let i in target) {
          promiseArray.push(breaker(target[i], id.concat(i.toString())))
        }
        Promise.all(promiseArray)
        .then(() => {
          resolve(row)
        })
      }
    })
  }
  function sorter(row) {
    let digits = []
    for (let i in row) {
      for (let j in row[i].id) {
        if (digits[j] === undefined) {
          digits[j] = 0
        }
        digits[j] = Math.max(digits[j], row[i].id[j].length)
      }
    }
    for (let i in row) {
      for (let j in row[i].id) {
        row[i].id[j] = `${"0".repeat(digits[j])}${row[i].id[j]}`.slice(1)
      }
      row[i].id.join("")
    }
    return row.sort((a, b) => a.id - b.id).map(rly => [rly.not])
  }
}
