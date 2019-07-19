import uuidv4 from "uuid/v4";
import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
  const urls = await req.context.models.Url.find();
  return res.send(urls);
});

router.get("/:urlId", async (req, res) => {
  const url = await req.context.models.Url.findById(req.params.urlId);
  return res.send(url);
});

router.post("/", async (req, res) => {
  const url = await req.context.models.Url.create({
    url: req.body.url,
    user: req.context.me.id
  });

  return res.send(url);
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
