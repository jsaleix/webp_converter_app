import { useFilesStore } from "../stores/files";

export default function useFiles() {
    const { files, addFiles, removeFile, resetFiles } = useFilesStore();

    return { files, addFiles, removeFile, resetFiles };
}
