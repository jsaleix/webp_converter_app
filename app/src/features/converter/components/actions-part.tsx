import clsx from "clsx";

interface Props {
    loading: boolean;
    startAction: () => void;
    disabled: boolean;
}

const baseStyle =
    "select-none uppercase py-5 px-10 rounded duration-150 hover:text-gray-400 shadow-md";
const activeStyle = "bg-red-600 text-white hover:bg-red-800";
const disabledStyle = "bg-gray-800 text-gray-400 cursor-not-allowed";
const processStyle = "cursor-progress bg-black text-gray-300";

export default function ActionsPart({ loading, startAction, disabled }: Props) {
    if (loading)
        return (
            <button className={clsx(baseStyle, processStyle)} disabled={true}>
                Processing...
            </button>
        );
    return (
        <button
            className={clsx(baseStyle, disabled ? disabledStyle : activeStyle)}
            disabled={disabled}
            onClick={startAction}
            data-testid="convert-btn"
        >
            Convert files
        </button>
    );
}
