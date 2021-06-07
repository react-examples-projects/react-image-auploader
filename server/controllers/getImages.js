const ImageModel = require("../models/Image");

async function getImages() {
  const images = await ImageModel.find().lean();
  return images;
}

module.exports = getImages;
