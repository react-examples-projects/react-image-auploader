const ImageModel = require("../models/Image");

function insertImage({ url_image, name }) {
  const newImage = new ImageModel({ url_image, name });
  newImage.save();
}

module.exports = insertImage;
