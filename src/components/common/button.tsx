import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

export default function Button({ children, className, ...props }: Props) {
    const cls = clsx("w-fit px-3 py-1 rounded-md border-2 border-zinc-400", className);

    return (
        <button {...props} className={cls}>
            {children}
        </button>
    );
}
