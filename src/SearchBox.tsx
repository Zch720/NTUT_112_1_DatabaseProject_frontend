import search_icon from "./assets/search_icon.png"
import "./SearchBox.css"

export default function SearchBox() {
    return (
        <div id="search-box">
            <img src={search_icon}/>
            <input type="search"/>
        </div>
    );
}