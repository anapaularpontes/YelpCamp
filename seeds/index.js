const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");

mongoose.connect("mongodb://127.0.0.1:27017/yelpCampDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});

  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: '648cf40d16f713a53e226549',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!",
      price,
      images: [
        {
            url: 'https://res.cloudinary.com/dxbjyq9hm/image/upload/v1687395171/YelpCamp/ifspwql5hnshk8np2gum.jpg',
            filename: 'YelpCamp/ifspwql5hnshk8np2gum'
        },
        {
            url: 'https://res.cloudinary.com/dxbjyq9hm/image/upload/v1687392630/YelpCamp/adb4pdyebkl6pcjbm9sv.jpg',
            filename: 'YelpCamp/adb4pdyebkl6pcjbm9sv'
        }

      ]
    });
    await camp.save();
  }
}

seedDB().then(() => {
  mongoose.connection.close();
});
