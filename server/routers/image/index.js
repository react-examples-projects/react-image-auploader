const express = require("express");
const router = express.Router();
const { uploadImages } = require("../../helpers/requests");
const insertImage = require("../../controllers/insertImage");
const getImages = require("../../controllers/getImages");
const { success } = require("../../helpers/httpResponses");


router.get("/", async (req, res) => {
   const data = await getImages();
   success(res, data);
 });
 
 router.post("/upload", async (req, res) => {
   const data = await uploadImages(req.files.images.data);
   insertImage({ url_image: data.url, name: req.body.name });
   success(res, data);
 });

 

module.exports = router;