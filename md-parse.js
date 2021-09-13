function mdParse(src, opt) {
  let work0 = src
  .replace(/(\r?\n|\r)/g, '\n')
  .replace(/ {2}$/gm, '<br>')
  .replace(/^#{1} (.*)$/gm, '<h1>$1</h1>')
  .replace(/^#{2} (.*)$/gm, '<h2>$1</h2>')
  .replace(/^#{3} (.*)$/gm, '<h3>$1</h3>')
  .replace(/^#{4} (.*)$/gm, '<h4>$1</h4>')
  .replace(/^#{5} (.*)$/gm, '<h5>$1</h5>')
  .replace(/^#{6} (.*)$/gm, '<h6>$1</h6>')
  .replace(/\*{3}(.+?)\*{3}/gm, '<strong><em>$1</em></strong>')
  .replace(/_{3}(.+?)_{3}/gm, '<strong><em>$1</em></strong>')
  .replace(/\*{2}(.+?)\*{2}/gm, '<strong>$1</strong>')
  .replace(/_{2}(.+?)_{2}/gm, '<strong>$1</strong>')
  .replace(/\*{1}([^ *][^*]*)\*{1}/gm, '<em>$1</em>')
  .replace(/_{1}([^_]+)_{1}/gm, '<em>$1</em>')
  .replace(/~{2}(.*?)~{2}/gm, '<s>$1</s>')
  .replace(/`{1}([^`]+)`{1}/gm, '<code>$1</code>')
  .replace(/\[(.*?)\]\((.*?)\)/gm, '<a href="$2">$1</a>')
  .replace(/!\[(.*?)\]\((.*?)( "(.*?)")?\)/gm, '<img src="$2" alt="$1" name="$4">')
  .replace(/^([ \t]*(\*|\+|-) )\[ ?\](.*)$/gm, '<label><input type="checkbox">$3</label>')
  .replace(/^([ \t]*(\*|\+|-) )\[[xX]\](.*)$/gm, '<label><input type="checkbox" checked>$3</label>')
  .replace(/^[ \t]*(\*[ \t]*){3,}$/gm, '<hr>')
  .replace(/^[ \t]*(-[ \t]*){3,}$/gm, '<hr>')
  //.replace(//gm, '')
  //.replace(//gm, '')
  //.replace(//gm, '')
  //.replace(//gm, '')
  let lnArr = work0.split('\n')
  let lnObj = {}
  let lnLen = lnArr.length
  let txtMass = ''
  let lstTypeArr = []
  /*

    各行を連想配列に入れ、タグ名ごとに必要な情報を付加する

  */
  for (let i = 0; lnLen - 1 >= i; i++) {
    let lnWork0 = lnArr[i]
    lnObj[i] = {}
    lnObj[i]['txt'] = lnWork0
    lnObj[i]['procUnit'] = 'p'
    lnObj[i]['lstLv'] = 0
    /*
     heading
    */
    if (lnObj[i]['txt'].match(/^<h\d>/)) {
      lnObj[i]['procUnit'] = 'h'
    }
    /*
      horizontal rule
    */
    else if (lnObj[i]['txt'] === '<hr>') {
      lnObj[i]['procUnit'] = 'hr'
    }
    /*
      list
    */
    else if (lnWork0.match(/^[ \t]*(\*|\+|-|\d+\.) /)) {
      lnObj[i]['procUnit'] = 'lst'
      lnObj[i]['lstLv'] = lnWork0.replace(/^([ \t]*).*/, '$1').length + 1
      if (!lnWork0.match(/^[ \t]*(\*|\+|-) /) === false) {
        lnObj[i]['lstType'] = 'm'
      } else if (!lnWork0.match(/^[ \t]*\d+\. /) === false) {
        lnObj[i]['lstType'] = 'd'
      }
    }
    /*
      table
    */
    else if (lnWork0.match(/^\|.*\|$/)) {
      lnObj[i]['procUnit'] = 'tbl'
    }
    /*
      blockquotes
    */
    else if (lnWork0.match(/^>+ /)) {
      lnObj[i]['procUnit'] = 'bq'
    }
    /*
      pre
    */
    else if (lnWork0.match(/^ {3,}/)) {
      lnObj[i]['procUnit'] = 'pre'
    }
  }
  /*

    連想配列の各行について処理をする

  */
  for (let i = 0; lnLen - 1 >= i; i++) {
    /*
      paragraph
    */
    if (lnObj[i]['procUnit'] === 'p') {
      if (
        i !== 0
        &&
        i !== lnLen - 1
      ) {
        if (
          lnObj[i]['txt'] !== ''
          &&
          (
            lnObj[i - 1]['procUnit'] !== 'p'
            ||
            lnObj[i - 1]['txt'] === ''
            ||
            lnObj[i - 1]['txt'] === '<p><\/p>'
          )
          &&
          (
            lnObj[i + 1]['procUnit'] === 'p'
            &&
            lnObj[i + 1]['txt'] !== ''
          )
        ) {
          lnObj[i]['txt'] = '<p>' + lnObj[i]['txt']
        } else if (
          lnObj[i]['txt'] !== ''
          &&
          (
            lnObj[i - 1]['procUnit'] === 'p'
            &&
            lnObj[i - 1]['txt'] !== ''
          )
          &&
          (
            lnObj[i + 1]['procUnit'] !== 'p'
            ||
            lnObj[i + 1]['txt'] === ''
          )
        ) {
          lnObj[i]['txt'] = lnObj[i]['txt'] + '<\/p>'
        } else if (
          (
            lnObj[i]['txt'] !== ''
            &&
            (
              (
                lnObj[i - 1]['procUnit'] !== 'p'
                ||
                lnObj[i - 1]['txt'] === ''
              )
              &&
              (
                lnObj[i + 1]['procUnit'] !== 'p'
                ||
                lnObj[i + 1]['txt'] === ''
              )
            )
          )
          ||
          (
            lnObj[i]['txt'] === ''
            &&
            (
              lnObj[i - 1]['txt'] === ''
              ||
              lnObj[i - 1]['txt'] === '<p><\/p>'
            )
          )
        ) {
          lnObj[i]['txt'] = '<p>' + lnObj[i]['txt'] + '<\/p>'
        }
      } else if (
        i === 0
        &&
        i !== lnLen - 1
      ) {
        lnObj[i]['txt'] = '<p>' + lnObj[i]['txt']
      } else if (
        i === lnLen - 1
      ) {
        lnObj[i]['txt'] = '<p>' + lnObj[i]['txt'] + '<\/p>'
      }
    }
    /*
      list
    */
    else if (lnObj[i]['procUnit'] === 'lst') {
      let lstLvCrr = lnObj[i]['lstLv']
      let lstPre = ''
      let lstLvPre = -1
      let lstPst = ''
      let lstLvPst = -1
      if (i !== 0) {
        lstPre = lnObj[i - 1]['procUnit']
        lstLvPre = lnObj[i - 1]['lstLv']
      }
      if (i !== lnLen - 1) {
        lstPst = lnObj[i + 1]['procUnit']
        lstLvPst = lnObj[i + 1]['lstLv']
      }
      lnWork1 = lnObj[i]['txt']
      if (
      /* listが始まる */
        (
          i === 0
          &&
          i !== lnLen - 1
        )
        ||
        (
          i !== 1
          &&
          i !== lnLen - 1
          &&
          lstPre !== 'lst'
          &&
          lstPst === 'lst'
        )
        ||
        (
          i !== 0
          &&
          i !== lnLen - 1
          &&
          lstLvCrr > lstLvPre
          &&
          lstLvCrr <= lstLvPst
        )
      ) {
        lnObj[i]['txt'] = lstStart(lnWork1, i) // <= 処理部分
      } else if (
      /* listが続く */
        i !== 0
        &&
        i !== lnLen - 1
        &&
        lstLvCrr <= lstLvPre
        &&
        lstLvCrr <= lstLvPst
      ) {
        lnObj[i]['txt'] = lstContinue(lnWork1) // <= 処理部分
      } else if (
      /* listが終わる */
        (
          i !== 0
          &&
          i === lnLen - 1
        )
        ||
        (
          lstPre === 'lst'
          &&
          lstPst !== 'lst'
        )
        ||
        (
          i !== 0
          &&
          i !== lnLen - 1
          &&
          lstLvCrr <= lstLvPre
          &&
          lstLvCrr > lstLvPst
        )
      ) {
        lnObj[i]['txt'] = lstEnd(lnWork1, lstPst, lstLvCrr, lstLvPst) // <= 処理部分
      } else if (
      /* 始まりかつ終わりの行 */
        (
          i !== 0
          &&
          i !== lnLen - 1
          &&
          lstPre !== 'lst'
          &&
          (
            lstPst !== 'lst'
            ||
            lstLvCrr > lstLvPre
          )
        )
        ||
        (
          i !== 0
          &&
          i !== lnLen - 1
          &&
          lstLvCrr > lstLvPre
          &&
          (
            lstLvCrr > lstLvPst
            ||
            lstPst !== 'lst'
          )
        )
      ) {
        lnObj[i]['txt'] = lstEnd(lstStart(lnWork1, i), lstPst, lstLvCrr, lstLvPst) // <= 処理部分
      }
    }
    /*
      table
    */
    else if (lnObj[i]['procUnit'] === 'tbl') {
      let vBar = lnObj[i]['vBar']
      if (
          (
            i === 0
            ||
            lnObj[i - 1]['vBar'] === 0
          )
        &&
        i !== lnLen + 1
        &&
        lnObj[i]['vBar'] >= 1
        &&
        lnObj[i + 1]['vBar'] >= 1
      ) {
        lnObj[i]['txt'] = tblStart()
      }
    }
    /*
      連想配列に入っている各行をつなげる
    */
    txtMass += lnObj[i]['txt'] + '\n'
  }
  return txtMass
  /*

    関数

  */
  function lstStart(txt, i) {
    if (lnObj[i]['lstType'] === 'm') {
      lstTypeArr.push('m')
      return txt.replace(/^[ \t]*(\*|\+|-) (.*)$/, '<ul><li>$2<\/li>')
    } else if (lnObj[i]['lstType'] === 'd') {
      lstTypeArr.push('d')
      return txt.replace(/^[ \t]*(\d+\.) (.*)$/, '<ol><li>$2<\/li>')
    }
  }
  function lstContinue(txt) {
    return txt.replace(/^[ \t]*(\*|\+|-|\d+\.) (.*)$/, '<li>$2<\/li>')
  }
  function lstEnd(txt, lstPst, lstLvCrr, lstLvPst) {
    let lnWork2 = txt.replace(/^[ \t]*(\*|\+|-|\d+\.) (.*)$/, '<li>$2<\/li>')
    let lstLvDiff = 0
    if (lstPst === 'lst') {
      lstLvDiff = lstLvCrr - lstLvPst
    } else {
      lstLvDiff = lstLvCrr
    }
    for (let j = 0; lstLvDiff > j; j++) {
      lstTypeArrWork = lstTypeArr.pop()
      if (lstTypeArrWork === 'm') {
        lnWork2 = lnWork2 + '<\/ul>'
      } else if (lstTypeArrWork === 'd') {
        lnWork2 = lnWork2 + '<\/ol>'
      }
    }
    return lnWork2
  }
  function tblStart(i, txt) {
    
  }
}
