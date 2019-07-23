import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
  const users = await req.context.models.User.find();
  return res.send(users);
});

router.get("/photos/:username", async (req, res) => {
  const user = await req.context.models.User.find({
    username: req.params.username
  }).populate("photos");

  return res.send(user[0].photos);
});

router.get("/followers/:username", async (req, res) => {
  const user = await req.context.models.User.find({
    username: req.params.username
  }).populate("followers");

  return res.send(user[0].followers);
});

router.get("/following/:username", async (req, res) => {
  const user = await req.context.models.User.find({
    username: req.params.username
  }).populate("following");

  return res.send(user[0].following);
});

router.get("/newsfeed/:username", async (req, res) => {
  // find username and expand the people they're following and from there, expand their photos
  const user = await req.context.models.User.find({
    username: req.params.username
  }).populate({
    path: "following",
    populate: {
      path: "photos"
    }
  });

  // aggregate photos
  let aggregatedPhotos = user[0].following.map(user =>
    user.photos.map(photo => ({
      photo: photo.url,
      date: photo.createdDate,
      username: user.username
    }))
  );

  let date4MonthsAgo = new Date().setMonth(new Date().getMonth() - 4);

  res.send(
    [].concat
      .apply([], aggregatedPhotos) // flatten array
      .filter(photo => photo.date >= date4MonthsAgo) // filter photos from 4 months ago to present
      .sort((a, b) => new Date(b.date) - new Date(a.date)) // sort
  );
});

export default router;
