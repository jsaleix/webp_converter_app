export function getBase64(fileToConvert: File): Promise<string> {
    return new Promise((res) => {
        const reader = new FileReader();
        reader.readAsDataURL(fileToConvert);
        reader.onloadend = () => res(reader.result as string);
    });
}
