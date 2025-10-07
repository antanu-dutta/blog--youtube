import ImageKit from "@imagekit/nodejs";
import dotenv from "dotenv";
dotenv.config();

const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVET_KEY, // This is the default and can be omitted
  // publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  // urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

export default imagekit;
