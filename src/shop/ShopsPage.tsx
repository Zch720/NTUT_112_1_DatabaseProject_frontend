import { useState } from "react";
import ShopList from "../utils/list_of_entities/ShopList";
import "./ShopsPage.css";
import { ShopListData } from "../mapper/ShopMapper";
import PageChooser from "../utils/PageChooser";

export default function ShopsPage() {
    // TODO: get shops from backend
    const shopsPage = 0;
    const [shops, setShops] = useState<ShopListData[]>([]);
    const pageSetIndexChange = (index: number) => {
        // TODO: get shops from backend
        setShops([]);
    };

    return (
        <div className="shops-page-container">
            <ShopList shops={shops}/>
            <PageChooser maxPage={shopsPage} onPageChange={pageSetIndexChange}/>
        </div>
    );
}