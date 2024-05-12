import MyNotificationProvider from "./MyNotificationProvider";
import MyQueryClientProvider from "./MyQueryClientProivders";
import MySessionProvider from "./MySessionProvider";

export default function MyAppProvider({ children }) {
    return (
        <MySessionProvider>
            <MyNotificationProvider>
                <MyQueryClientProvider>{children}</MyQueryClientProvider>
            </MyNotificationProvider>
        </MySessionProvider>
    );
}
