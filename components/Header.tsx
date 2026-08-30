export default function Header() {
    return (
        <header id={"main-header"}>
            <b><h1 id={"header-title"}>Netflix</h1></b>

            <div id={"header-links"}>
                <a href={"/"} className={"text-white hover:text-gray-300"}>Home</a>
                <a href={"/movies"} className={"text-white hover:text-gray-300"}>Movies</a>
                <a href={"/series"} className={"text-white hover:text-gray-300"}>Series</a>
                <a href={"/about"} className={"text-white hover:text-gray-300"}>About</a>
                <a href={"/subscription"} className={"text-white hover:text-gray-300"}>Subscription</a>

                <a href={"/login"} className={"text-white hover:text-gray-300"}>Login</a>
                <a href={"/auth/signup"} className={"text-white hover:text-gray-300"}>Register</a>
            </div>
        </header>
    )
}