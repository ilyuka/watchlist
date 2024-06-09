export default function Page({ params: { listId, movieId } }) {
    return (
        <div>
            deleting movie({movieId}) from list({listId})
        </div>
    );
}
