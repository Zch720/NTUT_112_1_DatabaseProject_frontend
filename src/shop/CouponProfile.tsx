import React, { useState } from "react";
import "./CouponProfile.css";

type CouponType = {
    id: string;
    type: string;
    descriptoin: string;
    startTime: string;
    endTime: string;
};

function AccountPageTitle() {
    return(
        <h3 className="account-page-title">帳戶 {">"} 優惠券管理 {">"} 優惠券詳細資訊</h3>
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

function CouponToolBar({ id }: { id: string }) {
    return (
        <div className="coupon-toolbar">
            優惠券編號：{id}
            <button className="coupon-delete-button">刪除優惠券</button>
        </div>
    );
}

function CouponInfos({ coupon }: { coupon: CouponType }) {
    return (
        <React.Fragment>
            <OneLineInfo infoType={"優惠券類型"} buttonId={"coupon-type"} infoValue={coupon.type}/>
            <OneLineInfo infoType={"優惠券描述"} buttonId={"coupon-description"} infoValue={coupon.descriptoin}/>
            <OneLineInfo infoType={"優惠券開始時間"} buttonId={"coupon-start-time"} infoValue={coupon.startTime}/>
            <OneLineInfo infoType={"優惠券結束時間"} buttonId={"coupon-end-time"} infoValue={coupon.endTime}/>
        </React.Fragment>
    );
}

function CouponProfiles({ coupon }: { coupon: CouponType }) {
    return (
        <div className="account-profile-infos">
            <CouponToolBar id={coupon.id} />
            <CouponInfos coupon={coupon}/>
        </div>    
    );
}

export default function CouponProfile() {
    const coupon: CouponType = {
        id: "1",
        type: "折扣券",
        descriptoin: "全館 9 折",
        startTime: "2021/01/01",
        endTime: "2021/12/31",
    };

    return (
        <div className="account-profile-content">
            <AccountPageTitle />
            <CouponProfiles coupon={coupon} />
        </div>
    );
}