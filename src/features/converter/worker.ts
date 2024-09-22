import { WorkerEvent } from "../../types/worker";

onmessage = async function (event: WorkerEvent) {
    console.log("Received message from the main thread:", event.data);
    const { type, payload } = event.data;

    switch (type) {
        case "convert":
            console.log("here");
            const res = await Promise.all(
                payload.map((file: File) => convertWebPToJPG(file))
            );
            postMessage(res);
            break;
        default:
            console.error(`Unhandled event type ${type}`);
    }
};

const convertWebPToJPG = async (file: File): Promise<File> => {
    return file;
};
