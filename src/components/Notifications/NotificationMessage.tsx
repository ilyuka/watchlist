export default function NotificationMessage({ message }) {
    return (
        <div className="min-w-32 rounded-sm bg-red-900 px-4 py-1 text-center text-sm">
            <div dangerouslySetInnerHTML={{ __html: message }}></div>
            {/* {message} */}
        </div>
    );
}
