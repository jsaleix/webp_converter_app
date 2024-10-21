import useFiles from "../hooks/use-files";
import ImgPreview from "./image-preview";

interface Props {}

export default function FilesPreviewPart({}: Props) {
    const { files, removeFile } = useFiles();

    if (files.length == 0) return null;

    return (
        <div className="w-100 p-5 rounded-md bg-gray-100 flex flex-col items-center gap-5">
            <h2 className="text-xl">Selected files:</h2>
            <div className="scrollbar-hide max-h-56 overflow-y-scroll grid grid-cols-2 md:grid-cols-5 gap-5">
                {files.map((file, idx) => (
                    <ImgPreview
                        file={file}
                        onClick={() => removeFile(file)}
                        key={idx}
                    />
                ))}
            </div>
        </div>
    );
}
