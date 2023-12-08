import React, { useEffect, useRef, useState } from "react";
import { Collapse } from "react-collapse";
import "../account/AccountProfile.css";
import "./ProductProfile.css";
import "../utils/PageChooser";

type ProductInfos = {
    name: string;
    images: Array<string>;
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

function GetImageState(canEdit: boolean): string {
    if (canEdit)
        return "product-profile-image-editing";
    return "product-profile-image";
}

function OneLineInfo (props: { infoType: string, buttonId: string, infoValue: string }) {
    const { infoType, buttonId, infoValue } = props;
    const [infoEditing, setInfoEditing] = useState<boolean>(false);
    const [value, setValue] = useState<string>(infoValue);
    return(
        <div className="account-profile-info">
            {infoType}
            <input type="checkbox" id={buttonId} onClick={() => setInfoEditing(!infoEditing)}/>
            <label htmlFor={buttonId}></label><br/>
            <input className={GetProfileInfoState(infoEditing)} type="text" value={value} onChange={(e) => setValue(e.target.value)} readOnly={!infoEditing}></input>
        </div>
    );
}

function ImageInfo({ buttonId, infoValue }: { buttonId: string, infoValue: Array<string> }) {
    const [infoEditing, setInfoEditing] = useState<boolean>(false);
    const [images, setImages] = useState<Array<string>>(infoValue);

    const deleteImage = (index: number) => {
        let newImages = [...images];
        newImages.splice(index, 1);
        setImages(newImages);
    };
    const uploadImage = (files: FileList) => {
        let newImages = [...images];
        for (let i = 0; i < files.length; i++)
            if (files[i]) newImages.push(URL.createObjectURL(files[i]));
        setImages(newImages);
    };

    return (
        <div className="account-profile-info">
            商品圖片
            <input type="checkbox" id={buttonId} onClick={() => setInfoEditing(!infoEditing)}/>
            <label htmlFor={buttonId}></label><br/>
            <div className="product-images-container">
                {images.map((image, index) => 
                    <ProductImage key={"product-image-" + index} isEditing={infoEditing} index={index} image={image} deleteImage={deleteImage} />
                )}
                {infoEditing
                    ? <UploadProductImage uploadImage={uploadImage} />
                    : <></>
                }
            </div>
        </div>
    );
}

function UploadProductImage(props: { uploadImage: (image: FileList) => void }) {
    const { uploadImage } = props;
    const inputRef = useRef<HTMLInputElement>(null);

    const getInputFiles = () => {
        uploadImage(inputRef.current!.files!);
        inputRef.current!.value = "";
    }

    return (
        <div className="product-image-box">
             <input type="file" accept="image/*" id="upload-product-image" multiple={true} hidden
                ref={inputRef}
                onChange={getInputFiles} />
            <label id="upload-product-image-label" htmlFor="upload-product-image">
                <div className="upload-product-image">
                    <img src={`/images/product_profile_add_image_button.svg`} />
                </div>
            </label>
        </div>
    );
}

function ProductImage(props: { isEditing: boolean, index: number, image: string, deleteImage: (index: number) => void }) {
    const { isEditing, index, image, deleteImage } = props;
    return (
        <div className="product-image-box">
            {isEditing
                ? <button className="product-image-delete-button" onClick={() => deleteImage(index)} />
                : <></>
            }
            <img className={GetImageState(isEditing)} src={image} alt={"product-profile-image"} />
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

function CategoryList({ infoValue }: { infoValue: string }) {
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
                <CategoryList infoValue={infoValue} />
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
            <ImageInfo buttonId={"product-images"} infoValue={info.images} />
            <CategoryInfo infoValue={info.category} />
            <DescriptionInfo infoType={"商品敍述"} buttonId={"product-description"} infoValue={info.description} />
            <OneLineInfo infoType={"商品價格"} buttonId={"product-price"} infoValue={info.price.toString()} />
            <OneLineInfo infoType={"商品庫存"} buttonId={"product-stock"} infoValue={info.stock.toString()} />
        </div>
    );
}

function ShopProfileRightBlock() {
    return (
        <React.Fragment>
            <div className="product-profile-right-block">
                <button>刪除商品</button>
            </div>
        </React.Fragment>
    );
}

function ShopProductProfiles({ info }: { info: ProductInfos }) {
    return (
        <div className="account-profile-infos" style={{flexDirection: "row"}}>
            <ShopProfileInputs info={info} />
            <ShopProfileRightBlock />
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
        images: ["https://i.imgur.com/4pPAVIJ.png", "https://i.imgur.com/9yplM34.png"],
        category: "",
        description: "商品敍述",
        price: 100,
        stock: 10
    };
}