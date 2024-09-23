import { useState } from "react";
import Converter from "./converter";
import { ImgFileType, ImgFileValues } from "../../types/file";

interface OrderState {
    toExtension: ImgFileType;
    fromExtension: ImgFileType;
}

export default function ConverterPage() {
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
        <div>
            <div>
                <h2>
                    From {order.fromExtension} to {order.toExtension}
                </h2>
                <button onClick={toggleOrder}>Toggle</button>
            </div>
            <Converter {...order} />
        </div>
    );
}
