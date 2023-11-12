import { useEffect, useState } from "react";
import "./PageChooser.css";
import LEFT_ARROW from "./assets/left_icon.png";
import DOUBLE_LEFT_ARROW from "./assets/double_left_icon.png";
import RIGHT_ARROW from "./assets/right_icon.png";
import DOUBLE_RIGHT_ARROW from "./assets/double_right_icon.png";

export type PageChooserProps = {
    maxPage: number;
    onPageChange: (page: number) => void;
};

PageChooser.defaultProps = {
    maxPage: 1,
    onPageChange: () => {}
};
export default function PageChooser(props: PageChooserProps) {
    const [page, setPage] = useState<number>(props.maxPage > 0 ? 1 : 0);

    useEffect(() => {
        props.onPageChange(page);
    }, [page]);

    return (
        <div className="page-chooser-container">
            <img className="unselectable" src={DOUBLE_LEFT_ARROW} onClick={() => page > 1 ? setPage(1) : {}} />
            <img className="unselectable" src={LEFT_ARROW} onClick={() => page > 1 ? setPage(page - 1) : {}} />
            <span className="unselectable">{page}</span>
            <img className="unselectable" src={RIGHT_ARROW} onClick={() => page < props.maxPage ? setPage(page + 1) : {}} />
            <img className="unselectable" src={DOUBLE_RIGHT_ARROW} onClick={() => page < props.maxPage ? setPage(props.maxPage) : {}} />
        </div>
    );
}