import SEARCH_ICON from "./assets/search_icon.png"
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
            <img src={SEARCH_ICON}/>
            <input type="search"/>
        </div>
    );
}