import { useState } from "react";
import "./ShopCoupons.css";
import ShopProducts from "./ShopProducts";
import PageChooser from "../../PageChooser";
import SearchBox from "../../SearchBox";

type CouponType = {
    id: string;
    startDate: string;
    endDate: string;
    description: string;
};

function AccountPageTitle() {
    return(
        <h3 className="account-page-title">帳戶 {">"} 優惠券管理</h3>
    );
}

function CouponsListToolBar() {
    return (
        <div className="shop-coupons-toolbar">
            <div className="search-box-container">
                <SearchBox hasBorder={true} />
            </div>
            <button className="shop-coupons-add-new">新增優惠券</button>
        </div>
    );
}

function CouponTableHeaderRow() {
    return (
        <tr>
            <td style={{width: "13vw"}}>優惠券編號</td>
            <td style={{width: "16vw"}}>使用期限</td>
            <td style={{width: "31vw"}}>折扣內容</td>
        </tr>
    );
}

function CouponRow({ coupon } : { coupon: CouponType }) {
    return (
        <tr key={coupon.id}>
            <td>{coupon.id}</td>
            <td>{coupon.startDate + " ~ " + coupon.endDate}</td>
            <td>{coupon.description}</td>
        </tr>
    );
}

function CouponsTable({ coupons }: { coupons: CouponType[] }) {
    return (
        <table>
            <thead>
                <CouponTableHeaderRow />
            </thead>
            <tbody>
                {coupons.map((coupon) => <CouponRow coupon={coupon} />)}
            </tbody>
        </table>
    );
}

function ShopCouponsList({ coupons }: { coupons: CouponType[] }) {
    return (
        <div className="shop-coupons-list">
            <CouponsListToolBar />
            <CouponsTable coupons={coupons} />
            <PageChooser maxPage={0} onPageChange={() => {}} />
        </div>
    );
}

export default function ShopCoupons() {
    const [coupons, setCoupons] = useState<CouponType[]>([]);

    return (
        <div className="account-page-content">
            <AccountPageTitle />
            <ShopCouponsList coupons={coupons}/>
        </div>
    );
}
