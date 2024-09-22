import useFiles from "../hooks/use-files";
import ImgPreview from "./image-preview";

interface Props {}

export default function FilesPreviewPart({}: Props) {
    const { files, removeFile } = useFiles();

    if (files.length == 0) return null;

    return (
        <div>
            <h2>Images selectionnées:</h2>
            <div>
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
