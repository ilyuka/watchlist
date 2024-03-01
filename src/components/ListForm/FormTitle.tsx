export default function FormTitle({ title }: { title: string }) {
    return (
        <div className="mb-4 mt-4 border-b border-b-cyan-100 text-cyan-100">
            <h1 className="mb-2 text-3xl font-extralight">{title}</h1>
        </div>
    );
}
