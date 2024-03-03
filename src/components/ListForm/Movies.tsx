import Movie from "./Movie";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";

export default function Movies({ movies, deleteMovie, setMovies }) {
    const onDragEnd = (result) => {
        const { destination, source, draggableId } = result;
        if (!destination) {
            return;
        }
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const newMovies = [...movies];
        const tmp = newMovies[source.index];
        newMovies[source.index] = newMovies[destination.index];
        newMovies[destination.index] = tmp;
        setMovies(newMovies);
        console.log("setting");
    };

    if (movies.length === 0) {
        return (
            <div className="my-4 grid min-h-44 place-items-center items-center border border-cyan-100">
                <div className="flex flex-col items-center">
                    <h2 className="mb-1 text-lg font-bold">
                        Your list is empty.
                    </h2>
                    <p className="text-sm text-gray-400">
                        Add films using the search field above.
                    </p>
                </div>
            </div>
        );
    } else {
        return (
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided) => (
                        <div
                            className="my-4"
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {movies.map((movie, index) => {
                                return (
                                    <Movie
                                        key={index}
                                        index={index}
                                        movies={movies}
                                        movie={movie}
                                        deleteMovie={deleteMovie}
                                    ></Movie>
                                );
                            })}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        );
    }
}
