import { useState, useEffect } from "react";
import "./Snackbar.css";

export type SnackbarType = {
    message: string;
    startTime: number;
};

export function GetNewSnackbar(
    message: string,
    time: number
): SnackbarType {
    return {
        message: message,
        startTime: time
    };
}

function Snackbar(props: {
    data: SnackbarType
}) {
    return (
        <div className="snackbar">
            {props.data.message}
        </div>
    );
}

export default function SnackbarList(props: {
    snackbarList: SnackbarType[],
    setSnackbarList: (list: SnackbarType[]) => void
}) {
    const [snackbarList, setSnackbarList] = useState<SnackbarType[]>(props.snackbarList);

    useEffect(() => {
        const interval = setInterval(() => {
            setSnackbarList((snackbarList) => {
                const currentTime = Date.now();
                let newSnackbarList = snackbarList.filter((data) =>
                    (currentTime - data.startTime) < 2000
                );
                return newSnackbarList;
            });
        }, 100);
        return () => clearInterval(interval);
    }, []);
    useEffect(() => {
        if (props.snackbarList.length != snackbarList.length) {
            props.setSnackbarList(snackbarList);
        }
    }, [snackbarList]);
    useEffect(() => {
        if (props.snackbarList.length != snackbarList.length) {
            setSnackbarList(props.snackbarList);
        }
    }, [props.snackbarList]);

    return (
        <div className="snackbar-list">
            {snackbarList.map((data, index) => {
                return <Snackbar key={"snackbar-" + index} data={data} />;
            })}
        </div>
    );
}