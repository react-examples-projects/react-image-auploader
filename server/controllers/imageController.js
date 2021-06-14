class ImageController {
  constructor() {
    this.ImageModel = require("../models/Image");
    this.uploadImages = require("../helpers/requests").uploadImages;
  }

  async getImages() {
    const images = await this.ImageModel.find({})
      .populate({
        path: "comments",
        populate: {
          path: "user",
          select: {
            name: 1,
            isAdmin: 1,
            _id: 1,
          },
        },
      })
      .lean();
    return images;
  }

  async insertImage(url64, name) {
    const data = await this.uploadImages(url64);
    const newImage = this.ImageModel({ url_image: data.url, name });
    const img = await newImage.save();
    return img;
  }
}

module.exports = new ImageController();
