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

  async insertImage({ url_base64, name, title, tags }) {
    const data = await this.uploadImages(url_base64);
    const newImage = this.ImageModel({
      url_image: data.url,
      name,
      title,
      tags,
    });
    const img = await newImage.save();
    return img;
  }
}

module.exports = new ImageController();
