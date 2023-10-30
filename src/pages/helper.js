import { Buffer } from "buffer";

export const getFormattedImage = source => `data:image/jpg;base64,${Buffer.from(source, "base64").toString("base64")}`
