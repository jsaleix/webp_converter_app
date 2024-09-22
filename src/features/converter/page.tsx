import { useRef, useState, useEffect } from "react";
import FileSelector from "./components/file-selector";
import MyWorker from "./worker?worker";
import FilesPreviewPart from "./components/files-preview-part";
import ActionsPart from "./components/actions-part";
import useFiles from "./hooks/use-files";

interface Props {}

export default function ConverterPage({}: Props) {
    const workerRef = useRef<Worker | null>(null);
    const { files, resetFiles } = useFiles();
    const [loading, setLoading] = useState(false);
    const canStartProcess = !loading && files.length > 0;

    const startProcess = () => {
        if (!canStartProcess) {
            return;
        }
        setLoading(true);
        workerRef.current?.postMessage({
            type: "convert",
            payload: files,
        });
    };

    useEffect(() => {
        const worker = new MyWorker();

        worker.onmessage = (e) => {
            console.log("Received result from worker:", e.data);
            resetFiles();
            const res = e.data;
            res.forEach((file: File) => {
                const url = URL.createObjectURL(file);
                const link = document.createElement("a");
                link.href = url;
                link.download = file.name;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url); // Libère l'URL Blob
            });
            setLoading(false);
        };

        workerRef.current = worker;
        return () => worker.terminate();
    }, []);

    return (
        <div>
            <FileSelector />
            <FilesPreviewPart />
            <hr />
            <ActionsPart
                loading={loading}
                startAction={startProcess}
                disabled={!canStartProcess}
            />
        </div>
    );
}
