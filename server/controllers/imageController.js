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
    await newImage.save();
    return {
      ...data,
      _id: newImage._id,
    };
  }
}

module.exports = new ImageController();
