import Logo from "../../assets/logo.svg";
import { GO_APP_URL, REPO_URL } from "../../config/links";

interface Props {}

export default function Header({}: Props) {
    const headerCls = "w-100 py-5 border-b-2 border-zinc-200";
    const liStyle =
        "hover:opacity-80 duration-100 text-sm text-center md:text-md";

    return (
        <header className={headerCls}>
            <div className="px-10 md:px-0 w-100 container mx-auto flex justify-between items-center">
                <a href="/" className="overflow-hidden">
                    <img
                        src={Logo}
                        alt="Converter logo"
                        className="select-none"
                    />
                </a>
                <nav>
                    <ul className="list-none uppercase flex gap-5">
                        <li className={liStyle}>
                            <a href={REPO_URL} target="_blank">
                                SOURCE CODE
                            </a>
                        </li>
                        <li className={liStyle}>
                            <a href={GO_APP_URL} target="_blank">
                                GO APP
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
