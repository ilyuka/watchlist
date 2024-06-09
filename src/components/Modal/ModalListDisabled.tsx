export default function ModalListDisabled({ list }) {
    return (
        <div>
            disabled {list.title}
            {list._count.movies} movies
        </div>
    );
}
