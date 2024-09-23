import { useRef, useState } from "react";
import useFiles from "../hooks/use-files";

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
        <form ref={formRef}>
            {error && <p>{error}</p>}
            <label htmlFor="file_input">
                <input
                    multiple
                    name="file_input"
                    type="file"
                    accept={accept}
                    ref={inputRef}
                    onChange={handleFileChange}
                />
            </label>
        </form>
    );
}
