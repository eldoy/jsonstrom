const fs = require('fs')
const { Writable } = require('stream')
const { chain } = require('stream-chain')
const { parser } = require('stream-json')
const { streamArray } = require('stream-json/streamers/StreamArray')

module.exports = function (filename, onData) {
  let count = 0
  const writer = new Writable({
    write: function ({ key, value }, encoding, callback) {
      ++count
      ;(async function () {
        if (typeof onData == 'function') {
          await onData({ count, key, value })
        }
        callback()
      })()
    },
    objectMode: true
  })

  const pipeline = chain([
    fs.createReadStream(filename),
    parser(),
    streamArray(),
    writer
  ])

  return new Promise((resolve, reject) => {
    pipeline.on('end', function () {
      resolve({ count })
    })
    pipeline.on('error', function (error) {
      reject(error)
    })
  })
}
