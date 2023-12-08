import SEARCH_ICON from "../assets/search_icon.png"
import "./SearchBox.css"

export type SearchBoxProps = {
    hasBorder: boolean;
}

const searchBoxDefaultProps: SearchBoxProps = {
    hasBorder: false
};

SearchBox.defaultProps = searchBoxDefaultProps;
export default function SearchBox({ hasBorder }: SearchBoxProps) {
    return (
        <div className={"search-box" + (hasBorder ? " search-box-border" : "")}>
            <div className="search-box-icon-container">
                <img src={SEARCH_ICON}/>
            </div>
            <input type="search"/>
        </div>
    );
}