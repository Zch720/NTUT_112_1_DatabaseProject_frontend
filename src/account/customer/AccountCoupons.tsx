import { useState } from "react";
import "./AccountCoupons.css";
import SearchBox from "../../utils/SearchBox";
import PageChooser from "../../utils/PageChooser";

function AccountPageTitle() {
    return(
        <h3 className="account-page-title">帳戶 {">"} 優惠券</h3>
    );
}

function OrderTableHeaderRow() {
    return (
        <tr>
            <td style={{width: "13vw"}}>優惠券編號</td>
            <td style={{width: "16vw"}}>使用期限</td>
            <td style={{width: "31vw"}}>折扣內容</td>
        </tr>
    );
}

function OrderRow({ coupon } : { coupon: CouponType }) {
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
                <OrderTableHeaderRow />
            </thead>
            <tbody>
                {coupons.map((coupon) => <OrderRow coupon={coupon} />)}
            </tbody>
        </table>
    );
}

function CouponsList(props: { coupons: CouponType[], setCouponsOfPage: (page: number) => void }) {
    return (
        <div className="coupon-list-container">
            <CouponsTable  coupons={props.coupons} />
            {/* TODO: add max page number */}
            <div className="page-chooser-box">
                <PageChooser maxPage={0} onPageChange={props.setCouponsOfPage} />
            </div>
        </div>
    );
}

type CouponType = {
    id: string;
    startDate: string;
    endDate: string;
    description: string;
};

export default function AccountCoupons() {
    // TODO: set coupons
    const [coupons, setCoupons] = useState<CouponType[]>([]);
    const setCouponsOfPage = (page: number) => {
        setCoupons([]);
    };

    return (
        <div className="account-page-content">
            <AccountPageTitle />
            <div className="search-box-container"><SearchBox hasBorder={true} /></div>
            <CouponsList coupons={coupons} setCouponsOfPage={setCouponsOfPage} />
        </div>
    );
};