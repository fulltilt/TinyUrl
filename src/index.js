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

app.use("/users", routes.user);
app.use("/photos", routes.photo);

// use to seed database
const createUsersWithUrls = async () => {
  const user1 = new models.User({
    username: "rwieruch",
    photos: [],
    following: [],
    followers: []
  });

  const user2 = new models.User({
    username: "ddavids",
    photos: [],
    following: [],
    followers: []
  });

  const user3 = new models.User({
    username: "ttrent",
    photos: [],
    following: [],
    followers: []
  });

  const user4 = new models.User({
    username: "ttrent",
    photos: [],
    following: [],
    followers: []
  });

  const photo1 = new models.Photo({
    url: "https://i.ytimg.com/vi/vGHjbP8qKzc/hqdefault.jpg",
    user: user1.id,
    createdDate: new Date("April 5, 2019")
  });

  const photo2 = new models.Photo({
    url:
      "https://www.moooi.com/sites/default/files/styles/large/public/product-images/random_detail.jpg?itok=ErJveZTY",
    user: user2.id,
    createdDate: new Date("July 10, 2019")
  });

  const photo3 = new models.Photo({
    url:
      "https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fe%2Fec%2FRandomBitmap.png&f=1",
    user: user3.id,
    createdDate: new Date("April 11, 2019")
  });

  const photo4 = new models.Photo({
    url:
      "https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwiujcC0vsvjAhVBJzQIHZpiAA0QjRx6BAgBEAU&url=https%3A%2F%2Fpolymathprojects.org%2F2013%2F03%2F02%2Fpolymath-proposal-tim-gowers-randomized-parallel-sorting-algorithm%2F&psig=AOvVaw2oSHuF9Iy6dH_bRilw3Cav&ust=1563986554212991",
    user: user3.id,
    createdDate: new Date("February 27, 2019")
  });

  const photo5 = new models.Photo({
    url:
      "https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwif-q6vvsvjAhVhJjQIHUNmChwQjRx6BAgBEAU&url=https%3A%2F%2Fatgbcentral.com%2Frandom-image.html&psig=AOvVaw2oSHuF9Iy6dH_bRilw3Cav&ust=1563986554212991",
    user: user3.id,
    createdDate: new Date("March 23, 2019")
  });

  const photo6 = new models.Photo({
    url:
      "https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwieraWbvsvjAhURPH0KHdxcDVkQjRx6BAgBEAU&url=https%3A%2F%2Fonlinejpgtools.com%2Fgenerate-random-jpg&psig=AOvVaw2oSHuF9Iy6dH_bRilw3Cav&ust=1563986554212991",
    user: user3.id,
    createdDate: new Date("June 20, 2019")
  });

  const photo7 = new models.Photo({
    url:
      "https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwjjurSVvsvjAhXEoFsKHe0fBuMQjRx6BAgBEAU&url=https%3A%2F%2Fclimatecommunication.yale.edu%2Fpublications%2Fnature-stable-delicate-random%2F&psig=AOvVaw2oSHuF9Iy6dH_bRilw3Cav&ust=1563986554212991",
    user: user4.id,
    createdDate: new Date("April 9, 2019")
  });

  const photo8 = new models.Photo({
    url:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTS1hevM-88hmiqyYOeeCeVUTzCS63jl31LEyLAIjY7AKWXDVe",
    user: user2.id,
    createdDate: new Date("May 5, 2019")
  });

  const photo9 = new models.Photo({
    url:
      "https://proxy.duckduckgo.com/iu/?u=http%3A%2F%2Fimages5.fanpop.com%2Fimage%2Fphotos%2F30400000%2FWorld-map-random-30415186-1280-1024.jpg&f=1",
    user: user1.id,
    createdDate: new Date("February 6, 2019")
  });

  const photo10 = new models.Photo({
    url:
      "https://noeljesse.com/wp-content/uploads/2017/09/89716241_thinkstockphotos-523060154.jpg",
    user: user1.id,
    createdDate: new Date("January 2, 2019")
  });

  const photo11 = new models.Photo({
    url:
      "https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.nhr1axI4z9DGuMafgmEaDAAAAA%26pid%3DApi&f=1",
    user: user4.id,
    createdDate: new Date("July 4, 2019")
  });

  await photo1.save();
  await photo2.save();
  await photo3.save();
  await photo4.save();
  await photo5.save();
  await photo6.save();
  await photo7.save();
  await photo8.save();
  await photo9.save();
  await photo10.save();
  await photo11.save();

  user1.photos.push(photo1.id);
  user1.photos.push(photo9.id);
  user1.photos.push(photo10.id);
  user1.followers.push(user2);
  user1.followers.push(user3);
  await user1.save();
  user2.photos.push(photo2.id);
  user2.photos.push(photo8.id);
  user1.followers.push(user4);
  user2.following.push(user1);
  user2.following.push(user3);
  await user2.save();
  user3.photos.push(photo3.id);
  user3.photos.push(photo4.id);
  user3.photos.push(photo5.id);
  user3.photos.push(photo6.id);
  user3.following.push(user1);
  user3.followers.push(user2);
  await user3.save();
  user4.photos.push(photo7.id);
  user4.photos.push(photo11.id);
  user4.following.push(user2);
  await user3.save();
};

const eraseDatabaseOnSync = true;

connectDb().then(async () => {
  if (eraseDatabaseOnSync) {
    await Promise.all([
      models.User.deleteMany({}),
      models.Photo.deleteMany({})
    ]);

    createUsersWithUrls();
  }

  app.listen(process.env.PORT, () =>
    console.log(`Example app listening on port ${process.env.PORT}!`)
  );
});
