// import { WorkerEvent } from "../../types/worker";
// import { convertWebPToJPGBase64 } from "../../utils/file";

// onmessage = async function (event: WorkerEvent) {
//     console.log("Received message from the main thread:", event.data);
//     const { type, payload } = event.data;

//     switch (type) {
//         case "convert":
//             console.log("here");
//             const res = await convertWebPToJPG(payload);
//             postMessage(res);
//             break;
//         default:
//             console.error(`Unhandled event type ${type}`);
//     }
// };

// const convertWebPToJPG = async (files: File[]) => {
//     return Promise.all(files.map(convertWebPToJPGBase64));
// };
