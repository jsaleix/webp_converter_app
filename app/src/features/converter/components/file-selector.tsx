import { useRef, useState } from "react";
import useFiles from "../hooks/use-files";
import UploadIcon from "./icons/upload-icon";

interface Props {
    fileType: string;
}

export default function FileSelector({ fileType }: Props) {
    const { addFiles } = useFiles();
    const accept = `image/${fileType}`;
    const formRef = useRef<HTMLFormElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError(null);
        if (!e.target.files || e.target.files.length === 0) return;
        const rawFiles = e.target.files;
        const files: File[] = [];
        for (let file of rawFiles) {
            if (file.type === accept) {
                files.push(file);
            }
        }
        addFiles(files);
        formRef?.current?.reset();
    };

    return (
        <form ref={formRef} className="w-full flex flex-col items-center">
            {error && <p>{error}</p>}
            <label
                htmlFor="file_input"
                className="select-none bg-red-600 py-5 px-10 rounded flex items-center justify-center gap-2 cursor-pointer uppercase text-white duration-150 hover:opacity-80"
                data-testid="select-btn"
            >
                <UploadIcon />
                Select Files
            </label>
            <input
                multiple
                id="file_input"
                name="file_input"
                type="file"
                accept={accept}
                ref={inputRef}
                onChange={handleFileChange}
                className="hidden"
            />
        </form>
    );
}
