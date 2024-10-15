import { useState } from "react";
import Converter from "./converter";
import { ImgFileType, ImgFileValues } from "../../types/file";
import Button from "../../components/common/button";
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
        <div className="w-100 py-5">
            <div className="container mx-auto flex flex-col items-center gap-5">
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
                        onClick={toggleOrder}
                        className="cursor-pointer hover:opacity-60 duration-75"
                    />
                </div>
                <Converter {...order} />
            </div>
        </div>
    );
}
