import { useEffect, useState } from "react";
import { Collapse } from "react-collapse";
import "../account/AccountProfile.css";
import "./ProductProfile.css";

type ProductInfos = {
    name: string;
    image: string;
    category: string;
    description: string;
    price: number;
    stock: number;
};

function AccountPageTitle() {
    return(
        <h3 className="account-page-title">帳戶 {">"} 商品管理 {">"} 商品詳細資訊</h3>
    );
}

function GetProfileInfoState(canEdit: boolean): string {
    if (canEdit)
        return "account-profile-info-input-editing";
    return "account-profile-info-input";
}

function OneLineInfo (props: { infoType: string, buttonId: string, infoValue: string }) {
    const { infoType, buttonId, infoValue } = props;
    const [infoEditing, setInfoEditing] = useState<boolean>(false);
    // TODO: input bug
    return(
        <div className="account-profile-info">
            {infoType}
            <input type="checkbox" id={buttonId} onClick={() => setInfoEditing(!infoEditing)}/>
            <label htmlFor={buttonId}></label><br/>
            <input className={GetProfileInfoState(infoEditing)} type="text" value={infoValue} readOnly></input>
        </div>
    );
}

function ImageInfo() {
    return (
        <div className="account-profile-info">
            商品圖片
            <input type="file" accept="image/*" id={"product-image"} onChange={setIconImage} hidden/>
            <label htmlFor={"product-image"}></label><br/>
        </div>
    );
}

function DescriptionInfo(props: { infoType: string, buttonId: string, infoValue: string }) {
    const { infoType, buttonId, infoValue } = props;
    const [infoEditing, setInfoEditing] = useState<boolean>(false);
    return (
        <div className="account-profile-info">
            {infoType}
            <input type="checkbox" id={buttonId} onClick={() => setInfoEditing(!infoEditing)}/>
            <label htmlFor={buttonId}></label><br/>
            <textarea className={GetProfileInfoState(infoEditing)} rows={5} cols={50} value={infoValue} readOnly></textarea>
        </div>
    );
}

function getCategoryLabelState(choosed: boolean): string {
    if (choosed)
        return "product-category-label-choosed";
    return "product-category-label";
}

function ProductCategory({ type, defaultCategories }: { type: string, defaultCategories: string }) {
    const [choosed, setChoosed] = useState<boolean>(false);
    useEffect(() => {
        UpdateCategoryInfoFromChoosing();
    }, [choosed]);
    useEffect(() => {
        if (defaultCategories.includes(type))
            setChoosed(true);
    }, []);
    return (
        <div>
            <button className={getCategoryLabelState(choosed)} onClick={() => {setChoosed(!choosed);}}>{type}</button>
        </div>
    );
}

function CategoryList() {
    return (
        <div className="product-category-list">
        </div>
    );
}

function CategoryInfo({ infoValue }: { infoValue: string }) {
    const [infoEditing, setInfoEditing] = useState<boolean>(false);
    return (
        <div className="account-profile-info">
            商品分類
            <input type="checkbox" id="product-category" onClick={() => setInfoEditing(!infoEditing)}/>
            <label htmlFor="product-category"></label><br/>
            <input id="prooduct-categories" className={GetProfileInfoState(infoEditing)} type="text" readOnly></input>
            <Collapse isOpened={infoEditing}>
                <CategoryList />
            </Collapse>
        </div>    
    );
}

function UpdateCategoryInfoFromChoosing() {
    const output = document.getElementById("prooduct-categories") as HTMLInputElement;
    const labels = document.getElementsByClassName("product-category-label-choosed");

    if (!labels) return;

    let categories: string = "";
    for (let i = 0; i < labels.length; i++) {
        categories += (labels[i] as HTMLButtonElement).innerText + ", ";
    }
    categories = categories.slice(0, categories.length - 2);
    output.value = categories;
}

function setIconImage() {
    const input = document.getElementById("product-image") as HTMLInputElement;
    const icon = document.getElementById("product-profile-image") as HTMLImageElement;
    
    if (!input.files || !input.files[0]) return;
    icon.src = URL.createObjectURL(input.files[0]);
}

function ShopProfileInputs({ info }: { info: ProductInfos }) {
    return (
        <div className="product-profile-inputs">
            <OneLineInfo infoType={"商品名稱"} buttonId={"product-name"} infoValue={info.name} />
            <ImageInfo />
            <CategoryInfo infoValue={info.category} />
            <DescriptionInfo infoType={"商品敍述"} buttonId={"product-description"} infoValue={info.description} />
            <OneLineInfo infoType={"商品價格"} buttonId={"product-price"} infoValue={info.price.toString()} />
            <OneLineInfo infoType={"商品庫存"} buttonId={"product-stock"} infoValue={info.stock.toString()} />
        </div>
    );
}

function ShopProfileImage({ image }: { image: string }) {
    return (
        <div className="product-profile-image">
            <button>刪除商品</button>
            <img id="product-profile-image" src={image}/>
        </div>
    );
}

function ShopProductProfiles({ info }: { info: ProductInfos }) {
    return (
        <div className="account-profile-infos" style={{flexDirection: "row"}}>
            <ShopProfileInputs info={info} />
            <ShopProfileImage image={info.image} />
        </div>
    );
}

export default function ProductProfile() {
    let info: ProductInfos = getFakeProductInfos();

    return (
        <div className="account-page-content">
            <AccountPageTitle />
            <ShopProductProfiles info={info} />
        </div>
    );
}

function getFakeProductInfos() {
    return {
        name: "商品名稱",
        image: "",
        category: "",
        description: "商品敍述",
        price: 100,
        stock: 10
    };
}