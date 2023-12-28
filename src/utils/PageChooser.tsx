import { useEffect, useState } from "react";
import "./PageChooser.css";
import LEFT_ARROW from "../assets/left_icon.png";
import DOUBLE_LEFT_ARROW from "../assets/double_left_icon.png";
import RIGHT_ARROW from "../assets/right_icon.png";
import DOUBLE_RIGHT_ARROW from "../assets/double_right_icon.png";

export default function PageChooser(props: {
    maxPage: number;
    onPageChange: (page: number) => void;
}) {
    const [maxPage, setMaxPage] = useState<number>(props.maxPage);
    const [page, setPage] = useState<number>((props.maxPage > 0) ? 1 : 0);

    useEffect(() => {
        setMaxPage(props.maxPage);
        if (props.maxPage < page) {
            setPage(props.maxPage);
        } else if (page === 0) {
            setPage((props.maxPage > 0) ? 1 : 0);
        }
    }, [props.maxPage]);
    const setNewPage = (page: number) => {
        setPage(page);
        props.onPageChange(page);
    }

    return (
        <div className="page-chooser-container">
            <img className="unselectable" src={DOUBLE_LEFT_ARROW} onClick={() => page > 1 ? setNewPage(1) : {}} />
            <img className="unselectable" src={LEFT_ARROW} onClick={() => page > 1 ? setNewPage(page - 1) : {}} />
            <span className="unselectable">{page}</span>
            <img className="unselectable" src={RIGHT_ARROW} onClick={() => page < maxPage ? setNewPage(page + 1) : {}} />
            <img className="unselectable" src={DOUBLE_RIGHT_ARROW} onClick={() => page < maxPage ? setNewPage(maxPage) : {}} />
        </div>
    );
}