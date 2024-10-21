import { create } from "zustand";

interface FilesState {
    files: File[];
    addFiles: (files: File[]) => void;
    removeFile: (file: File) => void;
    resetFiles: () => void;
}

export const useFilesStore = create<FilesState>((set) => ({
    files: [],
    addFiles: (files) =>
        set((state) => ({ files: [...state.files, ...files] })),
    removeFile: (file) =>
        set((state) => ({ files: state.files.filter((f) => f !== file) })),
    resetFiles: () => set(() => ({ files: [] })),
}));
