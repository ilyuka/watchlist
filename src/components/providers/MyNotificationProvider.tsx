"use client";
import { useState, useEffect, createContext } from "react";
import NotificationMessage from "@/components/Notifications/NotificationMessage";

export const NotificationsContext = createContext([]);

export default function MyNotificationProvider({ children }) {
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
        if (newMessage === message) {
            newMessage = newMessage + " ";
        }
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
            <div
                className={`notification absolute mx-4 my-4 ${show ? "show" : ""} z-50`}
            >
                <NotificationMessage message={message}></NotificationMessage>
            </div>

            {children}
        </NotificationsContext.Provider>
    );
}
