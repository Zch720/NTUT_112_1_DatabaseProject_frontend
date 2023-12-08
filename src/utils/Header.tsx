import "./Header.css"
import SearchBox from "./SearchBox";
import ACCOUNT_ICON from "../assets/account_icon.png"
import SHOPPING_CART_ICON from "../assets/shopping_cart_icon.png"

function Logo() {
    return (
        <a href="/home#"><img src="/logo_with_word.PNG" /></a>
    );
}

function ToolsBar() {
    return (
        <div id="user-tools-bar">
            <div className="header-search-box"><SearchBox /></div>
            <div className="user-tool-bar-item">
                <a href="/user/signin">
                    <img src={ACCOUNT_ICON} />
                </a>
            </div>
            <div className="user-tool-bar-item" style={{marginRight: "0.5vw"}}>
                <a href="/shopping-cart">
                    <img src={SHOPPING_CART_ICON} />
                </a>
            </div>
        </div>
    );
}

function NavigationBar() {
    return (
        <div id="navigation-bar">
            <a href="/products#">商品列表</a>
            <a href="/shops#">商店列表</a>
            <a href="/about#">關於我們</a>
        </div>
    );
}

export default function Header() {
    return (
        <header>
            <div id="header-logo">
                <Logo />
            </div>
            <div id="header-tools">
                <ToolsBar />
                <NavigationBar />
            </div>
        </header>
    );
}