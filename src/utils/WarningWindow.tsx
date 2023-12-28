import React, { useState, useEffect, useRef } from "react";
import "./WarningWindow.css";

export default function WarningWindow(props: {
    message?: string,
    open: boolean,
    resetOpen: () => void
}) {
    const [message, setMessage] = useState(props.message);
    const warningWindowContainer = useRef<HTMLDivElement>(null);
    const closeWarningWindow = () => {
        if (warningWindowContainer.current)
            warningWindowContainer.current.style.display = "none";
        props.resetOpen();
    }
    const openWarningWindow = () => {
        if (warningWindowContainer.current)
            warningWindowContainer.current.style.display = "block";
    }

    useEffect(() => {
        if (props.open) {
            openWarningWindow();
        }
    }, [props.open]);
    useEffect(() => {
        if (props.message) {
            setMessage(props.message);
        }
    }, [props.message]);

    return (
        <div className="warning-window-container" ref={warningWindowContainer}>
            <div className="warning-window-background" onClick={closeWarningWindow}></div>
            <div className="warning-window">
                <p>{message}</p>
                <button onClick={closeWarningWindow}>確認</button>
            </div>
        </div>
    );
}