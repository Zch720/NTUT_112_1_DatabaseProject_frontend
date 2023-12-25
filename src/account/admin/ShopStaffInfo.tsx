import "./ShopStaffInfo.css";

type StaffDataType = {
    userId: string;
    name: string;
    address: string;
    email: string;
    createTime: string;
    shop: string;
};

function AccountPageTitle() {
    return(
        <h3 className="account-page-title">帳戶 {">"} 商店管理 {">"} 商店詳細資訊 {">"} 員工帳戶詳細資訊</h3>
    );
}

function StaffInfoToolBar() {
    return (
        <div className="staff-info-tool-bar">
            <button>刪除此帳戶</button>
        </div>
    );
}

function StaffLineInfo({ name, value }: { name: string, value: string }) {
    return (
        <div className="staff-line-info">
            <label className="staff-info-label">{name}</label>
            <div className="w-flex-g1">
                <span>{value}</span>
            </div>
        </div>
    );
}

function StaffInfos() {
    // TODO: get staff from server
    const staff: StaffDataType = getFakeStaff();

    return (
        <div className="staff-infos">
            <StaffLineInfo name="帳戶名稱" value={staff.userId} />
            <StaffLineInfo name="姓名" value={staff.name} />
            <StaffLineInfo name="地址" value={staff.address} />
            <StaffLineInfo name="Email" value={staff.email} />
            <StaffLineInfo name="建立時間" value={staff.createTime} />
            <StaffLineInfo name="所屬商店" value={staff.shop} />
        </div>
    );
}

export default function ShopStaffManagementInfo() {
    return (
        <div className="account-page-content">
            <AccountPageTitle />
            <StaffInfoToolBar />
            <StaffInfos />
        </div>    
    );
}

function getFakeStaff(): StaffDataType {
    return {
        userId: "storyman101",
        name: "說書人",
        address: "敦化西路",
        email: "storytalker@gmail.com",
        createTime: "2023/10/21 05:45",
        shop: "餅乾故事館"
    };
}