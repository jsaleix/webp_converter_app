import { GITHUB_URL } from "../../config/links";
import GithubIcon from "../icons/github";

export default function Footer() {
    const footerStyle =
        "h-100 mt-auto w-100 py-10 bg-zinc-800";

    return (
        <footer className={footerStyle}>
            <div className="px-10 md:px-0 w-100 container mx-auto flex flex-col gap-2">
                <p className="text-gray-400 font-light text-sm">
                    Copyright © 2024 - All rights reserved I guess
                </p>
                <a
                    href={GITHUB_URL}
                    target="_blank"
                    className=" w-fit duration-100 hover:opacity-80"
                >
                    <GithubIcon />
                </a>
            </div>
        </footer>
    );
}
