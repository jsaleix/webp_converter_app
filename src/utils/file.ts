export function getBase64(fileToConvert: File): Promise<string> {
    return new Promise((res) => {
        const reader = new FileReader();
        reader.readAsDataURL(fileToConvert);
        reader.onloadend = () => res(reader.result as string);
    });
}

export const convertImg = (
    webpFile: File,
    type: "jpeg" | "webp"
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

                    const jpgBase64 = canvas.toDataURL(`image/${type}`, 1); // 1 = qualité maximale
                    resolve(jpgBase64); // Renvoie la chaîne Base64
                } else {
                    reject(
                        new Error("Impossible d'obtenir le contexte du canvas.")
                    );
                }
            };

            img.onerror = () =>
                reject(new Error("Échec du chargement de l'image."));
        };

        reader.onerror = () =>
            reject(new Error("Échec de la lecture du fichier."));
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
