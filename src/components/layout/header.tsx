import Logo from "../../assets/react.svg";

interface Props {}

export default function Header({}: Props) {
    const headerCls = "w-100 py-5 border-b-2 border-zinc-200";

    return (
        <header className={headerCls}>
            <div className="w-100 container mx-auto flex justify-between">
                <div>
                    <img src={Logo} alt="Converter logo" />
                </div>
                <nav>
                    <ul className="list-none uppercase">
                        <li>About</li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
