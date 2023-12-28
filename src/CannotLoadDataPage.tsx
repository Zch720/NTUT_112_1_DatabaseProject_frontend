export default function CannotLoadDataPage() {
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            width: "100%",
        }}>
            <h1 style={{ fontWeight: "normal" }}>正在載入資料</h1>
            <h2 style={{ fontWeight: "normal" }}>如果時間過長，請重新整理嘗試</h2>
        </div>
    );
}