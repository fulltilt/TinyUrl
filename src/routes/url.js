import uuidv4 from "uuid/v4";
import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
  const urls = await req.context.models.Url.find();
  return res.send(urls);
});

router.get("/find", async (req, res) => {
  const url = await req.context.models.Url.find({ url: req.body.url }, function(
    err,
    data
  ) {
    if (err) res.send(err);
  });
  return res.send(url);
});

function createIdOfSize(n) {
  let i = n;
  let id = "";
  const ALPHANUMERIC =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-";

  while (i-- > 0) {
    id += ALPHANUMERIC[(Math.random() * ALPHANUMERIC.length) | 0];
  }

  return id;
}

async function encode(req) {
  let urlMatches = "";
  let hash = "";
  const PREFIX = "http://tinyurl.com/";

  try {
    hash = PREFIX + createIdOfSize(6);
    urlMatches = await req.context.models.Url.find({
      hash
    });

    while (urlMatches.length > 0) {
      hash = PREFIX + createIdOfSize(6);
      urlMatches = await req.context.models.Url.find({
        hash
      });
    }
  } catch (err) {
    console.log("error", err);
    return;
  }
  return hash;
}

router.post("/", async (req, res) => {
  await req.context.models.Url.find(
    { url: req.body.url },
    async (err, data) => {
      if (err) {
        res.send(err);
        return;
      }

      if (data.length > 0) {
        res.send("Url already exists!");
        return;
      }

      const url = await req.context.models.Url.create({
        hash: await encode(req, req.body.url),
        url: req.body.url,
        user: req.context.me.id
      });

      return res.send(url);
    }
  );
});

router.delete("/:urlId", async (req, res) => {
  const url = await req.context.models.Url.findById(req.params.urlId);

  let result = null;
  if (url) {
    result = await url.remove();
  }

  return res.send(result);
});

export default router;
