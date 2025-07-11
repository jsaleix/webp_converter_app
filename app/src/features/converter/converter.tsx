import { useState, useEffect } from "react";
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
        <div
            className={
                "py-32 md:py-16 px-5 checkboard_pattern w-full bg-slate-700 flex flex-col items-center gap-3"
            }
        >
            <FileSelector fileType={fromExtension} />
            <FilesPreviewPart />
            <hr className="divider" />
            <ActionsPart
                loading={loading}
                startAction={startProcess}
                disabled={!canStartProcess}
            />
        </div>
    );
}
