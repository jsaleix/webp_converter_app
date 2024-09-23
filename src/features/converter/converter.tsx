import { useRef, useState, useEffect } from "react";
import FileSelector from "./components/file-selector";
// import MyWorker from "./worker?worker";
import FilesPreviewPart from "./components/files-preview-part";
import ActionsPart from "./components/actions-part";
import useFiles from "./hooks/use-files";
import { convertImg, downloadBase64 } from "../../utils/file";
import { ImgFileType } from "../../types/file";

interface Props {
    fromExtension: ImgFileType;
    toExtension: ImgFileType;
}

export default function Converter({ fromExtension, toExtension }: Props) {
    // const workerRef = useRef<Worker | null>(null);
    const { files, resetFiles } = useFiles();
    const [loading, setLoading] = useState(false);
    const canStartProcess = !loading && files.length > 0;

    const startProcess = async () => {
        if (!canStartProcess) {
            return;
        }
        try {
            setLoading(true);
            Promise.all(
                files.map((file) => convertImg(file, toExtension))
            ).then((res) => {
                res.forEach((base64, index) => {
                    const rawName = files[index].name;
                    let [name] = rawName.split(".");
                    name += `.${toExtension}`;
                    console.log(rawName, name);
                    console.log(toExtension, fromExtension);
                    downloadBase64(base64, name);
                });
            });
            resetFiles();
        } catch {
        } finally {
            setLoading(false);
        }
        // workerRef.current?.postMessage({
        //     type: "convert",
        //     payload: files,
        // });
    };

    // useEffect(() => {
    //     const worker = new MyWorker();

    //     worker.onmessage = (e) => {
    //         console.log("Received result from worker:", e.data);
    //         resetFiles();
    //         const res = e.data;
    //         console.log(res);
    //         setLoading(false);
    //     };

    //     workerRef.current = worker;
    //     return () => worker.terminate();
    // }, []);

    useEffect(() => {
        resetFiles();
    }, [fromExtension, toExtension]);

    return (
        <div>
            <FileSelector fileType={fromExtension} />
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
