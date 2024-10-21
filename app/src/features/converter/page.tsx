import { useState } from "react";
import Converter from "./converter";
import { ImgFileType, ImgFileValues } from "../../types/file";
import SwitchIcon from "./components/icons/switch-icon";

interface OrderState {
    toExtension: ImgFileType;
    fromExtension: ImgFileType;
}

export default function ConverterPage() {
    const extensionClass = "uppercase text-red-500 font-bold";

    const [order, setOrder] = useState<OrderState>({
        toExtension: ImgFileValues.JPEG,
        fromExtension: ImgFileValues.WEBP,
    });

    const toggleOrder = () => {
        if (order.toExtension === ImgFileValues.JPEG) {
            setOrder({
                toExtension: ImgFileValues.WEBP,
                fromExtension: ImgFileValues.JPEG,
            });
        } else {
            setOrder({
                toExtension: ImgFileValues.JPEG,
                fromExtension: ImgFileValues.WEBP,
            });
        }
    };

    return (
        <div className="w-full h-full md:py-5">
            <div className="container mx-auto flex flex-col items-center gap-0 md:gap-5">
                <div className="flex flex-col items-center gap-1 py-5 md:py-0">
                    <div className="flex justify-center items-center gap-3">
                        <h2 className="text-2xl">
                            From{" "}
                            <span className={extensionClass}>
                                {order.fromExtension}
                            </span>{" "}
                            to{" "}
                            <span className={extensionClass}>
                                {order.toExtension}
                            </span>
                        </h2>
                        <SwitchIcon
                            data-testid="switch-format-btn"
                            onClick={toggleOrder}
                            className="cursor-pointer hover:opacity-60 duration-75"
                        />
                    </div>
                    <p className="font-light w-80 md:w-fit md:text-xl text-slate-700 text-center">
                        Convert your files locally in your browser (for free)
                    </p>
                </div>
                <Converter {...order} />
            </div>
        </div>
    );
}
