import { useState } from "react";
import Converter from "./converter";
import { ImgFileType } from "../../types/file";

interface OrderState {
    toExtension: ImgFileType;
    fromExtension: ImgFileType;
}

export default function ConverterPage() {
    const [order, setOrder] = useState<OrderState>({
        toExtension: "jpeg",
        fromExtension: "webp",
    });

    const toggleOrder = () => {
        if (order.toExtension === "jpeg") {
            setOrder({
                toExtension: "webp",
                fromExtension: "jpeg",
            });
        } else {
            setOrder({
                toExtension: "jpeg",
                fromExtension: "webp",
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
