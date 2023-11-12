import { useState } from "react";
import "./AccountCoupons.css";
import SearchBox from "../SearchBox";
import PageChooser from "../PageChooser";

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
            <td style={{textAlign: "center"}}>{coupon.id}</td>
            <td style={{textAlign: "center"}}>{coupon.startDate + " ~ " + coupon.endDate}</td>
            <td style={{textAlign: "center"}}>{coupon.description}</td>
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
                <PageChooser maxPage={2} onPageChange={props.setCouponsOfPage} />
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
    const [coupons, setCoupons] = useState<CouponType[]>(getFakeCoupons(1));
    const setCouponsOfPage = (page: number) => {
        setCoupons(getFakeCoupons(page));
    };

    return (
        <div className="account-page-content">
            <AccountPageTitle />
            <div className="search-box-container"><SearchBox hasBorder={true} /></div>
            <CouponsList coupons={coupons} setCouponsOfPage={setCouponsOfPage} />
        </div>
    );
};

const fakeCoupons: CouponType[] = [
    {
        id: "A123456789",
        startDate: "2021/09/01",
        endDate: "2021/09/30",
        description: "全站滿額折扣",
    },
    {
        id: "B123456789",
        startDate: "2021/09/01",
        endDate: "2021/09/30",
        description: "全站滿額折扣",
    },
    {
        id: "C123456789",
        startDate: "2021/09/01",
        endDate: "2021/09/30",
        description: "全站滿額折扣",
    },
    {
        id: "D123456789",
        startDate: "2021/09/01",
        endDate: "2021/09/30",
        description: "全站滿額折扣",
    },
    {
        id: "E123456789",
        startDate: "2021/09/01",
        endDate: "2021/09/30",
        description: "全站滿額折扣",
    },
    {
        id: "F123456789",
        startDate: "2021/09/01",
        endDate: "2021/09/30",
        description: "全站滿額折扣",
    },
];

function getFakeCoupons(page: number) {
    return fakeCoupons.slice((page - 1) * 5, page * 5);
}