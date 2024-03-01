"use client";

import { useState, useEffect, createContext } from "react";
import NotificationMessage from "./NotificationMessage";

export const NotificationsContext = createContext([]);

export default function Notification({ children }) {
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (message) {
            setShow(true);
            const timer = setTimeout(() => {
                setShow(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    const notify = (newMessage: string) => {
        if (show) {
            setShow(false);
            setTimeout(() => {
                setShow(true);
                setMessage(newMessage.toString());
            }, 250);
            return;
        }
        setMessage(newMessage.toString());
    };

    return (
        <NotificationsContext.Provider value={{ message, notify }}>
            <div>
                <div
                    className={`notification absolute mx-4 my-4 ${show ? "show" : ""}`}
                >
                    <NotificationMessage
                        message={message}
                    ></NotificationMessage>
                </div>

                {children}
            </div>
        </NotificationsContext.Provider>
    );
}
