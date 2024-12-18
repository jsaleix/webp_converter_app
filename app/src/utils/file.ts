import { ImgFileType } from "../types/file";

export function getBase64(fileToConvert: File): Promise<string> {
    return new Promise((res) => {
        const reader = new FileReader();
        reader.readAsDataURL(fileToConvert);
        reader.onloadend = () => res(reader.result as string);
    });
}

export const convertImg = (
    webpFile: File,
    toType: ImgFileType
): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (event: ProgressEvent<FileReader>) => {
            const webpDataUrl = event.target?.result as string;

            const img = new Image();
            img.src = webpDataUrl;

            img.onload = () => {
                const canvas = document.createElement("canvas");
                canvas.width = img.width;
                canvas.height = img.height;

                const ctx = canvas.getContext("2d");
                if (ctx) {
                    ctx.drawImage(img, 0, 0);

                    const jpgBase64 = canvas.toDataURL(`image/${toType}`, 1);
                    resolve(jpgBase64);
                } else {
                    reject(new Error("Could not get canvas context."));
                }
            };

            img.onerror = () => reject(new Error("Fail during image loading."));
        };

        reader.onerror = () =>
            reject(new Error("Error while reading the file."));
        reader.readAsDataURL(webpFile);
    });
};

export const downloadBase64 = (base64: string, filename: string) => {
    const link = document.createElement("a");
    link.href = base64;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(base64);
};
