import { useEffect, useState } from "react";
import "./AccountCoupons.css";
import SearchBox from "../../utils/SearchBox";
import PageChooser from "../../utils/PageChooser";
import { CouponListDataType } from "../../mapper/CouponMapper";
import GetAccountCouponsListController from "../../controller/GetAccountCouponsListController";
import GetAccountCouponsListCountController from "../../controller/GetAccountCouponsListCountController";
import { useCookies } from "react-cookie";

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
        <div className="eletable">
            <table>
                <thead>
                    <OrderTableHeaderRow />
                </thead>
                <tbody>
                    {coupons.map((coupon) => <OrderRow coupon={coupon} />)}
                </tbody>
            </table>
        </div>
    );
}

function CouponsList() {
    const [couponsCount, setCouponsCount] = useState<number>(0);
    const [coupons, setCoupons] = useState<CouponListDataType[]>([]);
    const [cookies] = useCookies(["accountId"]);
    const setCouponsOfPage = (page: number) => {
        GetCoupons(cookies.accountId, page, 20, couponsCount, setCoupons);
    };
    useEffect(() => {
        GetCouponsCount(cookies.accountId, setCouponsCount);
    }, []);
    useEffect(() => {
        GetCoupons(cookies.accountId, 1, 20, couponsCount, setCoupons);
    }, [couponsCount]);

    return (
        <div className="coupon-list-container">
            <CouponsTable  coupons={coupons} />
            <div className="page-chooser-box">
                <PageChooser maxPage={Math.ceil(couponsCount / 20)} onPageChange={setCouponsOfPage} />
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
    return (
        <div className="account-page-content">
            <AccountPageTitle />
            <div className="default-search-box-container"><SearchBox hasBorder={true} /></div>
            <CouponsList />
        </div>
    );
};

async function GetCouponsCount(
    userId: string,
    setCouponsCount: (count: number) => void
) {
    setCouponsCount(await GetAccountCouponsListCountController(userId));
}

async function GetCoupons(
    userId: string,
    index: number,
    prePage: number,
    couponsCount: number,
    setCoupons: (coupons: CouponListDataType[]) => void
) {
    if (index <= 0 || index >= Math.ceil(couponsCount / prePage)) {
        return;
    }
    const start = (index - 1) * prePage;
    const end = Math.min(index * prePage, couponsCount - 1);
    setCoupons(await GetAccountCouponsListController(userId, start, end));
}
