import axios from "axios";
import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
  const photos = await req.context.models.Photo.find();
  return res.send(photos);
});

router.get("/user/:id", async (req, res) => {
  const url = await req.context.models.Photo.find(
    { url: req.params.id },
    function(err, data) {
      if (err) res.send(err);
    }
  );
  return res.send(url);
});

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
        hash: await axios.get("http://localhost:3001").then(res => res.data),
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
