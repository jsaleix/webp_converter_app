import { ObjectType } from "./common";

export const ImgFileValues = {
    JPEG: "jpeg",
    WEBP: "webp",
} as const;

export type ImgFileType = ObjectType<typeof ImgFileValues>;
