import { useEffect, useState } from "react";
import ShopList from "../utils/list_of_entities/ShopList";
import "./ShopsPage.css";
import { ShopListData } from "../mapper/ShopMapper";
import PageChooser from "../utils/PageChooser";
import AllShopCountController from "../controller/AllShopCountController";
import GetShopsListController from "../controller/GetShopsListController";

export default function ShopsPage() {
    const shopPrePage = 20;
    const [allShops, setAllShops] = useState<number>(0);
    const [shops, setShops] = useState<ShopListData[]>([]);
    const pageSetIndexChange = (index: number) => {
        GetShops(index, shopPrePage, allShops, setShops);
    };
    useEffect(() => {
        GetShopsPage(setAllShops);
    }, []);

    return (
        <div className="shops-page-container">
            <ShopList shops={shops}/>
            <PageChooser maxPage={Math.ceil(allShops / shopPrePage)} onPageChange={pageSetIndexChange}/>
        </div>
    );
}

async function GetShopsPage(
    setAllShops: (page: number) => void,
) {
    setAllShops(await AllShopCountController());
}

async function GetShops(
    index: number,
    prePage: number,
    allShops: number,
    setShops: (shops: ShopListData[]) => void,
) {
    if (index <= 0 || index >= Math.ceil(allShops / prePage)) {
        return;
    }
    const start = (index - 1) * prePage;
    const end = Math.min(index * prePage, allShops - 1);
    setShops(await GetShopsListController(start, end));
}