const assert = require('assert')
const jsonstrom = require('../index.js')
const root = process.cwd() + '/test'
const input = `${root}/nace-codes.json`

async function main() {
  console.time('Processing')
  let n = 0
  const { count } = await jsonstrom(input, async function ({ value }) {
    n++
  })
  console.timeEnd('Processing')
  console.log(`Read ${n} of ${count} JSON objects`)
  assert.ok(n == count)
}

main()
