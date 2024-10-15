import { useMemo } from "react";
import CrossIcon from "./icons/cross-icon";

interface Props {
    file: File;
    onClick: () => void;
}

export default function ImgPreview({ file, onClick }: Props) {
    const src = useMemo(() => URL.createObjectURL(file), [file]);

    return (
        <div
            onClick={onClick}
            className="overflow-hidden rounded-md bg-slate-800 group relative cursor-pointer shadow-md"
            style={{ height: 90, width: 90 }}
        >
            <div className="absolute z-50 w-full h-full justify-center items-center hidden group-hover:flex duration-100">
                <CrossIcon />
            </div>
            <img
                src={src}
                alt="A preview"
                className="object-cover w-full h-full duration-100 group-hover:opacity-40 group-hover:scale-110"
            />
        </div>
    );
}
