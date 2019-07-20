import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import models, { connectDb } from "./models";
import routes from "./routes";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(async (req, res, next) => {
  req.context = {
    models,
    me: await models.User.findByLogin("rwieruch")
  };
  next();
});

app.use("/session", routes.session);
app.use("/users", routes.user);
app.use("/urls", routes.url);

app.get("/:hash", async (req, res) => {
  const PREFIX = "http://tinyurl.com/";
  const url = await req.context.models.Url.find(
    { hash: PREFIX + req.params.hash },
    function(err, data) {
      if (err) res.send(err);
    }
  );
  return res.send(url[0].url);
});

// use to seed database
const createUsersWithUrls = async () => {
  const user1 = new models.User({
    username: "rwieruch"
  });

  const user2 = new models.User({
    username: "ddavids"
  });

  const url1 = new models.Url({
    hash: "123",
    url: "Published the Road to learn React",
    user: user1.id
  });

  const url2 = new models.Url({
    hash: "1234",
    url: "Happy to release ...",
    user: user2.id
  });

  const url3 = new models.Url({
    hash: "1235",
    url: "Published a complete ...",
    user: user2.id
  });

  await url1.save();
  await url2.save();
  await url3.save();

  await user1.save();
  await user2.save();
};

const eraseDatabaseOnSync = true;

connectDb().then(async () => {
  if (eraseDatabaseOnSync) {
    await Promise.all([models.User.deleteMany({}), models.Url.deleteMany({})]);

    createUsersWithUrls();
  }

  app.listen(process.env.PORT, () =>
    console.log(`Example app listening on port ${process.env.PORT}!`)
  );
});
