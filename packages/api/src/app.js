const express = require("express");
const cors = require("cors");
const app = express();
const port = 8000;
const { Readable } = require("stream");

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

app.use(cors());

app.get("/st", async (req, res) => {
  const readStream = new Readable({
    read() {},
  });
  readStream.pipe(res);

  await sleep(1000);
  // データをストリームに追加
  readStream.push(
    JSON.stringify({
      preceded: "hello!!",
    }) + "\n"
  );
  await sleep(2000);
  readStream.push(JSON.stringify({ message: "foobar san." }) + "\n");
  readStream.push(null); // ストリームの終了を示す
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
