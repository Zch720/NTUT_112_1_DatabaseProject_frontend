import "./SellReport.css";

type ReportData = {
    name: string;
    amount: number;
    income: number;
    sellPersentage: number;
};

function AccountPageTitle() {
    return(
        <h3 className="account-page-title">帳戶 {">"} 銷售報表</h3>
    );
}

function ReportToolBar() {
    return (
        <div className="repoprt-tool-bar">
            區間
            <select name="time-period" id="time-period">
                <option value="day">日</option>
                <option value="week">周</option>
                <option value="moth">月</option>
            </select>
            排序
            <select name="report-order" id="report-order">
                <option value="income">金額</option>
                <option value="amount">數量</option>
                <option value="name">名稱</option>
            </select>
            <button className="report-export-button">輸出</button>
        </div>
    );
}

function ReportTableHeaderRow() {
    return (
        <tr>
            <td style={{width: "10vw"}}>排序</td>
            <td style={{width: "31vw"}}>商品名稱</td>
            <td style={{width: "10vw"}}>數量</td>
            <td style={{width: "15vw"}}>金額</td>
            <td style={{width: "15vw"}}>銷售佔比</td>
        </tr>
    );
}

function ReportRow({ index, data }: { index: number, data: ReportData }) {
    return (
        <tr key={"sell-report-table-row-" + index}>
            <td>{ index }</td>
            <td>{ data.name }</td>
            <td>{ data.amount }</td>
            <td>{ "$" + data.income }</td>
            <td>{ data.sellPersentage + "%" }</td>
        </tr>
    );
}

function ReportTable({ datas }: { datas: ReportData[] }) {
    return (
        <table>
            <thead>
                <ReportTableHeaderRow />
            </thead>
            <tbody>
                {datas.map((report, idx) => <ReportRow index={idx + 1} data={report} />)}
            </tbody>
        </table>
    );
}

export default function SellReport() {
    return (
        <div className="account-page-content">
            <AccountPageTitle />
            <div className="report-container">
                <ReportToolBar />
                <ReportTable datas={fakeReportData} />
            </div>
        </div>
    );
}

const fakeReportData: ReportData[] = [
    {
        name: "巧克力夾心",
        amount: 3,
        income: 360,
        sellPersentage: 8.0
    },
    {
        name: "好好吃餅乾",
        amount: 1,
        income: 1200,
        sellPersentage: 26.0
    },
    {
        name: "超難吃餅乾",
        amount: 1,
        income: 0,
        sellPersentage: 0.0
    }
]
