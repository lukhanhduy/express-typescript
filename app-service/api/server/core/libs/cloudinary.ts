import { env } from "../helpers";
import multer = require("multer");
const cloudinaryStorage = require("multer-storage-cloudinary");
const cloud = require('cloudinary');
cloud.config({
  cloud_name: env("CLOUD_NAME"),
  api_key: env("CLOUD_KEY"),
  api_secret: env("CLOUD_SECRET")
})
const storage = cloudinaryStorage({
  cloudinary: cloud,
  folder: "demo",
  allowedFormats: ["jpg", "png"],
  transformation: [{ width: 500, height: 500, crop: "limit" }]
});
export const cloudinary = multer({ storage: storage });;