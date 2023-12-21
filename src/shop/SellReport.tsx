import { useState, useEffect, useRef } from "react";
import { BarChart } from "@mui/x-charts";
import ExcelJs from "exceljs";
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

type getDateTextFunc = (startDate: Date) => string;
type procDateTextFunc = (date: DateInfo, setDate: (date: string) => void) => void;
const milliSecondsOneDay = 86400000;

type DateInfo = {
    startDate: Date;
    endDate: Date;
    getTextFunc: getDateTextFunc;
    preDateFunc: procDateTextFunc;
    nextDateFunc: procDateTextFunc;
    rangeType: string;
};

function GetDayDateText(startDate: Date) : string {
    return startDate.getFullYear() + " 年 " + (startDate.getMonth() + 1) + " 月 " + startDate.getDate() + " 日";
}

function GetWeekDateText(startDate: Date) : string {
    let endDate = new Date(startDate.getTime() + milliSecondsOneDay * 6);
    return startDate.getFullYear() + " 年 " + (startDate.getMonth() + 1) + " 月 " + startDate.getDate() + " 日" + " ~ " +
        endDate.getFullYear() + " 年 " + (endDate.getMonth() + 1) + " 月 " + endDate.getDate() + " 日";
}

function GetMonthDateText(startDate: Date) : string {
    return startDate.getFullYear() + " 年 " + (startDate.getMonth() + 1) + " 月 ";
}

let PreDay: procDateTextFunc = (date: DateInfo, setDate: (date: string) => void) => {
    date.startDate = new Date(date.startDate.getTime() - milliSecondsOneDay);
    setDate(GetDayDateText(date.startDate));
}

function NextDay(date: DateInfo, setDate: (date: string) => void) {
    date.startDate = new Date(date.startDate.getTime() + milliSecondsOneDay);
    setDate(GetDayDateText(date.startDate));
}

function PreWeek(date: DateInfo, setDate: (date: string) => void) {
    date.startDate = new Date(date.startDate.getTime() - milliSecondsOneDay * 7);
    setDate(GetWeekDateText(date.startDate));
}

function NextWeek(date: DateInfo, setDate: (date: string) => void) {
    date.startDate = new Date(date.startDate.getTime() + milliSecondsOneDay * 7);
    setDate(GetWeekDateText(date.startDate));
}

function PreMonth(date: DateInfo, setDate: (date: string) => void) {
    date.startDate = new Date(date.startDate);
    date.startDate.setDate(1);
    date.startDate.setTime(date.startDate.getTime() - milliSecondsOneDay);
    setDate(GetMonthDateText(date.startDate));
}

function NextMonth(date: DateInfo, setDate: (date: string) => void) {
    date.startDate = new Date(date.startDate);
    date.startDate.setDate(1);
    date.startDate.setTime(date.startDate.getTime() + milliSecondsOneDay * 32);
    setDate(GetMonthDateText(date.startDate));
}

function DateSelector(props: { currentDate: DateInfo }) {
    const [dateText, setDateText] = useState<string>(props.currentDate.getTextFunc(props.currentDate.startDate));
    const [dateTextWidth, setDateTextWidth] = useState<number>(180);
    useEffect(() => {
        setDateText(props.currentDate.getTextFunc(props.currentDate.startDate));
        switch (props.currentDate.rangeType) {
            case "day":
                setDateTextWidth(160);
                break;
            case "week":
                setDateTextWidth(350);
                break;
            case "month":
                setDateTextWidth(120);
                break;
        }
    }, [props.currentDate]);

    return (
        <div className="report-date-selector">
            <button onClick={() => {
                props.currentDate.preDateFunc(props.currentDate, setDateText);
                setDateText(props.currentDate.getTextFunc(props.currentDate.startDate));
            }}>
                <img src="/images/left_rectangle.svg" />
            </button>
            <span style={{width: dateTextWidth, textAlign: "center"}}>{dateText}</span>
            <button onClick={() => {
                props.currentDate.nextDateFunc(props.currentDate, setDateText);
                setDateText(props.currentDate.getTextFunc(props.currentDate.startDate));
            }}>
                <img src="/images/right_rectangle.svg" />
            </button>
        </div>
    );
}

function GetCurrentDateInfo(type: string) : DateInfo | null {
    let date = new Date();
    let endDate: Date = new Date(date.getTime());
    switch (type) {
        case "day":
            return { startDate: date, endDate: endDate, getTextFunc: GetDayDateText, preDateFunc: PreDay, nextDateFunc: NextDay, rangeType: "day" };
        case "week":
            date.setTime(date.getTime() - milliSecondsOneDay * date.getDay());
            endDate = new Date(date.getTime() + milliSecondsOneDay * 6);
            return { startDate: date, endDate: endDate, getTextFunc: GetWeekDateText, preDateFunc: PreWeek, nextDateFunc: NextWeek, rangeType: "week" };
        case "month":
            date.setDate(1);
            endDate = new Date(date.getTime() + milliSecondsOneDay * 32);
            endDate.setDate(1);
            endDate.setTime(endDate.getTime() - milliSecondsOneDay);
            return { startDate: date, endDate: endDate, getTextFunc: GetMonthDateText, preDateFunc: PreMonth, nextDateFunc: NextMonth, rangeType: "month" };
    }
    return null;
}

