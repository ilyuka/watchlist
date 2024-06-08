export default function Loading() {
    return (
        <div className="fixed inset-0 z-50 bg-black/60">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-32">
                loading...
            </div>
        </div>
    );
}
