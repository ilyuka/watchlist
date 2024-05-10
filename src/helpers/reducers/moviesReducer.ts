export function moviesReducer(state, action) {
    switch (action.type) {
        case "addMovie": {
            return [...state, action.newMovie];
        }
        case "deleteMovie": {
            return state.filter((mv) => mv.id !== action.movieId);
        }
        case "moveMovie": {
            const newMovies = [...state];
            const tmp = newMovies[action.sourceIndex];
            newMovies.splice(action.sourceIndex, 1);
            newMovies.splice(action.destinationIndex, 0, tmp);
            return newMovies;
        }
    }
}
