import { useRef, useState } from "react";
import useFiles from "../hooks/use-files";

interface Props {
}

export default function FileSelector({  }: Props) {
    const {addFiles} = useFiles()
    const formRef = useRef<HTMLFormElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError(null);
        if (!e.target.files || e.target.files.length === 0) return;
        const rawFiles = e.target.files;
        const files: File[] = [];
        for (let file of rawFiles) {
            if (file.type === "image/webp") {
                files.push(file);
            }
        }
        addFiles(files);
        formRef?.current?.reset();
    };

    return (
        <form ref={formRef}>
            {error && <p>{error}</p>}
            <label htmlFor="webp_input">
                <input
                    multiple
                    name="webp_input"
                    type="file"
                    accept="image/webp"
                    ref={inputRef}
                    onChange={handleFileChange}
                />
            </label>
        </form>
    );
}
