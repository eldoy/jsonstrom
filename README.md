# JSONStrom

Streaming JSON file reader library. Works well for large files.

### Usage

```js
const { count } = await jsonstrom('codes.json', async function ({ value }) {
  // The read object is available here
  console.log(value)
})
```

WTFPL Licensed. Enjoy!
