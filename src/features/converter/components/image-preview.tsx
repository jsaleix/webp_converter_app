import { useMemo } from "react";

interface Props {
    file: File;
    onClick: () => void;
}

export default function ImgPreview({ file, onClick }: Props) {
    const src = useMemo(() => URL.createObjectURL(file), [file]);

    return (
        <div onClick={onClick}>
            <img src={src} alt="A preview" width={60} height={60} />
        </div>
    );
}