function ExportReport(dateInfo: DateInfo, orderBy: string | undefined, datas: ReportData[]) {
    const workbook = new ExcelJs.Workbook();
    const sheet = workbook.addWorksheet("銷售報表");
    sheet.mergeCells("A1:D1");
    sheet.getCell("A1").value = dateInfo.getTextFunc(dateInfo.startDate) + " 銷售報表" + (orderBy ? ("（依" + orderBy + "排序）") : "");
    sheet.getCell("A1").alignment = { horizontal: "center" };
    sheet.getColumn("A").width = 25;
    sheet.getColumn("B").width = 12;
    sheet.getColumn("C").width = 12;
    sheet.getColumn("D").width = 12;
    const headerFillStyle: ExcelJs.Fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFD4BD98" }
    };
    sheet.getCell("A2").fill = headerFillStyle;
    sheet.getCell("B2").fill = headerFillStyle;
    sheet.getCell("C2").fill = headerFillStyle;
    sheet.getCell("D2").fill = headerFillStyle;
    sheet.addTable({
        name: "sell_report",
        ref: "A2",
        columns: [{name: "商品名稱"}, {name: "數量（個）"}, {name: "金額（元）"}, {name: "銷售佔比（%）"}],
        rows: datas.map(data => [data.name, data.amount, data.income, data.sellPersentage])
    });
    const rowBorderStyle: Partial<ExcelJs.Borders> = {
        top: { style: "thin", color: { argb: "FFD4BD98" } },
        left: { style: "thin", color: { argb: "FFD4BD98" } },
        bottom: { style: "thin", color: { argb: "FFD4BD98" } },
        right: { style: "thin", color: { argb: "FFD4BD98" } }
    };
    for (let i = 0; i < datas.length; i++) {
        sheet.getCell(`A${i + 3}`).border = rowBorderStyle;
        sheet.getCell(`B${i + 3}`).border = rowBorderStyle;
        sheet.getCell(`C${i + 3}`).border = rowBorderStyle;
        sheet.getCell(`D${i + 3}`).border = rowBorderStyle;
    }

    workbook.xlsx.writeBuffer().then((buffer) => {
        const blob = new Blob([buffer], {type: "application/vnd.ms-excel;charset=UTF-8"});
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = "銷售報表.xlsx";
        link.click();
    });
}

function ReportToolBar({ orderChange, datas } : { orderChange: (order: string) => void, datas: ReportData[] }) {
    const [currentDate, setCurrentDate] = useState(GetCurrentDateInfo("day"));
    const timeRangeSelector = useRef<HTMLSelectElement>(null);
    const orderSelector = useRef<HTMLSelectElement>(null);

    const dateRangeOnChange = () => {
        const value = timeRangeSelector.current?.value;
        switch (value) {
            case "day":
                setCurrentDate(GetCurrentDateInfo(value));
                break;
            case "week":
                setCurrentDate(GetCurrentDateInfo(value));
                break;
            case "month":
                setCurrentDate(GetCurrentDateInfo(value));
                break;
        }
    };

    const orderOnChange = () => {
        const value = orderSelector.current?.value;
        if (value) {
            orderChange(value);
        }
    }

    return (
        <div className="repoprt-tool-bar">
            區間
            <select name="time-period" id="time-period" ref={timeRangeSelector} onChange={dateRangeOnChange} >
                <option value="day">日</option>
                <option value="week">周</option>
                <option value="month">月</option>
            </select>
            <DateSelector currentDate={currentDate!}/>
            排序
            <select name="report-order" id="report-order" ref={orderSelector} onChange={orderOnChange}>
                <option value="income">金額</option>
                <option value="amount">數量</option>
                <option value="name">名稱</option>
            </select>
            <button className="report-export-button" onClick={() => ExportReport(currentDate!, orderSelector.current?.options[orderSelector.current?.selectedIndex].innerHTML, datas)}>輸出</button>
        </div>
    );
}

function GetTextWidth(text: string) {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (!context) return 0;
    context.font = "12px";
    const metrics = context.measureText(text);
    return metrics.width;
}

function ReportChart({ inputDatas }: { inputDatas: ReportData[] }) {
    const [datas, setDatas] = useState<ReportData[]>(inputDatas);
    useEffect(() => {
        setDatas(inputDatas);
    }, [inputDatas]);

    console.log(datas);

    return (
        datas.length === 0 ? <></> :
        <BarChart
            margin={{
                left: datas.map(data => GetTextWidth(data.name)).sort((a, b) => b - a)[0] + 30
            }}
            yAxis={[{
                scaleType: "band",
                data: datas.map(data => data.name)
            }]}
            series={[{
                data: datas.map(data => data.income),
                label: "銷售金額（元）"
            }]}
            layout="horizontal"
            height={100 + datas.length * 25}
            colors={["#BD8248"]}
        />
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

function ReportTable({ inputDatas }: { inputDatas: ReportData[] }) {
    const [datas, setDatas] = useState<ReportData[]>(inputDatas);
    useEffect(() => {
        setDatas(inputDatas);
    }, [inputDatas]);

    return (
        <div className="eletable">
            <table>
                <thead>
                    <ReportTableHeaderRow />
                </thead>
                <tbody>
                    {datas.map((report, idx) => <ReportRow key={`report-row-${idx + 1}`} index={idx + 1} data={report} />)}
                </tbody>
            </table>
        </div>
    );
}

export default function SellReport() {
    const [datas, setDatas] = useState<ReportData[]>([]);

    const orderRuleChange = (order: string) => {
        switch (order) {
            case "income":
                setDatas([...datas].sort((a, b) => b.income - a.income));
                break;
            case "amount":
                setDatas([...datas].sort((a, b) => b.amount - a.amount));
                break;
            case "name":
                setDatas([...datas].sort((a, b) => b.name.localeCompare(a.name)));
                break;
        }
    }
    useEffect(() => {
        orderRuleChange("income");
    }, []);

    return (
        <div className="account-page-content">
            <AccountPageTitle />
            <div className="report-container">
                <ReportToolBar orderChange={orderRuleChange} datas={datas} />
                <ReportChart inputDatas={datas}/>
                <ReportTable inputDatas={datas} />
            </div>
        </div>
    );
}
