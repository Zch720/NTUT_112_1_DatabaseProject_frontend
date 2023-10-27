import SEARCH_ICON from "./assets/search_icon.png"
import "./SearchBox.css"

export default function SearchBox() {
    return (
        <div id="search-box">
            <img src={SEARCH_ICON}/>
            <input type="search"/>
        </div>
    );
}